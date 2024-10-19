const { ActivityType, Client, User } = require("discord.js");


/**
* @brief Merges the property values of the source object into the property values of the target object
* @param {Boolean} average - Whether or not to average the values when merging, providing a smoother transition 
* @param {Object} target - Target object
* @param {Object} source - Source object
* @returns Target object with the new property values
*/
export const DeepMerge = (target, source, average = false) => {
    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        target[key] = DeepMerge(target[key], source[key], average);
      } else {
        if (average){
            target[key] = (target[key] + source[key]) / 2;
        }else{
            target[key] = source[key];
        }
        
      }
    }
    return target;
  }


/**
* @brief Grabs the desired activity type
* @param {String} type - Activity category
* @returns Corresponding ActivityType
*/
  export const GetType = (type) => {
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
  export const FormatDate = (date) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${formattedDate} ${hours}:${minutes}${ampm}`;
  }