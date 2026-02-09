const { GetLocalCommands, AreCommandsDifferent, GetApplicationCommands } = require("../../utils/fileHelpers");
const { Client } = require("discord.js");

function parseBoolean(value, defaultValue = false) {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return defaultValue;
}

function shouldRegisterForUserInstall(commandObject) {
  if (!commandObject || commandObject.deleted) {
    return false;
  }

  if (commandObject.userInstall === false) {
    return false;
  }

  if (commandObject.testOnly) {
    return false;
  }

  if (commandObject.devOnly || commandObject.devonly) {
    return false;
  }

  if (commandObject.guildOnly) {
    return false;
  }

  return true;
}

function buildCommandPayload(localCommand, includeInstallMetadata = false) {
  const payload = {
    name: localCommand.name,
    description: localCommand.description,
    options: localCommand.options || [],
  };

  if (includeInstallMetadata) {
    // 0 = GUILD_INSTALL, 1 = USER_INSTALL
    payload.integrationTypes = Array.isArray(localCommand.integrationTypes)
      ? localCommand.integrationTypes
      : [0, 1];

    // 0 = GUILD, 1 = BOT_DM, 2 = PRIVATE_CHANNEL
    payload.contexts = Array.isArray(localCommand.contexts)
      ? localCommand.contexts
      : [0, 1, 2];
  }

  return payload;
}

async function syncCommands(applicationCommands, localCommands, scopeLabel, includeInstallMetadata = false) {
  const desiredNames = new Set();

  for (const localCommand of localCommands) {
    const name = localCommand.name;
    const existingCommand = applicationCommands.cache.find((cmd) => cmd.name === name);

    if (localCommand.deleted) {
      if (existingCommand) {
        await applicationCommands.delete(existingCommand.id);
        console.log(`[${scopeLabel}] Deleted command "${name}".`);
      }
      continue;
    }

    desiredNames.add(name);
    const payload = buildCommandPayload(localCommand, includeInstallMetadata);

    if (existingCommand) {
      if (AreCommandsDifferent(existingCommand, payload)) {
        await applicationCommands.edit(existingCommand.id, payload);
        console.log(`[${scopeLabel}] Edited command "${name}".`);
      }
      continue;
    }

    await applicationCommands.create(payload);
    console.log(`[${scopeLabel}] Registered command "${name}".`);
  }

  // Remove commands that no longer exist in local command source for this scope.
  for (const existingCommand of applicationCommands.cache.values()) {
    if (!desiredNames.has(existingCommand.name)) {
      await applicationCommands.delete(existingCommand.id);
      console.log(`[${scopeLabel}] Removed undeclared command "${existingCommand.name}".`);
    }
  }
}

/**
 * @brief Register/Edit/Delete local and application slash commands
 * @param {Client} client
 */
module.exports = async (client) => {
  try {
    const localCommands = GetLocalCommands();
    const guildId = process.env.TEST_SERVER;
    const enableUserInstalls = parseBoolean(process.env.ENABLE_USER_INSTALLS, true);

    if (guildId) {
      const guildCommands = await GetApplicationCommands(client, guildId);
      await syncCommands(guildCommands, localCommands, `guild:${guildId}`, false);
    }

    const shouldSyncGlobalCommands = enableUserInstalls || !guildId;
    if (shouldSyncGlobalCommands) {
      const globalCommands = await GetApplicationCommands(client);
      const globalCommandSource = enableUserInstalls
        ? localCommands.filter(shouldRegisterForUserInstall)
        : localCommands;

      await syncCommands(globalCommands, globalCommandSource, "global", enableUserInstalls);
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
