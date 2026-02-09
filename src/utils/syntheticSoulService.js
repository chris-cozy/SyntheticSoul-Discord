const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const SESSION_FILE_PATH = path.join(__dirname, "..", "..", "data", "sessions.json");

const ACCESS_TOKEN_SAFETY_WINDOW_MS = 30 * 1000;
const JOB_MAX_ATTEMPTS = Number(process.env.SYNTHETIC_SOUL_JOB_MAX_POLLS || 50);
const JOB_BASE_DELAY_MS = Number(process.env.SYNTHETIC_SOUL_JOB_BASE_POLL_MS || 1200);

const MESSAGE_TYPE_MAP = {
  dm: "dm",
  group: "group",
  gc: "group",
};

let sessionCache = null;
let apiBaseUrlCache = null;

function resolveApiBaseUrl() {
  const configuredBase = (process.env.SYNTHETIC_SOUL_API_BASE_URL || "").trim();
  if (configuredBase) {
    return configuredBase.replace(/\/+$/, "");
  }

  const legacyUrl = (process.env.SYNTHETIC_SOUL_API_URL || "").trim();
  if (!legacyUrl) {
    throw new Error(
      "Synthetic Soul API base URL is missing. Set SYNTHETIC_SOUL_API_BASE_URL (preferred) or SYNTHETIC_SOUL_API_URL."
    );
  }

  const normalizedLegacy = legacyUrl.replace(/\/+$/, "");
  return normalizedLegacy.replace(/\/messages(?:\/submit)?$/i, "");
}

function getApiBaseUrl() {
  if (!apiBaseUrlCache) {
    apiBaseUrlCache = resolveApiBaseUrl();
  }
  return apiBaseUrlCache;
}

function ensureSessionFile() {
  const directory = path.dirname(SESSION_FILE_PATH);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  if (!fs.existsSync(SESSION_FILE_PATH)) {
    fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify({ users: {} }, null, 2), "utf8");
  }
}

function loadSessions() {
  if (sessionCache) {
    return sessionCache;
  }

  ensureSessionFile();

  try {
    const raw = fs.readFileSync(SESSION_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || typeof parsed.users !== "object") {
      sessionCache = { users: {} };
    } else {
      sessionCache = parsed;
    }
  } catch (error) {
    console.error("Error - loadSessions: Falling back to empty session store:", error.message);
    sessionCache = { users: {} };
  }

  return sessionCache;
}

function persistSessions() {
  ensureSessionFile();
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(loadSessions(), null, 2), "utf8");
}

function getSession(discordUserId) {
  const store = loadSessions();
  return store.users[String(discordUserId)] || null;
}

function setSession(discordUserId, session) {
  const store = loadSessions();
  store.users[String(discordUserId)] = session;
  persistSessions();
}

function clearSession(discordUserId) {
  const store = loadSessions();
  delete store.users[String(discordUserId)];
  persistSessions();
}

function isAccessTokenFresh(session) {
  if (!session || !session.expiresAt) {
    return false;
  }
  return Date.now() + ACCESS_TOKEN_SAFETY_WINDOW_MS < Number(session.expiresAt);
}

function parseSetCookie(setCookieHeaders) {
  const cookies = {};

  if (!Array.isArray(setCookieHeaders)) {
    return cookies;
  }

  for (const rawCookie of setCookieHeaders) {
    if (!rawCookie || typeof rawCookie !== "string") {
      continue;
    }

    const [firstSegment] = rawCookie.split(";");
    const separatorIndex = firstSegment.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = firstSegment.slice(0, separatorIndex).trim();
    const value = firstSegment.slice(separatorIndex + 1).trim();

    if (key === "sid" || key === "rtoken" || key === "refresh_csrf") {
      cookies[key] = value;
    }
  }

  return cookies;
}

function buildCookieHeader(cookies = {}) {
  const parts = [];
  if (cookies.sid) parts.push(`sid=${cookies.sid}`);
  if (cookies.rtoken) parts.push(`rtoken=${cookies.rtoken}`);
  if (cookies.refresh_csrf) parts.push(`refresh_csrf=${cookies.refresh_csrf}`);
  return parts.join("; ");
}

