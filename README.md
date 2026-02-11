# SyntheticSoul-Discord

Discord bot integration for [SyntheticSoulAPI](https://github.com/chris-cozy/SyntheticSoulAPI), updated for the current authenticated API contract.

## What This Version Supports

- Guest-first messaging (automatic guest session per Discord user)
- Account claim/upgrade flow (`guest -> registered`) from Discord slash command
- Login for existing users with persisted identity and conversation continuity
- Async message handling via `/messages/submit` + `/jobs/{job_id}`
- Conversation-aware chat using API v1 session/conversation model
- Session persistence across bot restarts via local token/cookie store

## API Compatibility

This bot targets the current API flow:

1. `POST /auth/guest` (auto on first message if no session)
2. `POST /messages/submit`
3. `GET /jobs/{job_id}` polling until `succeeded`
4. Optional identity/profile calls:
- `GET /auth/me`
- `GET /messages/conversation`
- `GET /agents/active`
- `GET /thoughts/latest`

It also supports:

- `POST /auth/login`
- `POST /auth/claim`
- `POST /auth/refresh` (cookie + CSRF)
- `POST /auth/logout`

## Installation

Prerequisite: use Node.js `20.x` or `22.x` LTS (this repo is not pinned for Node `24.x`).

1. Install dependencies:
```bash
npm install
```

2. Create `.env` in the project root.

3. Start the bot:
```bash
npm start
```

For development:
```bash
npm run dev
```

## Docker Deployment

This repo includes `Dockerfile` and `compose.yaml` for long-running deployment.

1. Create/update `.env` in the project root.

2. Build and start:
```bash
docker compose up -d --build
```

3. Follow logs:
```bash
docker compose logs -f synthetic-soul-discord
```

4. Stop:
```bash
docker compose down
```

Notes:
- Session state persists through the named volume `synthetic-soul-discord-data`
- Set `SYNTHETIC_SOUL_API_BASE_URL` to a reachable API URL from inside this container.
- If the API is in a different Compose project but published on the host (for example, `:8000`), use `http://host.docker.internal:8000/v1`.
- If bot + API are in the same Compose project/network, use the API service name (example: `http://syntheticsoul-api:8000/v1`) instead of `127.0.0.1`.

## Environment Variables

### Required

- `TOKEN`: Discord bot token
- `SYNTHETIC_SOUL_API_BASE_URL`: API base URL including version path (example: `http://127.0.0.1:8000/v1`)

### Strongly Recommended

- `TEST_SERVER`: Guild ID for slash command registration target in this codebase
- `ENABLE_USER_INSTALLS`: set to `true` to sync global commands for User Install context (default: `true`)

### Optional Runtime Tuning

- `SYNTHETIC_SOUL_HTTP_TIMEOUT_MS` (default: `30000`)
- `SYNTHETIC_SOUL_JOB_MAX_POLLS` (default: `50`)
- `SYNTHETIC_SOUL_JOB_BASE_POLL_MS` (default: `1200`)

### Legacy Fallback

- `SYNTHETIC_SOUL_API_URL`: legacy value accepted as fallback if `SYNTHETIC_SOUL_API_BASE_URL` is missing

## Discord Usage

### Message Chat

- DM the bot to chat with message type `dm`
- In guild channels, mention the bot (`@BotName ...`) to chat with message type `group`

### Auth Commands

- `/guest`: start/reset guest session
- `/login email:<email> password:<password>`: sign into existing account
- `/claim email:<email> username:<username> password:<password>`: upgrade current guest
- `/logout`: clear bot-side local session
- `/session`: inspect current linked session

### Info/State Commands

- `/self`: API identity + conversation stats
- `/emotion`: active agent emotional metrics
- `/sentiment`: conversation context snapshot

## Session Storage

Per-Discord-user API session data is stored in:

- `data/sessions.json`

This includes access token metadata and refresh cookies needed for token rotation.

`data/` is ignored by git.

## Notes

- If a registered user session cannot be refreshed, the bot asks that user to run `/login` again.
- If a guest session expires and cannot be refreshed, the bot auto-creates a new guest session.
- Message length is validated against API contract limits (`1..4000` characters).

## Troubleshooting

- `401` on chat commands:
  - Run `/session` to inspect identity state
  - If registered account session expired, run `/login`
- No bot response in server channel:
  - Ensure the bot was mentioned in the message
- Jobs never complete:
  - Verify SyntheticSoulAPI worker is running and queue is healthy (`/v1/meta/queue`)

## Versioning

- Current version: `1.0.0`
- This project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
  - `MAJOR`: breaking changes
  - `MINOR`: backward-compatible features
  - `PATCH`: backward-compatible fixes
- Changelog: see `/Users/csandery/Documents/Personal Documents/Software Projects/SyntheticSoul-Discord/CHANGELOG.md`
- Helper scripts:
  - `npm run version:patch`
  - `npm run version:minor`
  - `npm run version:major`

## License

MIT
