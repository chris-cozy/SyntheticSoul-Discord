const { ActivityType } = require("discord.js");


/**
 * @brief Grabs the desired activity type
 * @param {String} type - Activity category
 * @returns Corresponding ActivityType
 */
function GetType(type) {
  switch (type) {
    case "streaming":
      return ActivityType.Streaming;
    case "watching":
      return ActivityType.Watching;
    case "custom":
      return ActivityType.Custom;
    case "listening":
      return ActivityType.Listening;
    case "playing":
      return ActivityType.Playing;
    default:
      return ActivityType.Custom;
  }
}

/**
 * @brief Formats the date for better readability
 * @param {Date} date - Desired date
 * @returns Formatted string
 */
function FormatDate(date) {
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${formattedDate} ${hours}:${minutes}${ampm}`;
}

/**
 * @brief Converts minutes into milliseconds
 * @param {int} minutes - Minutes to convert
 * @returns Converted milliseconds
 */
function MinutesToMilliseconds(minutes) {
  return minutes * 60 * 1000;
}

/**
 * @brief Causes bot to leave all unspecified guilds
 * @param {Client} client - The bot client
 */
async function LeaveUnregisteredGuilds(client) {
  try {
    const guilds = await client.guilds.fetch();

    guilds.forEach(async (partialGuild) => {
      try {
        // Fetch the full Guild object
        const guild = await client.guilds.resolve(partialGuild.id);
        
        if (!guild) {
          console.error(`Error - LeaveUnregisteredGuilds: Could not resolve guild with ID ${partialGuild.id}`);
          return;
        }

        if (guild.id !== process.env.GUILD_ID) {
          try {
            await guild.leave();
            console.log(`Success - LeaveUnregisteredGuilds: Leaving guild: ${guild.name} (${guild.id})`);
          } catch (error) {
            console.error(`Error - LeaveUnregisteredGuilds: While leaving guild ${guild.name} (${guild.id}):`, error);
          }
        } else {
          console.log(`Success - LeaveUnregisteredGuilds: Exempt guild: ${guild.name} (${guild.id})`);
        }
      } catch (error) {
        console.error(`Error - LeaveUnregisteredGuilds: While fetching guild with ID ${partialGuild.id}:`, error);
      }
    });
  } catch (error) {
    console.error('Error - LeaveUnregisteredGuilds: While fetching guilds:', error);
  }
}

module.exports = {
  FormatDate,
  GetType,
  MinutesToMilliseconds,
  LeaveUnregisteredGuilds
};
