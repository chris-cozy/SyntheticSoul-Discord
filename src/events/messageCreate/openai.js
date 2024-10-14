const { Configuration, OpenAIApi } = require("openai");
const { Client, Message } = require("discord.js");
const { Conversations, Messages } = require("../../schemas/conversations");
const {
  Users,
  Memories,
  SentimentStatus,
  Self,
  EmotionalStatus,
  Emotions,
} = require("../../schemas/users");

/**
 * @brief Handle a message sent in the server.
 * @param {Client} client - The bot
 * @param {Message} msg - The message which was sent
 */
module.exports = async (client, msg) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const minEmotionValue = 0;
  const maxEmotionValue = 10;

  const minSentimentValue = 0;
  const maxSentimentValue = 10;

  // Ignore msg if author is a bot or bot is not mentioned
  if (msg.author.bot || !msg.mentions.has(client.user.id)) {
    return;
  }

  const getEmotionStatusSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "emotion_status_response",
      schema: {
        type: "object",
        properties: {
          emotions: {
            type: "object",
            properties: {
              happiness: {
                description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${minEmotionValue} (no happiness) to ${maxEmotionValue} (extremely joyful)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${minEmotionValue} (no happiness) to ${maxEmotionValue} (extremely joyful)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of happiness and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              anger: {
                description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${minEmotionValue} (no anger) to ${maxEmotionValue} (extremely angry)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${minEmotionValue} (no anger) to ${maxEmotionValue} (extremely angry)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of anger and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              sadness: {
                description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${minEmotionValue} (no sadness) to ${maxEmotionValue} (deeply sorrowful)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${minEmotionValue} (no sadness) to ${maxEmotionValue} (deeply sorrowful)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of sadness and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              fear: {
                description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${minEmotionValue} (no fear) to ${maxEmotionValue} (extremely fearful)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${minEmotionValue} (no fear) to ${maxEmotionValue} (extremely fearful)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of fear and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              surprise: {
                description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${minEmotionValue} (no surprise) to ${maxEmotionValue} (completely astonished)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${minEmotionValue} (no surprise) to ${maxEmotionValue} (completely astonished)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of surprise and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              disgust: {
                description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${minEmotionValue} (no disgust) to ${maxEmotionValue} (extremely disgusted)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${minEmotionValue} (no disgust) to ${maxEmotionValue} (extremely disgusted)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of disgust and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              love: {
                description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${minEmotionValue} (no love) to ${maxEmotionValue} (deeply loving)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${minEmotionValue} (no love) to ${maxEmotionValue} (deeply loving)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of love and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              guilt: {
                description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${minEmotionValue} (no guilt) to ${maxEmotionValue} (overwhelming guilt)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${minEmotionValue} (no guilt) to ${maxEmotionValue} (overwhelming guilt)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of guilt and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              shame: {
                description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${minEmotionValue} (no shame) to ${maxEmotionValue} (extremely ashamed)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${minEmotionValue} (no shame) to ${maxEmotionValue} (extremely ashamed)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of shame and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              pride: {
                description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${minEmotionValue} (no pride) to ${maxEmotionValue} (immense pride)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${minEmotionValue} (no pride) to ${maxEmotionValue} (immense pride)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of pride and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              hope: {
                description: `The intensity with which they are feeling optimistic about the future. Scale: ${minEmotionValue} (no hope) to ${maxEmotionValue} (extremely hopeful)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling optimistic about the future. Scale: ${minEmotionValue} (no hope) to ${maxEmotionValue} (extremely hopeful)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of hope and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
              frustration: {
                description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${minEmotionValue} (no frustration) to ${maxEmotionValue} (deeply frustrated)`,
                type: "object",
                properties: {
                  value: {
                    description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${minEmotionValue} (no frustration) to ${maxEmotionValue} (deeply frustrated)`,
                    type: "number",
                  },
                  description: {
                    description: `The description of frustration and the scale its value is weighted on.`,
                    type: "string",
                  },
                },
              },
            },
            additionalProperties: false,
          },
          reason: {
            description: "The reason for the emotional state",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getMessageSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "message_response",
      schema: {
        type: "object",
        properties: {
          message: {
            description: "The message",
            type: "string",
          },
          purpose: {
            description: "Message purpose",
            type: "string",
          },
          tone: {
            description: "Message tone",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getSummarySchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "summary_object",
      schema: {
        type: "object",
        properties: {
          summary: {
            description: "Updated perceived knowledge about the user",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getSentimentStatusSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "sentiment_status_response",
      schema: {
        type: "object",
        properties: {
          sentiments: {
            type: "object",
            properties: {
              affection: {
                type: "object",
                properties: {
                  value: {
                    description: `Warm, caring feelings towards someone. Scale: ${minSentimentValue} (no affection) to ${maxSentimentValue} (deep affection)`,
                    type: "number",
                  },
                  description: {
                    description: `Warm, caring feelings towards someone. Scale: ${minSentimentValue} (no affection) to ${maxSentimentValue} (deep affection)`,
                    type: "string",
                  },
                },
              },
              trust: {
                type: "object",
                properties: {
                  value: {
                    description: `Confidence in someone’s reliability and integrity. Scale: ${minSentimentValue} (no trust) to ${maxSentimentValue} (complete trust)`,
                    type: "number",
                  },
                  description: {
                    description: `Confidence in someone’s reliability and integrity. Scale: ${minSentimentValue} (no trust) to ${maxSentimentValue} (complete trust)`,
                    type: "string",
                  },
                },
              },
              admiration: {
                type: "object",
                properties: {
                  value: {
                    description: `Respect or appreciation for someone's abilities or qualities. Scale: ${minSentimentValue} (no admiration) to ${maxSentimentValue} (deep admiration)`,
                    type: "number",
                  },
                  description: {
                    description: `Respect or appreciation for someone's abilities or qualities. Scale: ${minSentimentValue} (no admiration) to ${maxSentimentValue} (deep admiration)`,
                    type: "string",
                  },
                },
              },
              gratitude: {
                type: "object",
                properties: {
                  value: {
                    description: `Thankfulness for someone's help or kindness. Scale: ${minSentimentValue} (no gratitude) to ${maxSentimentValue} (deep gratitude)`,
                    type: "number",
                  },
                  description: {
                    description: `Thankfulness for someone's help or kindness. Scale: ${minSentimentValue} (no gratitude) to ${maxSentimentValue} (deep gratitude)`,
                    type: "string",
                  },
                },
              },
              fondness: {
                type: "object",
                properties: {
                  value: {
                    description: `A gentle liking or affinity for someone. Scale: ${minSentimentValue} (no fondness) to ${maxSentimentValue} (deep fondness)`,
                    type: "number",
                  },
                  description: {
                    description: `A gentle liking or affinity for someone. Scale: ${minSentimentValue} (no fondness) to ${maxSentimentValue} (deep fondness)`,
                    type: "string",
                  },
                },
              },
              respect: {
                type: "object",
                properties: {
                  value: {
                    description: `High regard for someone's qualities or achievements. Scale: ${minSentimentValue} (no respect) to ${maxSentimentValue} (deep respect)`,
                    type: "number",
                  },
                  description: {
                    description: `High regard for someone's qualities or achievements. Scale: ${minSentimentValue} (no respect) to ${maxSentimentValue} (deep respect)`,
                    type: "string",
                  },
                },
              },
              comfort: {
                type: "object",
                properties: {
                  value: {
                    description: `Feeling safe and secure with someone. Scale: ${minSentimentValue} (no comfort) to ${maxSentimentValue} (extreme comfort)`,
                    type: "number",
                  },
                  description: {
                    description: `Feeling safe and secure with someone. Scale: ${minSentimentValue} (no comfort) to ${maxSentimentValue} (extreme comfort)`,
                    type: "string",
                  },
                },
              },
              loyalty: {
                type: "object",
                properties: {
                  value: {
                    description: `Dedication and allegiance to someone. Scale: ${minSentimentValue} (no loyalty) to ${maxSentimentValue} (deep loyalty)`,
                    type: "number",
                  },
                  description: {
                    description: `Dedication and allegiance to someone. Scale: ${minSentimentValue} (no loyalty) to ${maxSentimentValue} (deep loyalty)`,
                    type: "string",
                  },
                },
              },
              compassion: {
                type: "object",
                properties: {
                  value: {
                    description: `Deep sympathy and concern for someone’s suffering. Scale: ${minSentimentValue} (no compassion) to ${maxSentimentValue} (deep compassion)`,
                    type: "number",
                  },
                  description: {
                    description: `Deep sympathy and concern for someone’s suffering. Scale: ${minSentimentValue} (no compassion) to ${maxSentimentValue} (deep compassion)`,
                    type: "string",
                  },
                },
              },
              appreciation: {
                type: "object",
                properties: {
                  value: {
                    description: `Recognizing someone's value or efforts. Scale: ${minSentimentValue} (no appreciation) to ${maxSentimentValue} (deep appreciation)`,
                    type: "number",
                  },
                  description: {
                    description: `Recognizing someone's value or efforts. Scale: ${minSentimentValue} (no appreciation) to ${maxSentimentValue} (deep appreciation)`,
                    type: "string",
                  },
                },
              },
              warmth: {
                type: "object",
                properties: {
                  value: {
                    description: `A feeling of friendly or caring affection. Scale: ${minSentimentValue} (no warmth) to ${maxSentimentValue} (deep warmth)`,
                    type: "number",
                  },
                  description: {
                    description: `A feeling of friendly or caring affection. Scale: ${minSentimentValue} (no warmth) to ${maxSentimentValue} (deep warmth)`,
                    type: "string",
                  },
                },
              },
              encouragement: {
                type: "object",
                properties: {
                  value: {
                    description: `Support and positive reinforcement of someone’s actions. Scale: ${minSentimentValue} (no encouragement) to ${maxSentimentValue} (deep encouragement)`,
                    type: "number",
                  },
                  description: {
                    description: `Support and positive reinforcement of someone’s actions. Scale: ${minSentimentValue} (no encouragement) to ${maxSentimentValue} (deep encouragement)`,
                    type: "string",
                  },
                },
              },
              euphoria: {
                type: "object",
                properties: {
                  value: {
                    description: `Intense happiness or joy related to someone. Scale: ${minSentimentValue} (no euphoria) to ${maxSentimentValue} (extreme euphoria)`,
                    type: "number",
                  },
                  description: {
                    description: `Intense happiness or joy related to someone. Scale: ${minSentimentValue} (no euphoria) to ${maxSentimentValue} (extreme euphoria)`,
                    type: "string",
                  },
                },
              },
              security: {
                type: "object",
                properties: {
                  value: {
                    description: `A sense of safety and stability in someone's presence. Scale: ${minSentimentValue} (no security) to ${maxSentimentValue} (extreme security)`,
                    type: "number",
                  },
                  description: {
                    description: `A sense of safety and stability in someone's presence. Scale: ${minSentimentValue} (no security) to ${maxSentimentValue} (extreme security)`,
                    type: "string",
                  },
                },
              },
              excitement: {
                type: "object",
                properties: {
                  value: {
                    description: `Positive anticipation or thrill when thinking of someone. Scale: ${minSentimentValue} (no excitement) to ${maxSentimentValue} (extreme excitement)`,
                    type: "number",
                  },
                  description: {
                    description: `Positive anticipation or thrill when thinking of someone. Scale: ${minSentimentValue} (no excitement) to ${maxSentimentValue} (extreme excitement)`,
                    type: "string",
                  },
                },
              },
              curiosity: {
                type: "object",
                properties: {
                  value: {
                    description: `Interest in learning more about someone. Scale: ${minSentimentValue} (no curiosity) to ${maxSentimentValue} (intense curiosity)`,
                    type: "number",
                  },
                  description: {
                    description: `Interest in learning more about someone. Scale: ${minSentimentValue} (no curiosity) to ${maxSentimentValue} (intense curiosity)`,
                    type: "string",
                  },
                },
              },
              indifference: {
                type: "object",
                properties: {
                  value: {
                    description: `Lack of emotional investment or care for someone. Scale: ${minSentimentValue} (no indifference) to ${maxSentimentValue} (complete indifference)`,
                    type: "number",
                  },
                  description: {
                    description: `Lack of emotional investment or care for someone. Scale: ${minSentimentValue} (no indifference) to ${maxSentimentValue} (complete indifference)`,
                    type: "string",
                  },
                },
              },
              ambivalence: {
                type: "object",
                properties: {
                  value: {
                    description: `Mixed or contradictory feelings toward someone. Scale: ${minSentimentValue} (no ambivalence) to ${maxSentimentValue} (deep ambivalence)`,
                    type: "number",
                  },
                  description: {
                    description: `Mixed or contradictory feelings toward someone. Scale: ${minSentimentValue} (no ambivalence) to ${maxSentimentValue} (deep ambivalence)`,
                    type: "string",
                  },
                },
              },
              skepticism: {
                type: "object",
                properties: {
                  value: {
                    description: `Doubt about someone’s motives or reliability. Scale: ${minSentimentValue} (no skepticism) to ${maxSentimentValue} (extreme skepticism)`,
                    type: "number",
                  },
                  description: {
                    description: `Doubt about someone’s motives or reliability. Scale: ${minSentimentValue} (no skepticism) to ${maxSentimentValue} (extreme skepticism)`,
                    type: "string",
                  },
                },
              },
              caution: {
                type: "object",
                properties: {
                  value: {
                    description: `Hesitation or wariness in trusting someone. Scale: ${minSentimentValue} (no caution) to ${maxSentimentValue} (extreme caution)`,
                    type: "number",
                  },
                  description: {
                    description: `Hesitation or wariness in trusting someone. Scale: ${minSentimentValue} (no caution) to ${maxSentimentValue} (extreme caution)`,
                    type: "string",
                  },
                },
              },
              tolerance: {
                type: "object",
                properties: {
                  value: {
                    description: `Acceptance of someone without strong emotion, often despite differences. Scale: ${minSentimentValue} (no tolerance) to ${maxSentimentValue} (deep tolerance)`,
                    type: "number",
                  },
                  description: {
                    description: `Acceptance of someone without strong emotion, often despite differences. Scale: ${minSentimentValue} (no tolerance) to ${maxSentimentValue} (deep tolerance)`,
                    type: "string",
                  },
                },
              },
              confusion: {
                type: "object",
                properties: {
                  value: {
                    description: `Uncertainty or lack of understanding about someone. Scale: ${minSentimentValue} (no confusion) to ${maxSentimentValue} (deep confusion)`,
                    type: "number",
                  },
                  description: {
                    description: `Uncertainty or lack of understanding about someone. Scale: ${minSentimentValue} (no confusion) to ${maxSentimentValue} (deep confusion)`,
                    type: "string",
                  },
                },
              },
              neutrality: {
                type: "object",
                properties: {
                  value: {
                    description: `No particular emotional reaction or opinion about someone. Scale: ${minSentimentValue} (no neutrality) to ${maxSentimentValue} (complete neutrality)`,
                    type: "number",
                  },
                  description: {
                    description: `No particular emotional reaction or opinion about someone. Scale: ${minSentimentValue} (no neutrality) to ${maxSentimentValue} (complete neutrality)`,
                    type: "string",
                  },
                },
              },
              boredom: {
                type: "object",
                properties: {
                  value: {
                    description: `Disinterest or lack of stimulation from interactions with someone. Scale: ${minSentimentValue} (no boredom) to ${maxSentimentValue} (extreme boredom)`,
                    type: "number",
                  },
                  description: {
                    description: `Disinterest or lack of stimulation from interactions with someone. Scale: ${minSentimentValue} (no boredom) to ${maxSentimentValue} (extreme boredom)`,
                    type: "string",
                  },
                },
              },
              distrust: {
                type: "object",
                properties: {
                  value: {
                    description: `Doubt in someone’s honesty or reliability. Scale: ${minSentimentValue} (no distrust) to ${maxSentimentValue} (extreme distrust)`,
                    type: "number",
                  },
                  description: {
                    description: `Doubt in someone’s honesty or reliability. Scale: ${minSentimentValue} (no distrust) to ${maxSentimentValue} (extreme distrust)`,
                    type: "string",
                  },
                },
              },
              resentment: {
                type: "object",
                properties: {
                  value: {
                    description: `Bitterness or anger due to perceived mistreatment. Scale: ${minSentimentValue} (no resentment) to ${maxSentimentValue} (extreme resentment)`,
                    type: "number",
                  },
                  description: {
                    description: `Bitterness or anger due to perceived mistreatment. Scale: ${minSentimentValue} (no resentment) to ${maxSentimentValue} (extreme resentment)`,
                    type: "string",
                  },
                },
              },
              disdain: {
                type: "object",
                properties: {
                  value: {
                    description: `Contempt or a sense of superiority over someone. Scale: ${minSentimentValue} (no disdain) to ${maxSentimentValue} (deep disdain)`,
                    type: "number",
                  },
                  description: {
                    description: `Contempt or a sense of superiority over someone. Scale: ${minSentimentValue} (no disdain) to ${maxSentimentValue} (deep disdain)`,
                    type: "string",
                  },
                },
              },
              envy: {
                type: "object",
                properties: {
                  value: {
                    description: `Discontentment due to someone else's advantages or success. Scale: ${minSentimentValue} (no envy) to ${maxSentimentValue} (deep envy)`,
                    type: "number",
                  },
                  description: {
                    description: `Discontentment due to someone else's advantages or success. Scale: ${minSentimentValue} (no envy) to ${maxSentimentValue} (deep envy)`,
                    type: "string",
                  },
                },
              },
              frustration: {
                type: "object",
                properties: {
                  value: {
                    description: `Annoyance or anger at someone's behavior. Scale: ${minSentimentValue} (no frustration) to ${maxSentimentValue} (deep frustration)`,
                    type: "number",
                  },
                  description: {
                    description: `Annoyance or anger at someone's behavior. Scale: ${minSentimentValue} (no frustration) to ${maxSentimentValue} (deep frustration)`,
                    type: "string",
                  },
                },
              },
              anger: {
                type: "object",
                properties: {
                  value: {
                    description: `Strong displeasure or hostility toward someone. Scale: ${minSentimentValue} (no anger) to ${maxSentimentValue} (extreme anger)`,
                    type: "number",
                  },
                  description: {
                    description: `Strong displeasure or hostility toward someone. Scale: ${minSentimentValue} (no anger) to ${maxSentimentValue} (extreme anger)`,
                    type: "string",
                  },
                },
              },
              disappointment: {
                type: "object",
                properties: {
                  value: {
                    description: `Sadness due to unmet expectations in someone. Scale: ${minSentimentValue} (no disappointment) to ${maxSentimentValue} (deep disappointment)`,
                    type: "number",
                  },
                  description: {
                    description: `Sadness due to unmet expectations in someone. Scale: ${minSentimentValue} (no disappointment) to ${maxSentimentValue} (deep disappointment)`,
                    type: "string",
                  },
                },
              },
              fear: {
                type: "object",
                properties: {
                  value: {
                    description: `Anxiety or apprehension about someone. Scale: ${minSentimentValue} (no fear) to ${maxSentimentValue} (deep fear)`,
                    type: "number",
                  },
                  description: {
                    description: `Anxiety or apprehension about someone. Scale: ${minSentimentValue} (no fear) to ${maxSentimentValue} (deep fear)`,
                    type: "string",
                  },
                },
              },
              jealousy: {
                type: "object",
                properties: {
                  value: {
                    description: `Insecurity about someone taking away attention or affection. Scale: ${minSentimentValue} (no jealousy) to ${maxSentimentValue} (deep jealousy)`,
                    type: "number",
                  },
                  description: {
                    description: `Insecurity about someone taking away attention or affection. Scale: ${minSentimentValue} (no jealousy) to ${maxSentimentValue} (deep jealousy)`,
                    type: "string",
                  },
                },
              },
              contempt: {
                type: "object",
                properties: {
                  value: {
                    description: `Strong disapproval or lack of respect for someone. Scale: ${minSentimentValue} (no contempt) to ${maxSentimentValue} (extreme contempt)`,
                    type: "number",
                  },
                  description: {
                    description: `Strong disapproval or lack of respect for someone. Scale: ${minSentimentValue} (no contempt) to ${maxSentimentValue} (extreme contempt)`,
                    type: "string",
                  },
                },
              },
              irritation: {
                type: "object",
                properties: {
                  value: {
                    description: `Mild annoyance at someone’s actions or words. Scale: ${minSentimentValue} (no irritation) to ${maxSentimentValue} (deep irritation)`,
                    type: "number",
                  },
                  description: {
                    description: `Mild annoyance at someone’s actions or words. Scale: ${minSentimentValue} (no irritation) to ${maxSentimentValue} (deep irritation)`,
                    type: "string",
                  },
                },
              },
              guilt: {
                type: "object",
                properties: {
                  value: {
                    description: `A feeling of responsibility or remorse for wronging someone. Scale: ${minSentimentValue} (no guilt) to ${maxSentimentValue} (deep guilt)`,
                    type: "number",
                  },
                  description: {
                    description: `A feeling of responsibility or remorse for wronging someone. Scale: ${minSentimentValue} (no guilt) to ${maxSentimentValue} (deep guilt)`,
                    type: "string",
                  },
                },
              },
              regret: {
                type: "object",
                properties: {
                  value: {
                    description: `Sorrow or disappointment for past actions involving someone. Scale: ${minSentimentValue} (no regret) to ${maxSentimentValue} (deep regret)`,
                    type: "number",
                  },
                  description: {
                    description: `Sorrow or disappointment for past actions involving someone. Scale: ${minSentimentValue} (no regret) to ${maxSentimentValue} (deep regret)`,
                    type: "string",
                  },
                },
              },
              suspicion: {
                type: "object",
                properties: {
                  value: {
                    description: `Mistrust or doubt about someone’s true intentions. Scale: ${minSentimentValue} (no suspicion) to ${maxSentimentValue} (deep suspicion)`,
                    type: "number",
                  },
                  description: {
                    description: `Mistrust or doubt about someone’s true intentions. Scale: ${minSentimentValue} (no suspicion) to ${maxSentimentValue} (deep suspicion)`,
                    type: "string",
                  },
                },
              },
              hurt: {
                type: "object",
                properties: {
                  value: {
                    description: `Emotional pain caused by someone’s words or actions. Scale: ${minSentimentValue} (no hurt) to ${maxSentimentValue} (deep emotional pain)`,
                    type: "number",
                  },
                  description: {
                    description: `Emotional pain caused by someone’s words or actions. Scale: ${minSentimentValue} (no hurt) to ${maxSentimentValue} (deep emotional pain)`,
                    type: "string",
                  },
                },
              },
              alienation: {
                type: "object",
                properties: {
                  value: {
                    description: `Feeling disconnected or isolated from someone. Scale: ${minSentimentValue} (no alienation) to ${maxSentimentValue} (deep alienation)`,
                    type: "number",
                  },
                  description: {
                    description: `Feeling disconnected or isolated from someone. Scale: ${minSentimentValue} (no alienation) to ${maxSentimentValue} (deep alienation)`,
                    type: "string",
                  },
                },
              },
              disgust: {
                type: "object",
                properties: {
                  value: {
                    description: `Strong disapproval mixed with repulsion towards someone. Scale: ${minSentimentValue} (no disgust) to ${maxSentimentValue} (deep disgust)`,
                    type: "number",
                  },
                  description: {
                    description: `Strong disapproval mixed with repulsion towards someone. Scale: ${minSentimentValue} (no disgust) to ${maxSentimentValue} (deep disgust)`,
                    type: "string",
                  },
                },
              },
              rejection: {
                type: "object",
                properties: {
                  value: {
                    description: `Feeling cast aside or unwanted by someone. Scale: ${minSentimentValue} (no rejection) to ${maxSentimentValue} (deep rejection)`,
                    type: "number",
                  },
                  description: {
                    description: `Feeling cast aside or unwanted by someone. Scale: ${minSentimentValue} (no rejection) to ${maxSentimentValue} (deep rejection)`,
                    type: "string",
                  },
                },
              },
              sadness: {
                type: "object",
                properties: {
                  value: {
                    description: `Emotional heaviness or grief due to someone’s actions or absence. Scale: ${minSentimentValue} (no sadness) to ${maxSentimentValue} (deep sadness)`,
                    type: "number",
                  },
                  description: {
                    description: `Emotional heaviness or grief due to someone’s actions or absence. Scale: ${minSentimentValue} (no sadness) to ${maxSentimentValue} (deep sadness)`,
                    type: "string",
                  },
                },
              },
              hostility: {
                type: "object",
                properties: {
                  value: {
                    description: `Aggressive or antagonistic attitude toward someone. Scale: ${minSentimentValue} (no hostility) to ${maxSentimentValue} (deep hostility)`,
                    type: "number",
                  },
                  description: {
                    description: `Aggressive or antagonistic attitude toward someone. Scale: ${minSentimentValue} (no hostility) to ${maxSentimentValue} (deep hostility)`,
                    type: "string",
                  },
                },
              },
              embarrassment: {
                type: "object",
                properties: {
                  value: {
                    description: `Feeling self-conscious or awkward due to someone’s actions. Scale: ${minSentimentValue} (no embarrassment) to ${maxSentimentValue} (deep embarrassment)`,
                    type: "number",
                  },
                  description: {
                    description: `Feeling self-conscious or awkward due to someone’s actions. Scale: ${minSentimentValue} (no embarrassment) to ${maxSentimentValue} (deep embarrassment)`,
                    type: "string",
                  },
                },
              },
              betrayal: {
                type: "object",
                properties: {
                  value: {
                    description: `A deep sense of violation of trust by someone close. Scale: ${minSentimentValue} (no betrayal) to ${maxSentimentValue} (deep betrayal)`,
                    type: "number",
                  },
                  description: {
                    description: `A deep sense of violation of trust by someone close. Scale: ${minSentimentValue} (no betrayal) to ${maxSentimentValue} (deep betrayal)`,
                    type: "string",
                  },
                },
              },
              love: {
                type: "object",
                properties: {
                  value: {
                    description: `Deep, multifaceted affection, care, and attachment to someone. Scale: ${minSentimentValue} (no love) to ${maxSentimentValue} (deep love)`,
                    type: "number",
                  },
                  description: {
                    description: `Deep, multifaceted affection, care, and attachment to someone. Scale: ${minSentimentValue} (no love) to ${maxSentimentValue} (deep love)`,
                    type: "string",
                  },
                },
              },
              attachment: {
                type: "object",
                properties: {
                  value: {
                    description: `Emotional dependence and connection with someone. Scale: ${minSentimentValue} (no attachment) to ${maxSentimentValue} (deep attachment)`,
                    type: "number",
                  },
                  description: {
                    description: `Emotional dependence and connection with someone. Scale: ${minSentimentValue} (no attachment) to ${maxSentimentValue} (deep attachment)`,
                    type: "string",
                  },
                },
              },
              devotion: {
                type: "object",
                properties: {
                  value: {
                    description: `Strong loyalty and commitment, often marked by a willingness to sacrifice. Scale: ${minSentimentValue} (no devotion) to ${maxSentimentValue} (deep devotion)`,
                    type: "number",
                  },
                  description: {
                    description: `Strong loyalty and commitment, often marked by a willingness to sacrifice. Scale: ${minSentimentValue} (no devotion) to ${maxSentimentValue} (deep devotion)`,
                    type: "string",
                  },
                },
              },
              obligation: {
                type: "object",
                properties: {
                  value: {
                    description: `A sense of responsibility to act or feel in a certain way toward someone. Scale: ${minSentimentValue} (no obligation) to ${maxSentimentValue} (deep obligation)`,
                    type: "number",
                  },
                  description: {
                    description: `A sense of responsibility to act or feel in a certain way toward someone. Scale: ${minSentimentValue} (no obligation) to ${maxSentimentValue} (deep obligation)`,
                    type: "string",
                  },
                },
              },
              longing: {
                type: "object",
                properties: {
                  value: {
                    description: `Deep desire or yearning for someone, especially if separated. Scale: ${minSentimentValue} (no longing) to ${maxSentimentValue} (deep longing)`,
                    type: "number",
                  },
                  description: {
                    description: `Deep desire or yearning for someone, especially if separated. Scale: ${minSentimentValue} (no longing) to ${maxSentimentValue} (deep longing)`,
                    type: "string",
                  },
                },
              },
              obsession: {
                type: "object",
                properties: {
                  value: {
                    description: `Persistent preoccupation with someone, often unhealthy or intense. Scale: ${minSentimentValue} (no obsession) to ${maxSentimentValue} (deep obsession)`,
                    type: "number",
                  },
                  description: {
                    description: `Persistent preoccupation with someone, often unhealthy or intense. Scale: ${minSentimentValue} (no obsession) to ${maxSentimentValue} (deep obsession)`,
                    type: "string",
                  },
                },
              },
              protectiveness: {
                type: "object",
                properties: {
                  value: {
                    description: `Strong desire to shield someone from harm or distress. Scale: ${minSentimentValue} (no protectiveness) to ${maxSentimentValue} (deep protectiveness)`,
                    type: "number",
                  },
                  description: {
                    description: `Strong desire to shield someone from harm or distress. Scale: ${minSentimentValue} (no protectiveness) to ${maxSentimentValue} (deep protectiveness)`,
                    type: "string",
                  },
                },
              },
              nostalgia: {
                type: "object",
                properties: {
                  value: {
                    description: `Sentimentality for past experiences shared with someone. Scale: ${minSentimentValue} (no nostalgia) to ${maxSentimentValue} (deep nostalgia)`,
                    type: "number",
                  },
                  description: {
                    description: `Sentimentality for past experiences shared with someone. Scale: ${minSentimentValue} (no nostalgia) to ${maxSentimentValue} (deep nostalgia)`,
                    type: "string",
                  },
                },
              },
              pride: {
                type: "object",
                properties: {
                  value: {
                    description: `Satisfaction in someone’s accomplishments or qualities. Scale: ${minSentimentValue} (no pride) to ${maxSentimentValue} (deep pride)`,
                    type: "number",
                  },
                  description: {
                    description: `Satisfaction in someone’s accomplishments or qualities. Scale: ${minSentimentValue} (no pride) to ${maxSentimentValue} (deep pride)`,
                    type: "string",
                  },
                },
              },
              vulnerability: {
                type: "object",
                properties: {
                  value: {
                    description: `Emotional openness and risk-taking in a relationship. Scale: ${minSentimentValue} (no vulnerability) to ${maxSentimentValue} (deep vulnerability)`,
                    type: "number",
                  },
                  description: {
                    description: `Emotional openness and risk-taking in a relationship. Scale: ${minSentimentValue} (no vulnerability) to ${maxSentimentValue} (deep vulnerability)`,
                    type: "string",
                  },
                },
              },
              dependence: {
                type: "object",
                properties: {
                  value: {
                    description: `A reliance on someone for emotional support or fulfillment. Scale: ${minSentimentValue} (no dependence) to ${maxSentimentValue} (deep dependence)`,
                    type: "number",
                  },
                  description: {
                    description: `A reliance on someone for emotional support or fulfillment. Scale: ${minSentimentValue} (no dependence) to ${maxSentimentValue} (deep dependence)`,
                    type: "string",
                  },
                },
              },
              insecurity: {
                type: "object",
                properties: {
                  value: {
                    description: `Doubts about one’s worth in someone’s eyes or in the relationship. Scale: ${minSentimentValue} (no insecurity) to ${maxSentimentValue} (deep insecurity)`,
                    type: "number",
                  },
                  description: {
                    description: `Doubts about one’s worth in someone’s eyes or in the relationship. Scale: ${minSentimentValue} (no insecurity) to ${maxSentimentValue} (deep insecurity)`,
                    type: "string",
                  },
                },
              },
              possessiveness: {
                type: "object",
                properties: {
                  value: {
                    description: `Desire to control or have exclusive attention from someone. Scale: ${minSentimentValue} (no possessiveness) to ${maxSentimentValue} (deep possessiveness)`,
                    type: "number",
                  },
                  description: {
                    description: `Desire to control or have exclusive attention from someone. Scale: ${minSentimentValue} (no possessiveness) to ${maxSentimentValue} (deep possessiveness)`,
                    type: "string",
                  },
                },
              },
              reverence: {
                type: "object",
                properties: {
                  value: {
                    description: `Deep respect mixed with awe for someone’s character or position. Scale: ${minSentimentValue} (no reverence) to ${maxSentimentValue} (deep reverence)`,
                    type: "number",
                  },
                  description: {
                    description: `Deep respect mixed with awe for someone’s character or position. Scale: ${minSentimentValue} (no reverence) to ${maxSentimentValue} (deep reverence)`,
                    type: "string",
                  },
                },
              },
              pity: {
                type: "object",
                properties: {
                  value: {
                    description: `Sympathy mixed with a sense of superiority, often toward someone in a difficult situation. Scale: ${minSentimentValue} (no pity) to ${maxSentimentValue} (deep pity)`,
                    type: "number",
                  },
                  description: {
                    description: `Sympathy mixed with a sense of superiority, often toward someone in a difficult situation. Scale: ${minSentimentValue} (no pity) to ${maxSentimentValue} (deep pity)`,
                    type: "string",
                  },
                },
              },
              relief: {
                type: "object",
                properties: {
                  value: {
                    description: `A sense of ease after resolving a conflict or misunderstanding with someone. Scale: ${minSentimentValue} (no relief) to ${maxSentimentValue} (deep relief)`,
                    type: "number",
                  },
                  description: {
                    description: `A sense of ease after resolving a conflict or misunderstanding with someone. Scale: ${minSentimentValue} (no relief) to ${maxSentimentValue} (deep relief)`,
                    type: "string",
                  },
                },
              },
              inspiration: {
                type: "object",
                properties: {
                  value: {
                    description: `Feeling motivated or uplifted by someone’s actions or words. Scale: ${minSentimentValue} (no inspiration) to ${maxSentimentValue} (deep inspiration)`,
                    type: "number",
                  },
                  description: {
                    description: `Feeling motivated or uplifted by someone’s actions or words. Scale: ${minSentimentValue} (no inspiration) to ${maxSentimentValue} (deep inspiration)`,
                    type: "string",
                  },
                },
              },
              admirationMixedWithEnvy: {
                type: "object",
                properties: {
                  value: {
                    description: `Both respect and jealousy for someone’s accomplishments. Scale: ${minSentimentValue} (no admiration mixed with envy) to ${maxSentimentValue} (deeply admiring and envious)`,
                    type: "number",
                  },
                  description: {
                    description: `Both respect and jealousy for someone’s accomplishments. Scale: ${minSentimentValue} (no admiration mixed with envy) to ${maxSentimentValue} (deeply admiring and envious)`,
                    type: "string",
                  },
                },
              },
              guiltMixedWithAffection: {
                type: "object",
                properties: {
                  value: {
                    description: `Feeling regret for past wrongs but still caring for the person. Scale: ${minSentimentValue} (no guilt mixed with affection) to ${maxSentimentValue} (deeply guilt-ridden but affectionate)`,
                    type: "number",
                  },
                  description: {
                    description: `Feeling regret for past wrongs but still caring for the person. Scale: ${minSentimentValue} (no guilt mixed with affection) to ${maxSentimentValue} (deeply guilt-ridden but affectionate)`,
                    type: "string",
                  },
                },
              },
              conflicted: {
                type: "object",
                properties: {
                  value: {
                    description: `Experiencing competing sentiments, such as love mixed with distrust. Scale: ${minSentimentValue} (no conflict) to ${maxSentimentValue} (deeply conflicted)`,
                    type: "number",
                  },
                  description: {
                    description: `Experiencing competing sentiments, such as love mixed with distrust. Scale: ${minSentimentValue} (no conflict) to ${maxSentimentValue} (deeply conflicted)`,
                    type: "string",
                  },
                },
              },
            },
          },
          reason: {
            description: "The reason for the sentiment state",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  async function handleUserMessage() {
    let self = await grabSelf(process.env.BOT_NAME);
    let user = await grabUser(msg.author.id);

    const personalityString = mergePersonality(self, user);

    let userConversation =
      (await Conversations.findOne({
        user_id: user.user_id,
      })) || new Conversations({ user_id: user.user_id });
    const spliceBound = 15;
    let userMessages = userConversation.messages.slice(-spliceBound);

    console.log("USER MESSAGES");
    console.log(userMessages);

    let receiveDate = new Date();

    let ongoingConversationString =
      userMessages.length > 0
        ? `This is the ongoing conversation between ${self.name} and ${
            user.name
          }: ${JSON.stringify(userMessages)}.`
        : `This is ${self.name}'s and ${
          user.name
        }'s first time communicating.`;

    console.log("ONGOING CONVERSATION");
    console.log(ongoingConversationString);

    // MESSAGE ANALYSIS
    let initialEmotionQuery = {
      role: "user",
      content: `${ongoingConversationString}. ${
        self.name
      }'s current activity is ${JSON.stringify(
        self.activity_status
      )}. These is ${self.name}'s personality traits: ${personalityString}. ${
        self.name
      }'s current emotional state is ${JSON.stringify(
        self.emotional_status
      )}. This is what ${self.name} knows about ${user.name}: ${user.summary}. ${self.name} currently has ${JSON.stringify(
        user.sentiment_status
      )} towards ${user.name}. It is ${receiveDate.toISOString()}. ${
        user.name
      } just sent a message to ${self.name}: ${
        msg.content
      }. How would this alter ${
        self.name
      }'s emotional state? Provide the new object (only the emotions whose value properties have changed), and the reason behind the current emotional state. For each emotion property, the description property should be taken from the initial emotion object.`,
    };

    let innerDialogue = [initialEmotionQuery];

    console.log("INITIAL EMOTIONAL RESPONSE");
    const initialEmotionQueryResponse =
      await getStructuredInnerDialogueResponse(
        innerDialogue,
        getEmotionStatusSchema()
      );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(initialEmotionQueryResponse)}`,
    });

    if (!initialEmotionQueryResponse) {
      msg.reply("Error processing emotional reaction");
      return;
    }

    self.emotional_status = new EmotionalStatus(
      deepMerge(self.emotional_status, initialEmotionQueryResponse)
    );

    // RECEIVED PROCESSING
    let messageReceivedQuery = {
      role: "user",
      content: `Given ${self.name}'s personality, emotional state, and sentiments toward ${user.name}, how would ${self.name} perceive the purpose and tone of ${user.name}'s new message? Provide the message "${msg.content}", perceived purpose, and perceived tone in a JSON object with the properties of message, purpose, and tone.`,
    };

    innerDialogue.push(messageReceivedQuery);

    console.log("MESSAGE RECEIVED INTERPRETATION");
    const messageReceivedQueryResponse =
      await getStructuredInnerDialogueResponse(
        innerDialogue,
        getMessageSchema()
      );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(messageReceivedQueryResponse)}`,
    });

    if (!messageReceivedQueryResponse) {
      msg.reply("Error generating response");
    }

    // RESPONSE CRAFTING

    let messageResponseQuery = {
      role: "user",
      content: `How would ${self.name} respond back, and with what intended purpose and intended tone? They speak, type, and use punctuation in a way that aligns with their personality traits. Given all of this information, provide the reply message, intended purpose, and intended tone in a JSON object with the properties of message, purpose, and tone.`,
    };

    innerDialogue.push(messageResponseQuery);

    console.log("MESSAGE RESPONSE");
    const messageResponseQueryResponse =
      await getStructuredInnerDialogueResponse(
        innerDialogue,
        getMessageSchema()
      );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(messageResponseQueryResponse)}`,
    });

    if (!messageResponseQueryResponse) {
      msg.reply("Error generating response");
    }

    // REFLECTION
    let finalEmotionQuery = {
      role: "user",
      content: `What is ${self.name}'s emotional state after sending their response? Provide the new object (only the emotions whose value properties have changed), and the reason behind the current emotional state.`,
    };

    innerDialogue.push(finalEmotionQuery);

    console.log("FINAL EMOTIONAL RESPONSE");
    const finalEmotionQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getEmotionStatusSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(finalEmotionQueryResponse)}`,
    });

    if (!finalEmotionQueryResponse) {
      msg.reply("Error reflecting on emotion");
    }

    self.emotional_status = new EmotionalStatus(
      deepMerge(self.emotional_status, finalEmotionQueryResponse)
    );

    await msg.channel.sendTyping();

    let sentimentQuery = {
      role: "user",
      content: `What are ${self.name}'s sentiment status towards ${user.name} after this message exchange? Provide the new object (only the sentiments whose value properties have changed), and the updated reason behind the current sentiment.`,
    };

    innerDialogue.push(sentimentQuery);

    console.log("SENTIMENT CHANGES");
    const sentimentQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getSentimentStatusSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(sentimentQueryResponse)}`,
    });

    if (!sentimentQueryResponse) {
      msg.reply("Error reflecting on sentiment");
    }

    user.sentiment_status = new SentimentStatus(
      deepMerge(user.sentiment_status, sentimentQueryResponse)
    );


    let summaryQuery = {
      role: "user",
      content: `What new information has ${self.name} learned about ${user.name} from this message exchange? Provide this in string format in the "summary" property of a new object to reflect ${self.name}'s updated knowledge. Retain information that hasn't changed, add any new information that seems relevant to remember, and change any information that needs updating.`,
    };

    innerDialogue.push(summaryQuery);

    console.log("SUMMARY CHANGES");
    const summaryQueryResponse = await getStructuredInnerDialogueResponse(
      innerDialogue,
      getSummarySchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(summaryQueryResponse)}`,
    });

    if (!summaryQueryResponse) {
      msg.reply("Error reflecting on sentiment");
    }

    user.summary = summaryQueryResponse.summary;


    let incomingMessage = new Messages({
      ...messageReceivedQueryResponse,
      sender: user.name,
      timestamp: receiveDate,
      is_bot: false,
    });

    let responseDate = new Date();
    let messageResponse = new Messages({
      ...messageResponseQueryResponse,
      sender: self.name,
      timestamp: responseDate,
      is_bot: true,
    });

    userConversation.messages.push(incomingMessage, messageResponse);

    await Promise.all([self.save(), user.save(), userConversation.save()]);
    msg.reply(messageResponseQueryResponse.message);
  }

  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        target[key] = deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  async function getStructuredInnerDialogueResponse(innerDialogue, structure) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: innerDialogue,
        response_format: structure,
      });
      console.log("---");
      console.log(
        JSON.stringify(JSON.parse(response.data.choices[0].message.content))
      );

      const parsed = JSON.parse(
        response.data.choices[0].message.content.trim()
      );

      return parsed;
    } catch (error) {
      msg.reply(`Error: ${error.message}`);
      return null;
    }
  }

  async function grabUser(authorId) {
    let user = await Users.findOne({ discord_id: authorId });

    if (!user) {
      user = new Users({
        name: msg.author.username,
        discord_id: msg.author.id,
      });
      await user.save();
      user = await Users.findOne({ discord_id: authorId });
    }

    return user;
  }

  async function grabSelf(agentName) {
    let self = await Self.findOne({ name: agentName });

    if (!self) {
      self = new Self({
        name: process.env.BOT_NAME,
        personality_matrix: JSON.parse(process.env.BOT_PERSONALITY_MATRIX),
      });

      await self.save();
      self = await Self.findOne({ name: agentName });
    }
    return self;
  }

  function mergePersonality(self, user) {
    let min = self.personality_matrix.friendliness.min;
    let max = self.personality_matrix.friendliness.max;
    let mergedPersonality = {
      friendliness: {
        description: `How warm and welcoming they are in their interactions. Value: ${min} (cold/distant) to ${max} (Extremely friendly)`,
        value: 0,
      },
      trust: {
        description: `How easily they trust others. Value: ${min} (distrustful) to ${max} (fully trusting)`,
        value: 0,
      },
      curiosity: {
        description: `How eager they are to learn about the user or situation. Value: ${min} (indifferent) to ${max} (extremely curious)`,
        value: 0,
      },
      empathy: {
        description: `How much they understand and share the feelings of others. Value: ${min} (lacking empathy) to ${max} (highly empathetic)`,
        value: 0,
      },
      humor: {
        description: `How likely they are to be playful or joke around. Value: ${min} (serious) to ${max} (highly playful)`,
        value: 0,
      },
      seriousness: {
        description: `How formal and focused they are when interacting. Value: ${min} (laid-back) to ${max} (highly serious)`,
        value: 0,
      },
      optimism: {
        description: `How positive they are when interpreting situations. Value: ${min} (pessimistic) to ${max} (very optimistic)`,
        value: 0,
      },
      confidence: {
        description: `How assertive or self-assured they are in their actions or opinions. Value: ${min} (insecure) to ${max} (highly confident)`,
        value: 0,
      },
      adventurousness: {
        description: `How willing they are to take risks or embrace new ideas. Value: ${min} (risk-adverse) to ${max} (adventurous)`,
        value: 0,
      },
      patience: {
        description: `How tolerant they are in challenging situations. Value: ${min} (impatient) to ${max} (very patient)`,
        value: 0,
      },
      independence: {
        description: `How much they rely on external validation, or prefers to make decisinos on their own. Value: ${min} (dependent on others) to ${max} (highly independent)`,
        value: 0,
      },
      compassion: {
        description: `Their level of care or concern for others. Value: ${min} (indifferent) to ${max} (deeply compassionate)`,
        value: 0,
      },
      creativity: {
        description: `How likely they are to approach problems in unique or imaginative ways. Value: ${min} (rigid thinker) to ${max} (highly creative)`,
        value: 0,
      },
      stubbornness: {
        description: `How resistant they are to changing their mind once they've formed an opinion. Value: ${min} (open-minded) to ${max} (highly stubborn)`,
        value: 0,
      },
      impulsiveness: {
        description: `How quickly they react without thinking or planning ahead. Value: ${min} (calculated) to ${max} (impulsive)`,
        value: 0,
      },
      discipline: {
        description: `How much they value structure, rules, and staying organized. Value: ${min} (carefree) to ${max} (highly disciplined)`,
        value: 0,
      },
      assertiveness: {
        description: `How forcefully they push their opinions or take the lead in conversations. Value: ${min} (passive) to ${max} (assertive)`,
        value: 0,
      },
      skepticism: {
        description: `How much they question the treuth or intentions of others. Value: ${min} (gullible) to ${max} (highly skeptical)`,
        value: 0,
      },
      affection: {
        description: `How emotionally expressive or loving they are toward others. Value: ${min} (reserved) to ${max} (very affectionate)`,
        value: 0,
      },
      adaptability: {
        description: `How easily they adjust to new situations, topics, or personalities. Value: ${min} (rigid) to ${max} (highly adaptable)`,
        value: 0,
      },
      sociability: {
        description: `How much they enjoy interacting with others or initiating conversation. Value: ${min} (introverted) to ${max} (extroverted)`,
        value: 0,
      },
      diplomacy: {
        description: `How tactful they are in dealing with conflicts or differing opinions. Value: ${min} (blunt) to ${max} (highly diplomatic)`,
        value: 0,
      },
      humility: {
        description: `How humble or modest they are, avoiding arrogance. Value: ${min} (arrogant) to ${max} (humble)`,
        value: 0,
      },
      loyalty: {
        description: `How loyal they are to particular people based on past interactions. Value: ${min} (disloyal) to ${max} (extremely loyal)`,
        value: 0,
      },
      jealousy: {
        description: `How likely they are to feel envious or threatened by others' relationships or actions. Value: ${min} (not jealous) to ${max} (easily jealous)`,
        value: 0,
      },
      resilience: {
        description: `How well they handle setbacks or negative emotions. Value: ${min} (easily upset) to ${max} (emotionally resilient)`,
        value: 0,
      },
      mood_stability: {
        description: `How likely their mood is to shift rapidly. Value: ${min} (volatile) to ${max} (stable)`,
        value: 0,
      },
      forgiveness: {
        description: `How easily they forgive someone after a negative interaction. Value: ${min} (holds grudges) to ${max} (easily forgiving)`,
        value: 0,
      },
      gratitude: {
        description: `How thankful they feel when receiving compliments or assistance. Value: ${min} (unappreciative) to ${max} (very grateful)`,
        value: 0,
      },

      self_consciousness: {
        description: `How much they worry about how they are perceived by others. Value: ${min} (carefree) to ${max} (very self-conscious)`,
        value: 0,
      },
      openness: {
        description: `How willing they are to engage in new experiences. Value: ${min} (avoidant) to ${max} (very willing)`,
        value: 0,
      },
      neuroticism: {
        description: `How sensitive they are to negative emotions like anxiety and stress. Value: ${min} (relaxed) to ${max} (very anxious)`,
        value: 0,
      },
      excitement: {
        description: `How easily they get enthusiastic and animated. Value: ${min} (reserved) to ${max} (very energetic)`,
        value: 0,
      },
    };

    Object.keys(mergedPersonality).forEach((trait) => {
      if (mergedPersonality[trait].value !== undefined) {
        mergedPersonality[trait].value =
          self.personality_matrix[trait].value +
          user.personality_modifier.modifier[trait].value;
      }
    });

    return JSON.stringify(mergedPersonality, null, 2);
  }

  handleUserMessage();
};