function normalizeApiError(error, fallbackContext) {
  if (!error) {
    return `${fallbackContext}: unknown error`;
  }

  if (error.response) {
    const status = error.response.status;
    const body = error.response.data;

    if (typeof body === "string" && body.trim()) {
      return `${fallbackContext}: ${body} (HTTP ${status})`;
    }

    if (body && typeof body === "object") {
      const detail = body.detail || body?.error?.message || body?.error?.code;
      if (detail) {
        return `${fallbackContext}: ${detail} (HTTP ${status})`;
      }
    }

    return `${fallbackContext}: HTTP ${status}`;
  }

  return `${fallbackContext}: ${error.message || "request failed"}`;
}

function buildHeaders({ token, cookies, csrf, additional = {} } = {}) {
  const headers = {
    "Accept": "application/json",
    ...additional,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const cookieHeader = buildCookieHeader(cookies);
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  if (csrf) {
    headers["X-CSRF-Token"] = csrf;
  }

  return headers;
}

function getNormalizedMessageType(inputType) {
  const key = (inputType || "dm").toString().trim().toLowerCase();
  return MESSAGE_TYPE_MAP[key] || "dm";
}

function assertMessageIsValid(message) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string.");
  }

  const trimmed = message.trim();
  if (!trimmed.length) {
    throw new Error("Message cannot be empty.");
  }

  if (trimmed.length > 4000) {
    throw new Error("Message is too long (max 4000 characters).");
  }

  return trimmed;
}

async function post(pathname, data, options = {}) {
  const url = `${getApiBaseUrl()}${pathname}`;
  return axios.post(url, data, {
    headers: buildHeaders(options),
    timeout: Number(process.env.SYNTHETIC_SOUL_HTTP_TIMEOUT_MS || 30000),
    validateStatus: () => true,
  });
}

async function get(pathname, options = {}) {
  const url = `${getApiBaseUrl()}${pathname}`;
  return axios.get(url, {
    headers: buildHeaders(options),
    timeout: Number(process.env.SYNTHETIC_SOUL_HTTP_TIMEOUT_MS || 30000),
    validateStatus: () => true,
  });
}

function buildSessionFromAuthReply(existingSession, authResponse, cookies, authType) {
  return {
    ...existingSession,
    authType,
    apiUsername: authResponse.username,
    accessToken: authResponse.access_token,
    expiresAt: Date.now() + Number(authResponse.expires_in || 0) * 1000,
    refreshCookies: {
      ...(existingSession?.refreshCookies || {}),
      ...cookies,
    },
    updatedAt: Date.now(),
  };
}

async function createGuestSession(discordUserId, discordUsername) {
  try {
    const response = await post("/auth/guest", null);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`guest failed with HTTP ${response.status}`);
    }

    const cookies = parseSetCookie(response.headers["set-cookie"]);
    const nextSession = buildSessionFromAuthReply(
      {
        discordUserId: String(discordUserId),
        discordUsername,
      },
      response.data,
      cookies,
      "guest"
    );

    setSession(discordUserId, nextSession);
    return nextSession;
  } catch (error) {
    throw new Error(normalizeApiError(error, "Create guest session"));
  }
}

async function refreshSession(discordUserId) {
  const currentSession = getSession(discordUserId);
  if (!currentSession) {
    return null;
  }

  const csrf = currentSession.refreshCookies?.refresh_csrf;
  try {
    const response = await post("/auth/refresh", null, {
      cookies: currentSession.refreshCookies,
      csrf,
    });

    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    const cookies = parseSetCookie(response.headers["set-cookie"]);
    const nextSession = buildSessionFromAuthReply(currentSession, response.data, cookies, currentSession.authType || "guest");
    setSession(discordUserId, nextSession);
    return nextSession;
  } catch (error) {
    console.error("Error - refreshSession:", normalizeApiError(error, "Refresh session"));
    return null;
  }
}

async function ensureSession(discordUserId, discordUsername) {
  const existingSession = getSession(discordUserId);

  if (!existingSession) {
    return createGuestSession(discordUserId, discordUsername);
  }

  if (discordUsername && discordUsername !== existingSession.discordUsername) {
    existingSession.discordUsername = discordUsername;
    setSession(discordUserId, existingSession);
  }

  if (isAccessTokenFresh(existingSession)) {
    return existingSession;
  }

  const refreshed = await refreshSession(discordUserId);
  if (refreshed) {
    return refreshed;
  }

  if (existingSession.authType === "guest") {
    return createGuestSession(discordUserId, discordUsername || existingSession.discordUsername);
  }

  throw new Error("Your session expired and could not be refreshed. Please sign in again with /login.");
}

