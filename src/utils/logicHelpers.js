import { getPersonalityStatusSchema } from "../constants/constants";

const { ActivityType, Client, User } = require("discord.js");
const {GetStructuredInnerDialogueResponse} = require("../services/aiService");
const {getPersonalityStatusSchema, MIN_PERSONALITY_VALUE, MAX_PERSONALITY_VALUE} = require("../constants/constants");


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


   /**
* @brief Alters the self's personality based on the user's sentiment status and their extrinsic relationship
* @param {Self} self - The self
* @param {User} user - The user
* @param {String} extrinsicRelationshipString - A string describing the extrinisic relationship between self and user
* @returns New personality object
*/
  export const AlterPersonality = async (self, user, extrinsicRelationshipString) => {
    let personality = self.personality_matrix;
    let sentiment = user.sentiment_status;

    let alterQuery = [
      {
        role: "user",
        content: `These are ${self.name}'s personality traits: ${JSON.stringify(
          personality
        )}. These are ${self.name}'s sentiments towards ${
          user.name
        }: ${sentiment}. ${extrinsicRelationshipString} How would these sentiments and extrinsic relationship alter ${
          self.name
        }'s personality when interacting with ${
          user.name
        }? Provide the new object (only the personality traits whose value properties have changed, whether increased or decreased). Scale: ${MIN_PERSONALITY_VALUE} (lowest intensity) to ${MAX_PERSONALITY_VALUE} (highest intensity)`,
      },
    ];

    let alterQueryResponse = await GetStructuredInnerDialogueResponse(
      alterQuery,
      getPersonalityStatusSchema()
    );

    let alteredPersonality = DeepMerge(personality, alterQueryResponse);

    return alteredPersonality;
  }