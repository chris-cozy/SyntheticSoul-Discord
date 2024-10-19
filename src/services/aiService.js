const {
    openai,
    MIN_EMOTION_VALUE,
    MAX_EMOTION_VALUE,
    MIN_SENTIMENT_VALUE,
    MAX_SENTIMENT_VALUE,
    CHOICE_RESPOND,
    CHOICE_IGNORE,
    getEmotionStatusSchema,
    getMessageSchema,
    getSummarySchema,
    getResponseChoiceSchema,
    getIdentitySchema,
    getSentimentStatusSchema,
    getPersonalityStatusSchema,
    MIN_PERSONALITY_VALUE,
    MAX_PERSONALITY_VALUE,
    EXTRINSIC_RELATIONSHIPS,
    getExtrinsicRelationshipSchema,
    NO_INTRINSIC_RELATIONSHIP,
  } = require("../constants/constants");


  /**
 * @brief Queries the openai api to receive a structure response.
 * @param {Array} messages - The array of message objects to query
 * @param {Object} schema - The schema object for structuring the result
 * @returns The message as a parsed JSON object
 */
export const GetStructuredInnerDialogueResponse = async (messages, schema) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: messages,
        response_format: schema,
      });
      console.log("---------------");
      console.log(
        JSON.stringify(JSON.parse(response.data.choices[0].message.content))
      );
      console.log("---------------");

      const parsed = JSON.parse(
        response.data.choices[0].message.content.trim()
      );

      return parsed;
    } catch (error) {
      msg.reply({content: `System Error: ${error.message}`, ephemeral: true});
      console.log(`System Error: ${error.message}`);
      return null;
    }
  }