async function authRequestWithRetry(discordUserId, discordUsername, requestFn) {
  const session = await ensureSession(discordUserId, discordUsername);
  let response = await requestFn(session);

  if (response.status !== 401) {
    return { session, response };
  }

  const refreshedSession = await refreshSession(discordUserId);
  if (!refreshedSession) {
    if (session.authType === "guest") {
      const guestSession = await createGuestSession(discordUserId, discordUsername || session.discordUsername);
      response = await requestFn(guestSession);
      return { session: guestSession, response };
    }

    throw new Error("Authentication failed and refresh was rejected. Please sign in again with /login.");
  }

  response = await requestFn(refreshedSession);
  return { session: refreshedSession, response };
}

function extractConversationFallbackReply(conversationPayload, submittedAtMs) {
  const messages = Array.isArray(conversationPayload?.messages) ? conversationPayload.messages : [];
  if (!messages.length) {
    return null;
  }

  const earliestAllowedMs = submittedAtMs - 5000;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (!message || !message.from_agent || typeof message.message !== "string") {
      continue;
    }

    const timestampMs = Date.parse(message.timestamp || "");
    if (Number.isFinite(timestampMs) && timestampMs < earliestAllowedMs) {
      continue;
    }

    if (!message.message.trim()) {
      continue;
    }

    return {
      response: message.message,
      expression: message.expression,
      time: message.time,
    };
  }

  return null;
}

async function tryConversationFallback(discordUserId, discordUsername, submittedAtMs) {
  try {
    const { response } = await authRequestWithRetry(discordUserId, discordUsername, (session) =>
      get("/messages/conversation", { token: session.accessToken })
    );

    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    return extractConversationFallbackReply(response.data?.conversation, submittedAtMs);
  } catch (error) {
    return null;
  }
}

