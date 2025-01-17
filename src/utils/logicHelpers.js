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

function MinutesToMilliseconds(minutes) {
  return minutes * 60 * 1000;
}

module.exports = {
  FormatDate,
  GetType,
  MinutesToMilliseconds,
};