async function pollJobUntilDone(discordUserId, discordUsername, jobStatusPath, submittedAtMs) {
  for (let attempt = 0; attempt < JOB_MAX_ATTEMPTS; attempt += 1) {
    const { response } = await authRequestWithRetry(discordUserId, discordUsername, (session) =>
      get(jobStatusPath, { token: session.accessToken })
    );

    if (response.status === 404) {
      const fallbackReply = await tryConversationFallback(discordUserId, discordUsername, submittedAtMs);
      if (fallbackReply) {
        return fallbackReply;
      }
      // Continue polling; some deployments can briefly fail job ownership checks.
      await new Promise((resolve) => setTimeout(resolve, JOB_BASE_DELAY_MS));
      continue;
    }

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Job polling failed with HTTP ${response.status}`);
    }

    const payload = response.data || {};
    const status = String(payload.status || "").toLowerCase();

    if (status === "succeeded" || status === "finished") {
      return payload.result;
    }

    if (status === "failed") {
      throw new Error(payload.error || "The API job failed.");
    }

    const retryAfterHeader = Number(response.headers["retry-after"] || 0) * 1000;
    const backoff = Math.min(8000, JOB_BASE_DELAY_MS * Math.pow(1.25, attempt));
    const delay = Math.max(retryAfterHeader, backoff);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Timed out while waiting for the API job to complete.");
}

async function submitMessageAndWait(discordUserId, discordUsername, message, messageType) {
  const normalizedMessageType = getNormalizedMessageType(messageType);
  const submittedAtMs = Date.now();

  const { response } = await authRequestWithRetry(discordUserId, discordUsername, (session) =>
    post(
      "/messages/submit",
      {
        message,
        type: normalizedMessageType,
      },
      {
        token: session.accessToken,
        additional: { "Content-Type": "application/json" },
      }
    )
  );

  if (response.status >= 200 && response.status < 300 && response.status !== 202) {
    return response.data;
  }

  if (response.status !== 202) {
    throw new Error(`Message submission failed with HTTP ${response.status}`);
  }

  const jobId = response.data?.job_id;
  if (!jobId) {
    throw new Error("Message submission succeeded but no job_id was returned.");
  }

  // Use relative path against configured base URL to avoid duplicated /v1 prefixes.
  const jobStatusPath = `/jobs/${jobId}`;

  return pollJobUntilDone(discordUserId, discordUsername, jobStatusPath, submittedAtMs);
}

async function GetResponse(message, username, type, discordUserId = null) {
  try {
    const stableUserId = discordUserId ? String(discordUserId) : `legacy:${String(username).toLowerCase()}`;
    const sanitizedMessage = assertMessageIsValid(message);
    const result = await submitMessageAndWait(stableUserId, username, sanitizedMessage, type);

    if (typeof result === "string") {
      return result;
    }

    if (result && typeof result === "object") {
      if (typeof result.response === "string") {
        return result.response;
      }
      if (typeof result.reply === "string") {
        return result.reply;
      }
    }

    return null;
  } catch (error) {
    console.error("Error - GetResponse:", error.message);
    return null;
  }
}

async function createGuest(discordUserId, discordUsername) {
  return createGuestSession(discordUserId, discordUsername);
}

async function login(discordUserId, discordUsername, email, password) {
  try {
    const response = await post(
      "/auth/login",
      { email, password },
      { additional: { "Content-Type": "application/json" } }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`login failed with HTTP ${response.status}`);
    }

    const cookies = parseSetCookie(response.headers["set-cookie"]);
    const nextSession = buildSessionFromAuthReply(
      {
        discordUserId: String(discordUserId),
        discordUsername,
        email,
      },
      response.data,
      cookies,
      "password"
    );

    setSession(discordUserId, nextSession);
    return nextSession;
  } catch (error) {
    throw new Error(normalizeApiError(error, "Login"));
  }
}

async function claim(discordUserId, discordUsername, email, username, password) {
  try {
    const { response: claimResponse } = await authRequestWithRetry(
      discordUserId,
      discordUsername,
      (session) =>
        post(
          "/auth/claim",
          { email, username, password },
          {
            token: session.accessToken,
            additional: { "Content-Type": "application/json" },
          }
        )
    );

    if (claimResponse.status < 200 || claimResponse.status >= 300) {
      throw new Error(`claim failed with HTTP ${claimResponse.status}`);
    }

    const existing = getSession(discordUserId) || {
      discordUserId: String(discordUserId),
      discordUsername,
    };

    const cookies = parseSetCookie(claimResponse.headers["set-cookie"]);
    const nextSession = buildSessionFromAuthReply(
      {
        ...existing,
        email,
      },
      claimResponse.data,
      cookies,
      "password"
    );

    setSession(discordUserId, nextSession);
    return nextSession;
  } catch (error) {
    throw new Error(normalizeApiError(error, "Claim account"));
  }
}

async function logout(discordUserId) {
  const existing = getSession(discordUserId);

  if (existing?.accessToken) {
    try {
      await post("/auth/logout", null, { token: existing.accessToken });
    } catch (error) {
      console.error("Error - logout:", normalizeApiError(error, "Logout"));
    }
  }

  clearSession(discordUserId);
}

async function getAuthMe(discordUserId, discordUsername) {
  const { session, response } = await authRequestWithRetry(discordUserId, discordUsername, (activeSession) =>
    get("/auth/me", { token: activeSession.accessToken })
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Fetching identity failed with HTTP ${response.status}`);
  }

  return {
    ...response.data,
    authType: session.authType,
    apiUsername: session.apiUsername,
    discordUserId: session.discordUserId,
  };
}

async function getConversation(discordUserId, discordUsername) {
  const { response } = await authRequestWithRetry(discordUserId, discordUsername, (session) =>
    get("/messages/conversation", { token: session.accessToken })
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Fetching conversation failed with HTTP ${response.status}`);
  }

  return response.data?.conversation || null;
}

async function getActiveAgent(discordUserId, discordUsername) {
  const { response } = await authRequestWithRetry(discordUserId, discordUsername, (session) =>
    get("/agents/active", { token: session.accessToken })
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Fetching active agent failed with HTTP ${response.status}`);
  }

  return response.data?.agent || null;
}

async function getLatestThought(discordUserId, discordUsername) {
  const { response } = await authRequestWithRetry(discordUserId, discordUsername, (session) =>
    get("/thoughts/latest", { token: session.accessToken })
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Fetching latest thought failed with HTTP ${response.status}`);
  }

  return response.data?.latest_thought || null;
}

function getStoredSession(discordUserId) {
  return getSession(discordUserId);
}

async function CheckImplicitAddressing() {
  // Voice mode does not yet include explicit mention metadata.
  // Return true to preserve legacy behavior.
  return true;
}

module.exports = {
  GetResponse,
  CheckImplicitAddressing,
  createGuest,
  login,
  claim,
  logout,
  getAuthMe,
  getConversation,
  getActiveAgent,
  getLatestThought,
  getStoredSession,
};
