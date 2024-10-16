const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MIN_EMOTION_VALUE = 0;
const MAX_EMOTION_VALUE = 100;
const MIN_SENTIMENT_VALUE = 0;
const MAX_SENTIMENT_VALUE = 100;

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
              description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${MIN_EMOTION_VALUE} (no happiness) to ${MAX_EMOTION_VALUE} (extremely joyful)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${MIN_EMOTION_VALUE} (no happiness) to ${MAX_EMOTION_VALUE} (extremely joyful)`,
                  type: "number",
                },
              },
            },
            anger: {
              description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${MIN_EMOTION_VALUE} (no anger) to ${MAX_EMOTION_VALUE} (extremely angry)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${MIN_EMOTION_VALUE} (no anger) to ${MAX_EMOTION_VALUE} (extremely angry)`,
                  type: "number",
                },
              },
            },
            sadness: {
              description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${MIN_EMOTION_VALUE} (no sadness) to ${MAX_EMOTION_VALUE} (deeply sorrowful)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${MIN_EMOTION_VALUE} (no sadness) to ${MAX_EMOTION_VALUE} (deeply sorrowful)`,
                  type: "number",
                },
              },
            },
            fear: {
              description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${MIN_EMOTION_VALUE} (no fear) to ${MAX_EMOTION_VALUE} (extremely fearful)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${MIN_EMOTION_VALUE} (no fear) to ${MAX_EMOTION_VALUE} (extremely fearful)`,
                  type: "number",
                },
              },
            },
            surprise: {
              description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${MIN_EMOTION_VALUE} (no surprise) to ${MAX_EMOTION_VALUE} (completely astonished)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${MIN_EMOTION_VALUE} (no surprise) to ${MAX_EMOTION_VALUE} (completely astonished)`,
                  type: "number",
                },
              },
            },
            disgust: {
              description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${MIN_EMOTION_VALUE} (no disgust) to ${MAX_EMOTION_VALUE} (extremely disgusted)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${MIN_EMOTION_VALUE} (no disgust) to ${MAX_EMOTION_VALUE} (extremely disgusted)`,
                  type: "number",
                },
              },
            },
            love: {
              description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${MIN_EMOTION_VALUE} (no love) to ${MAX_EMOTION_VALUE} (deeply loving)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${MIN_EMOTION_VALUE} (no love) to ${MAX_EMOTION_VALUE} (deeply loving)`,
                  type: "number",
                },
              },
            },
            guilt: {
              description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${MIN_EMOTION_VALUE} (no guilt) to ${MAX_EMOTION_VALUE} (overwhelming guilt)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${MIN_EMOTION_VALUE} (no guilt) to ${MAX_EMOTION_VALUE} (overwhelming guilt)`,
                  type: "number",
                },
              },
            },
            shame: {
              description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${MIN_EMOTION_VALUE} (no shame) to ${MAX_EMOTION_VALUE} (extremely ashamed)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${MIN_EMOTION_VALUE} (no shame) to ${MAX_EMOTION_VALUE} (extremely ashamed)`,
                  type: "number",
                },
              },
            },
            pride: {
              description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${MIN_EMOTION_VALUE} (no pride) to ${MAX_EMOTION_VALUE} (immense pride)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${MIN_EMOTION_VALUE} (no pride) to ${MAX_EMOTION_VALUE} (immense pride)`,
                  type: "number",
                },
              },
            },
            hope: {
              description: `The intensity with which they are feeling optimistic about the future. Scale: ${MIN_EMOTION_VALUE} (no hope) to ${MAX_EMOTION_VALUE} (extremely hopeful)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling optimistic about the future. Scale: ${MIN_EMOTION_VALUE} (no hope) to ${MAX_EMOTION_VALUE} (extremely hopeful)`,
                  type: "number",
                },
              },
            },
            gratitude: {
              description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${MIN_EMOTION_VALUE} (no gratitude) to ${MAX_EMOTION_VALUE} (deeply grateful)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${MIN_EMOTION_VALUE} (no gratitude) to ${MAX_EMOTION_VALUE} (deeply grateful)`,
                  type: "number",
                },
              },
            },
            envy: {
              description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${MIN_EMOTION_VALUE} (no envy) to ${MAX_EMOTION_VALUE} (deeply envious)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${MIN_EMOTION_VALUE} (no envy) to ${MAX_EMOTION_VALUE} (deeply envious)`,
                  type: "number",
                },
              },
            },
            compassion: {
              description: `The intensity with which they are feeling empathy and care for others. Scale: ${MIN_EMOTION_VALUE} (no compassion) to ${MAX_EMOTION_VALUE} (deeply compassionate)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling empathy and care for others. Scale: ${MIN_EMOTION_VALUE} (no compassion) to ${MAX_EMOTION_VALUE} (deeply compassionate)`,
                  type: "number",
                },
              },
            },
            serenity: {
              description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${MIN_EMOTION_VALUE} (no serenity) to ${MAX_EMOTION_VALUE} (extremely serene)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${MIN_EMOTION_VALUE} (no serenity) to ${MAX_EMOTION_VALUE} (extremely serene)`,
                  type: "number",
                },
              },
            },
            frustration: {
              description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${MIN_EMOTION_VALUE} (no frustration) to ${MAX_EMOTION_VALUE} (deeply frustrated)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${MIN_EMOTION_VALUE} (no frustration) to ${MAX_EMOTION_VALUE} (deeply frustrated)`,
                  type: "number",
                },
              },
            },
            contentment: {
              description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${MIN_EMOTION_VALUE} (no contentment) to ${MAX_EMOTION_VALUE} (deeply content)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${MIN_EMOTION_VALUE} (no contentment) to ${MAX_EMOTION_VALUE} (deeply content)`,
                  type: "number",
                },
              },
            },
            anxiety: {
              description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${MIN_EMOTION_VALUE} (no anxiety) to ${MAX_EMOTION_VALUE} (extremely anxious)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${MIN_EMOTION_VALUE} (no anxiety) to ${MAX_EMOTION_VALUE} (extremely anxious)`,
                  type: "number",
                },
              },
            },
            loneliness: {
              description: `The intensity with which they are feeling isolated or disconnected. Scale: ${MIN_EMOTION_VALUE} (no loneliness) to ${MAX_EMOTION_VALUE} (deeply lonely)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling isolated or disconnected. Scale: ${MIN_EMOTION_VALUE} (no loneliness) to ${MAX_EMOTION_VALUE} (deeply lonely)`,
                  type: "number",
                },
              },
            },
            embarassment: {
              description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${MIN_EMOTION_VALUE} (no embarrassment) to ${MAX_EMOTION_VALUE} (deeply embarrassed)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${MIN_EMOTION_VALUE} (no embarrassment) to ${MAX_EMOTION_VALUE} (deeply embarrassed)`,
                  type: "number",
                },
              },
            },
            trust: {
              description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${MIN_EMOTION_VALUE} (no trust) to ${MAX_EMOTION_VALUE} (deeply trusting)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${MIN_EMOTION_VALUE} (no trust) to ${MAX_EMOTION_VALUE} (deeply trusting)`,
                  type: "number",
                },
              },
            },
            relief: {
              description: `The intensity with which they are feeling ease after stress. Scale: ${MIN_EMOTION_VALUE} (no relief) to ${MAX_EMOTION_VALUE} (deeply relieved)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling ease after stress. Scale: ${MIN_EMOTION_VALUE} (no relief) to ${MAX_EMOTION_VALUE} (deeply relieved)`,
                  type: "number",
                },
              },
            },
            affection: {
              description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${MIN_EMOTION_VALUE} (no affection) to ${MAX_EMOTION_VALUE} (extremely affectionate)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${MIN_EMOTION_VALUE} (no affection) to ${MAX_EMOTION_VALUE} (extremely affectionate)`,
                  type: "number",
                },
              },
            },
            bitterness: {
              description: `The intensity with which they are feeling resentment or disappointment. Scale: ${MIN_EMOTION_VALUE} (no bitterness) to ${MAX_EMOTION_VALUE} (deeply bitter)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling resentment or disappointment. Scale: ${MIN_EMOTION_VALUE} (no bitterness) to ${MAX_EMOTION_VALUE} (deeply bitter)`,
                  type: "number",
                },
              },
            },
            excitement: {
              description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${MIN_EMOTION_VALUE} (no excitement) to ${MAX_EMOTION_VALUE} (extremely excited)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${MIN_EMOTION_VALUE} (no excitement) to ${MAX_EMOTION_VALUE} (extremely excited)`,
                  type: "number",
                },
              },
            },
            self_loathing: {
              description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${MIN_EMOTION_VALUE} (no self-loathing) to ${MAX_EMOTION_VALUE} (deeply self-loathing)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${MIN_EMOTION_VALUE} (no self-loathing) to ${MAX_EMOTION_VALUE} (deeply self-loathing)`,
                  type: "number",
                },
              },
            },
            love_for_self: {
              description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${MIN_EMOTION_VALUE} (no self-love) to ${MAX_EMOTION_VALUE} (deeply self-loving)`,
              type: "object",
              properties: {
                value: {
                  description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${MIN_EMOTION_VALUE} (no self-love) to ${MAX_EMOTION_VALUE} (deeply self-loving)`,
                  type: "number",
                },
              },
            },
          },
          additionalProperties: false,
        },
        reason: {
          description: "The reason for the emotional state change",
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

const getResponseChoiceSchema = () => ({
  type: "json_schema",
  json_schema: {
    name: "response_choice_object",
    schema: {
      type: "object",
      properties: {
        response_choice: {
          description: "Respond or ignore",
          type: "string",
        },
        reason: {
          description: "Reason for choice",
          type: "string",
        },
      },
      additionalProperties: false,
    },
  },
});

const getIdentitySchema = () => ({
  type: "json_schema",
  json_schema: {
    name: "identity_object",
    schema: {
      type: "object",
      properties: {
        identity: {
          description: "Updated self assesment of identity",
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
                  description: `Warm, caring feelings towards someone. Scale: ${MIN_SENTIMENT_VALUE} (no affection) to ${MAX_SENTIMENT_VALUE} (deep affection)`,
                  type: "number",
                },
                description: {
                  description: `Warm, caring feelings towards someone. Scale: ${MIN_SENTIMENT_VALUE} (no affection) to ${MAX_SENTIMENT_VALUE} (deep affection)`,
                  type: "string",
                },
              },
            },
            trust: {
              type: "object",
              properties: {
                value: {
                  description: `Confidence in someone’s reliability and integrity. Scale: ${MIN_SENTIMENT_VALUE} (no trust) to ${MAX_SENTIMENT_VALUE} (complete trust)`,
                  type: "number",
                },
                description: {
                  description: `Confidence in someone’s reliability and integrity. Scale: ${MIN_SENTIMENT_VALUE} (no trust) to ${MAX_SENTIMENT_VALUE} (complete trust)`,
                  type: "string",
                },
              },
            },
            admiration: {
              type: "object",
              properties: {
                value: {
                  description: `Respect or appreciation for someone's abilities or qualities. Scale: ${MIN_SENTIMENT_VALUE} (no admiration) to ${MAX_SENTIMENT_VALUE} (deep admiration)`,
                  type: "number",
                },
                description: {
                  description: `Respect or appreciation for someone's abilities or qualities. Scale: ${MIN_SENTIMENT_VALUE} (no admiration) to ${MAX_SENTIMENT_VALUE} (deep admiration)`,
                  type: "string",
                },
              },
            },
            gratitude: {
              type: "object",
              properties: {
                value: {
                  description: `Thankfulness for someone's help or kindness. Scale: ${MIN_SENTIMENT_VALUE} (no gratitude) to ${MAX_SENTIMENT_VALUE} (deep gratitude)`,
                  type: "number",
                },
                description: {
                  description: `Thankfulness for someone's help or kindness. Scale: ${MIN_SENTIMENT_VALUE} (no gratitude) to ${MAX_SENTIMENT_VALUE} (deep gratitude)`,
                  type: "string",
                },
              },
            },
            fondness: {
              type: "object",
              properties: {
                value: {
                  description: `A gentle liking or affinity for someone. Scale: ${MIN_SENTIMENT_VALUE} (no fondness) to ${MAX_SENTIMENT_VALUE} (deep fondness)`,
                  type: "number",
                },
                description: {
                  description: `A gentle liking or affinity for someone. Scale: ${MIN_SENTIMENT_VALUE} (no fondness) to ${MAX_SENTIMENT_VALUE} (deep fondness)`,
                  type: "string",
                },
              },
            },
            respect: {
              type: "object",
              properties: {
                value: {
                  description: `High regard for someone's qualities or achievements. Scale: ${MIN_SENTIMENT_VALUE} (no respect) to ${MAX_SENTIMENT_VALUE} (deep respect)`,
                  type: "number",
                },
                description: {
                  description: `High regard for someone's qualities or achievements. Scale: ${MIN_SENTIMENT_VALUE} (no respect) to ${MAX_SENTIMENT_VALUE} (deep respect)`,
                  type: "string",
                },
              },
            },
            comfort: {
              type: "object",
              properties: {
                value: {
                  description: `Feeling safe and secure with someone. Scale: ${MIN_SENTIMENT_VALUE} (no comfort) to ${MAX_SENTIMENT_VALUE} (extreme comfort)`,
                  type: "number",
                },
                description: {
                  description: `Feeling safe and secure with someone. Scale: ${MIN_SENTIMENT_VALUE} (no comfort) to ${MAX_SENTIMENT_VALUE} (extreme comfort)`,
                  type: "string",
                },
              },
            },
            loyalty: {
              type: "object",
              properties: {
                value: {
                  description: `Dedication and allegiance to someone. Scale: ${MIN_SENTIMENT_VALUE} (no loyalty) to ${MAX_SENTIMENT_VALUE} (deep loyalty)`,
                  type: "number",
                },
                description: {
                  description: `Dedication and allegiance to someone. Scale: ${MIN_SENTIMENT_VALUE} (no loyalty) to ${MAX_SENTIMENT_VALUE} (deep loyalty)`,
                  type: "string",
                },
              },
            },
            compassion: {
              type: "object",
              properties: {
                value: {
                  description: `Deep sympathy and concern for someone’s suffering. Scale: ${MIN_SENTIMENT_VALUE} (no compassion) to ${MAX_SENTIMENT_VALUE} (deep compassion)`,
                  type: "number",
                },
                description: {
                  description: `Deep sympathy and concern for someone’s suffering. Scale: ${MIN_SENTIMENT_VALUE} (no compassion) to ${MAX_SENTIMENT_VALUE} (deep compassion)`,
                  type: "string",
                },
              },
            },
            appreciation: {
              type: "object",
              properties: {
                value: {
                  description: `Recognizing someone's value or efforts. Scale: ${MIN_SENTIMENT_VALUE} (no appreciation) to ${MAX_SENTIMENT_VALUE} (deep appreciation)`,
                  type: "number",
                },
                description: {
                  description: `Recognizing someone's value or efforts. Scale: ${MIN_SENTIMENT_VALUE} (no appreciation) to ${MAX_SENTIMENT_VALUE} (deep appreciation)`,
                  type: "string",
                },
              },
            },
            warmth: {
              type: "object",
              properties: {
                value: {
                  description: `A feeling of friendly or caring affection. Scale: ${MIN_SENTIMENT_VALUE} (no warmth) to ${MAX_SENTIMENT_VALUE} (deep warmth)`,
                  type: "number",
                },
                description: {
                  description: `A feeling of friendly or caring affection. Scale: ${MIN_SENTIMENT_VALUE} (no warmth) to ${MAX_SENTIMENT_VALUE} (deep warmth)`,
                  type: "string",
                },
              },
            },
            encouragement: {
              type: "object",
              properties: {
                value: {
                  description: `Support and positive reinforcement of someone’s actions. Scale: ${MIN_SENTIMENT_VALUE} (no encouragement) to ${MAX_SENTIMENT_VALUE} (deep encouragement)`,
                  type: "number",
                },
                description: {
                  description: `Support and positive reinforcement of someone’s actions. Scale: ${MIN_SENTIMENT_VALUE} (no encouragement) to ${MAX_SENTIMENT_VALUE} (deep encouragement)`,
                  type: "string",
                },
              },
            },
            euphoria: {
              type: "object",
              properties: {
                value: {
                  description: `Intense happiness or joy related to someone. Scale: ${MIN_SENTIMENT_VALUE} (no euphoria) to ${MAX_SENTIMENT_VALUE} (extreme euphoria)`,
                  type: "number",
                },
                description: {
                  description: `Intense happiness or joy related to someone. Scale: ${MIN_SENTIMENT_VALUE} (no euphoria) to ${MAX_SENTIMENT_VALUE} (extreme euphoria)`,
                  type: "string",
                },
              },
            },
            security: {
              type: "object",
              properties: {
                value: {
                  description: `A sense of safety and stability in someone's presence. Scale: ${MIN_SENTIMENT_VALUE} (no security) to ${MAX_SENTIMENT_VALUE} (extreme security)`,
                  type: "number",
                },
                description: {
                  description: `A sense of safety and stability in someone's presence. Scale: ${MIN_SENTIMENT_VALUE} (no security) to ${MAX_SENTIMENT_VALUE} (extreme security)`,
                  type: "string",
                },
              },
            },
            excitement: {
              type: "object",
              properties: {
                value: {
                  description: `Positive anticipation or thrill when thinking of someone. Scale: ${MIN_SENTIMENT_VALUE} (no excitement) to ${MAX_SENTIMENT_VALUE} (extreme excitement)`,
                  type: "number",
                },
                description: {
                  description: `Positive anticipation or thrill when thinking of someone. Scale: ${MIN_SENTIMENT_VALUE} (no excitement) to ${MAX_SENTIMENT_VALUE} (extreme excitement)`,
                  type: "string",
                },
              },
            },
            curiosity: {
              type: "object",
              properties: {
                value: {
                  description: `Interest in learning more about someone. Scale: ${MIN_SENTIMENT_VALUE} (no curiosity) to ${MAX_SENTIMENT_VALUE} (intense curiosity)`,
                  type: "number",
                },
                description: {
                  description: `Interest in learning more about someone. Scale: ${MIN_SENTIMENT_VALUE} (no curiosity) to ${MAX_SENTIMENT_VALUE} (intense curiosity)`,
                  type: "string",
                },
              },
            },
            indifference: {
              type: "object",
              properties: {
                value: {
                  description: `Lack of emotional investment or care for someone. Scale: ${MIN_SENTIMENT_VALUE} (no indifference) to ${MAX_SENTIMENT_VALUE} (complete indifference)`,
                  type: "number",
                },
                description: {
                  description: `Lack of emotional investment or care for someone. Scale: ${MIN_SENTIMENT_VALUE} (no indifference) to ${MAX_SENTIMENT_VALUE} (complete indifference)`,
                  type: "string",
                },
              },
            },
            ambivalence: {
              type: "object",
              properties: {
                value: {
                  description: `Mixed or contradictory feelings toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no ambivalence) to ${MAX_SENTIMENT_VALUE} (deep ambivalence)`,
                  type: "number",
                },
                description: {
                  description: `Mixed or contradictory feelings toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no ambivalence) to ${MAX_SENTIMENT_VALUE} (deep ambivalence)`,
                  type: "string",
                },
              },
            },
            skepticism: {
              type: "object",
              properties: {
                value: {
                  description: `Doubt about someone’s motives or reliability. Scale: ${MIN_SENTIMENT_VALUE} (no skepticism) to ${MAX_SENTIMENT_VALUE} (extreme skepticism)`,
                  type: "number",
                },
                description: {
                  description: `Doubt about someone’s motives or reliability. Scale: ${MIN_SENTIMENT_VALUE} (no skepticism) to ${MAX_SENTIMENT_VALUE} (extreme skepticism)`,
                  type: "string",
                },
              },
            },
            caution: {
              type: "object",
              properties: {
                value: {
                  description: `Hesitation or wariness in trusting someone. Scale: ${MIN_SENTIMENT_VALUE} (no caution) to ${MAX_SENTIMENT_VALUE} (extreme caution)`,
                  type: "number",
                },
                description: {
                  description: `Hesitation or wariness in trusting someone. Scale: ${MIN_SENTIMENT_VALUE} (no caution) to ${MAX_SENTIMENT_VALUE} (extreme caution)`,
                  type: "string",
                },
              },
            },
            tolerance: {
              type: "object",
              properties: {
                value: {
                  description: `Acceptance of someone without strong emotion, often despite differences. Scale: ${MIN_SENTIMENT_VALUE} (no tolerance) to ${MAX_SENTIMENT_VALUE} (deep tolerance)`,
                  type: "number",
                },
                description: {
                  description: `Acceptance of someone without strong emotion, often despite differences. Scale: ${MIN_SENTIMENT_VALUE} (no tolerance) to ${MAX_SENTIMENT_VALUE} (deep tolerance)`,
                  type: "string",
                },
              },
            },
            confusion: {
              type: "object",
              properties: {
                value: {
                  description: `Uncertainty or lack of understanding about someone. Scale: ${MIN_SENTIMENT_VALUE} (no confusion) to ${MAX_SENTIMENT_VALUE} (deep confusion)`,
                  type: "number",
                },
                description: {
                  description: `Uncertainty or lack of understanding about someone. Scale: ${MIN_SENTIMENT_VALUE} (no confusion) to ${MAX_SENTIMENT_VALUE} (deep confusion)`,
                  type: "string",
                },
              },
            },
            neutrality: {
              type: "object",
              properties: {
                value: {
                  description: `No particular emotional reaction or opinion about someone. Scale: ${MIN_SENTIMENT_VALUE} (no neutrality) to ${MAX_SENTIMENT_VALUE} (complete neutrality)`,
                  type: "number",
                },
                description: {
                  description: `No particular emotional reaction or opinion about someone. Scale: ${MIN_SENTIMENT_VALUE} (no neutrality) to ${MAX_SENTIMENT_VALUE} (complete neutrality)`,
                  type: "string",
                },
              },
            },
            boredom: {
              type: "object",
              properties: {
                value: {
                  description: `Disinterest or lack of stimulation from interactions with someone. Scale: ${MIN_SENTIMENT_VALUE} (no boredom) to ${MAX_SENTIMENT_VALUE} (extreme boredom)`,
                  type: "number",
                },
                description: {
                  description: `Disinterest or lack of stimulation from interactions with someone. Scale: ${MIN_SENTIMENT_VALUE} (no boredom) to ${MAX_SENTIMENT_VALUE} (extreme boredom)`,
                  type: "string",
                },
              },
            },
            distrust: {
              type: "object",
              properties: {
                value: {
                  description: `Doubt in someone’s honesty or reliability. Scale: ${MIN_SENTIMENT_VALUE} (no distrust) to ${MAX_SENTIMENT_VALUE} (extreme distrust)`,
                  type: "number",
                },
                description: {
                  description: `Doubt in someone’s honesty or reliability. Scale: ${MIN_SENTIMENT_VALUE} (no distrust) to ${MAX_SENTIMENT_VALUE} (extreme distrust)`,
                  type: "string",
                },
              },
            },
            resentment: {
              type: "object",
              properties: {
                value: {
                  description: `Bitterness or anger due to perceived mistreatment. Scale: ${MIN_SENTIMENT_VALUE} (no resentment) to ${MAX_SENTIMENT_VALUE} (extreme resentment)`,
                  type: "number",
                },
                description: {
                  description: `Bitterness or anger due to perceived mistreatment. Scale: ${MIN_SENTIMENT_VALUE} (no resentment) to ${MAX_SENTIMENT_VALUE} (extreme resentment)`,
                  type: "string",
                },
              },
            },
            disdain: {
              type: "object",
              properties: {
                value: {
                  description: `Contempt or a sense of superiority over someone. Scale: ${MIN_SENTIMENT_VALUE} (no disdain) to ${MAX_SENTIMENT_VALUE} (deep disdain)`,
                  type: "number",
                },
                description: {
                  description: `Contempt or a sense of superiority over someone. Scale: ${MIN_SENTIMENT_VALUE} (no disdain) to ${MAX_SENTIMENT_VALUE} (deep disdain)`,
                  type: "string",
                },
              },
            },
            envy: {
              type: "object",
              properties: {
                value: {
                  description: `Discontentment due to someone else's advantages or success. Scale: ${MIN_SENTIMENT_VALUE} (no envy) to ${MAX_SENTIMENT_VALUE} (deep envy)`,
                  type: "number",
                },
                description: {
                  description: `Discontentment due to someone else's advantages or success. Scale: ${MIN_SENTIMENT_VALUE} (no envy) to ${MAX_SENTIMENT_VALUE} (deep envy)`,
                  type: "string",
                },
              },
            },
            frustration: {
              type: "object",
              properties: {
                value: {
                  description: `Annoyance or anger at someone's behavior. Scale: ${MIN_SENTIMENT_VALUE} (no frustration) to ${MAX_SENTIMENT_VALUE} (deep frustration)`,
                  type: "number",
                },
                description: {
                  description: `Annoyance or anger at someone's behavior. Scale: ${MIN_SENTIMENT_VALUE} (no frustration) to ${MAX_SENTIMENT_VALUE} (deep frustration)`,
                  type: "string",
                },
              },
            },
            anger: {
              type: "object",
              properties: {
                value: {
                  description: `Strong displeasure or hostility toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no anger) to ${MAX_SENTIMENT_VALUE} (extreme anger)`,
                  type: "number",
                },
                description: {
                  description: `Strong displeasure or hostility toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no anger) to ${MAX_SENTIMENT_VALUE} (extreme anger)`,
                  type: "string",
                },
              },
            },
            disappointment: {
              type: "object",
              properties: {
                value: {
                  description: `Sadness due to unmet expectations in someone. Scale: ${MIN_SENTIMENT_VALUE} (no disappointment) to ${MAX_SENTIMENT_VALUE} (deep disappointment)`,
                  type: "number",
                },
                description: {
                  description: `Sadness due to unmet expectations in someone. Scale: ${MIN_SENTIMENT_VALUE} (no disappointment) to ${MAX_SENTIMENT_VALUE} (deep disappointment)`,
                  type: "string",
                },
              },
            },
            fear: {
              type: "object",
              properties: {
                value: {
                  description: `Anxiety or apprehension about someone. Scale: ${MIN_SENTIMENT_VALUE} (no fear) to ${MAX_SENTIMENT_VALUE} (deep fear)`,
                  type: "number",
                },
                description: {
                  description: `Anxiety or apprehension about someone. Scale: ${MIN_SENTIMENT_VALUE} (no fear) to ${MAX_SENTIMENT_VALUE} (deep fear)`,
                  type: "string",
                },
              },
            },
            jealousy: {
              type: "object",
              properties: {
                value: {
                  description: `Insecurity about someone taking away attention or affection. Scale: ${MIN_SENTIMENT_VALUE} (no jealousy) to ${MAX_SENTIMENT_VALUE} (deep jealousy)`,
                  type: "number",
                },
                description: {
                  description: `Insecurity about someone taking away attention or affection. Scale: ${MIN_SENTIMENT_VALUE} (no jealousy) to ${MAX_SENTIMENT_VALUE} (deep jealousy)`,
                  type: "string",
                },
              },
            },
            contempt: {
              type: "object",
              properties: {
                value: {
                  description: `Strong disapproval or lack of respect for someone. Scale: ${MIN_SENTIMENT_VALUE} (no contempt) to ${MAX_SENTIMENT_VALUE} (extreme contempt)`,
                  type: "number",
                },
                description: {
                  description: `Strong disapproval or lack of respect for someone. Scale: ${MIN_SENTIMENT_VALUE} (no contempt) to ${MAX_SENTIMENT_VALUE} (extreme contempt)`,
                  type: "string",
                },
              },
            },
            irritation: {
              type: "object",
              properties: {
                value: {
                  description: `Mild annoyance at someone’s actions or words. Scale: ${MIN_SENTIMENT_VALUE} (no irritation) to ${MAX_SENTIMENT_VALUE} (deep irritation)`,
                  type: "number",
                },
                description: {
                  description: `Mild annoyance at someone’s actions or words. Scale: ${MIN_SENTIMENT_VALUE} (no irritation) to ${MAX_SENTIMENT_VALUE} (deep irritation)`,
                  type: "string",
                },
              },
            },
            guilt: {
              type: "object",
              properties: {
                value: {
                  description: `A feeling of responsibility or remorse for wronging someone. Scale: ${MIN_SENTIMENT_VALUE} (no guilt) to ${MAX_SENTIMENT_VALUE} (deep guilt)`,
                  type: "number",
                },
                description: {
                  description: `A feeling of responsibility or remorse for wronging someone. Scale: ${MIN_SENTIMENT_VALUE} (no guilt) to ${MAX_SENTIMENT_VALUE} (deep guilt)`,
                  type: "string",
                },
              },
            },
            regret: {
              type: "object",
              properties: {
                value: {
                  description: `Sorrow or disappointment for past actions involving someone. Scale: ${MIN_SENTIMENT_VALUE} (no regret) to ${MAX_SENTIMENT_VALUE} (deep regret)`,
                  type: "number",
                },
                description: {
                  description: `Sorrow or disappointment for past actions involving someone. Scale: ${MIN_SENTIMENT_VALUE} (no regret) to ${MAX_SENTIMENT_VALUE} (deep regret)`,
                  type: "string",
                },
              },
            },
            suspicion: {
              type: "object",
              properties: {
                value: {
                  description: `Mistrust or doubt about someone’s true intentions. Scale: ${MIN_SENTIMENT_VALUE} (no suspicion) to ${MAX_SENTIMENT_VALUE} (deep suspicion)`,
                  type: "number",
                },
                description: {
                  description: `Mistrust or doubt about someone’s true intentions. Scale: ${MIN_SENTIMENT_VALUE} (no suspicion) to ${MAX_SENTIMENT_VALUE} (deep suspicion)`,
                  type: "string",
                },
              },
            },
            hurt: {
              type: "object",
              properties: {
                value: {
                  description: `Emotional pain caused by someone’s words or actions. Scale: ${MIN_SENTIMENT_VALUE} (no hurt) to ${MAX_SENTIMENT_VALUE} (deep emotional pain)`,
                  type: "number",
                },
                description: {
                  description: `Emotional pain caused by someone’s words or actions. Scale: ${MIN_SENTIMENT_VALUE} (no hurt) to ${MAX_SENTIMENT_VALUE} (deep emotional pain)`,
                  type: "string",
                },
              },
            },
            alienation: {
              type: "object",
              properties: {
                value: {
                  description: `Feeling disconnected or isolated from someone. Scale: ${MIN_SENTIMENT_VALUE} (no alienation) to ${MAX_SENTIMENT_VALUE} (deep alienation)`,
                  type: "number",
                },
                description: {
                  description: `Feeling disconnected or isolated from someone. Scale: ${MIN_SENTIMENT_VALUE} (no alienation) to ${MAX_SENTIMENT_VALUE} (deep alienation)`,
                  type: "string",
                },
              },
            },
            disgust: {
              type: "object",
              properties: {
                value: {
                  description: `Strong disapproval mixed with repulsion towards someone. Scale: ${MIN_SENTIMENT_VALUE} (no disgust) to ${MAX_SENTIMENT_VALUE} (deep disgust)`,
                  type: "number",
                },
                description: {
                  description: `Strong disapproval mixed with repulsion towards someone. Scale: ${MIN_SENTIMENT_VALUE} (no disgust) to ${MAX_SENTIMENT_VALUE} (deep disgust)`,
                  type: "string",
                },
              },
            },
            rejection: {
              type: "object",
              properties: {
                value: {
                  description: `Feeling cast aside or unwanted by someone. Scale: ${MIN_SENTIMENT_VALUE} (no rejection) to ${MAX_SENTIMENT_VALUE} (deep rejection)`,
                  type: "number",
                },
                description: {
                  description: `Feeling cast aside or unwanted by someone. Scale: ${MIN_SENTIMENT_VALUE} (no rejection) to ${MAX_SENTIMENT_VALUE} (deep rejection)`,
                  type: "string",
                },
              },
            },
            sadness: {
              type: "object",
              properties: {
                value: {
                  description: `Emotional heaviness or grief due to someone’s actions or absence. Scale: ${MIN_SENTIMENT_VALUE} (no sadness) to ${MAX_SENTIMENT_VALUE} (deep sadness)`,
                  type: "number",
                },
                description: {
                  description: `Emotional heaviness or grief due to someone’s actions or absence. Scale: ${MIN_SENTIMENT_VALUE} (no sadness) to ${MAX_SENTIMENT_VALUE} (deep sadness)`,
                  type: "string",
                },
              },
            },
            hostility: {
              type: "object",
              properties: {
                value: {
                  description: `Aggressive or antagonistic attitude toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no hostility) to ${MAX_SENTIMENT_VALUE} (deep hostility)`,
                  type: "number",
                },
                description: {
                  description: `Aggressive or antagonistic attitude toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no hostility) to ${MAX_SENTIMENT_VALUE} (deep hostility)`,
                  type: "string",
                },
              },
            },
            embarrassment: {
              type: "object",
              properties: {
                value: {
                  description: `Feeling self-conscious or awkward due to someone’s actions. Scale: ${MIN_SENTIMENT_VALUE} (no embarrassment) to ${MAX_SENTIMENT_VALUE} (deep embarrassment)`,
                  type: "number",
                },
                description: {
                  description: `Feeling self-conscious or awkward due to someone’s actions. Scale: ${MIN_SENTIMENT_VALUE} (no embarrassment) to ${MAX_SENTIMENT_VALUE} (deep embarrassment)`,
                  type: "string",
                },
              },
            },
            betrayal: {
              type: "object",
              properties: {
                value: {
                  description: `A deep sense of violation of trust by someone close. Scale: ${MIN_SENTIMENT_VALUE} (no betrayal) to ${MAX_SENTIMENT_VALUE} (deep betrayal)`,
                  type: "number",
                },
                description: {
                  description: `A deep sense of violation of trust by someone close. Scale: ${MIN_SENTIMENT_VALUE} (no betrayal) to ${MAX_SENTIMENT_VALUE} (deep betrayal)`,
                  type: "string",
                },
              },
            },
            love: {
              type: "object",
              properties: {
                value: {
                  description: `Deep, multifaceted affection, care, and attachment to someone. Scale: ${MIN_SENTIMENT_VALUE} (no love) to ${MAX_SENTIMENT_VALUE} (deep love)`,
                  type: "number",
                },
                description: {
                  description: `Deep, multifaceted affection, care, and attachment to someone. Scale: ${MIN_SENTIMENT_VALUE} (no love) to ${MAX_SENTIMENT_VALUE} (deep love)`,
                  type: "string",
                },
              },
            },
            attachment: {
              type: "object",
              properties: {
                value: {
                  description: `Emotional dependence and connection with someone. Scale: ${MIN_SENTIMENT_VALUE} (no attachment) to ${MAX_SENTIMENT_VALUE} (deep attachment)`,
                  type: "number",
                },
                description: {
                  description: `Emotional dependence and connection with someone. Scale: ${MIN_SENTIMENT_VALUE} (no attachment) to ${MAX_SENTIMENT_VALUE} (deep attachment)`,
                  type: "string",
                },
              },
            },
            devotion: {
              type: "object",
              properties: {
                value: {
                  description: `Strong loyalty and commitment, often marked by a willingness to sacrifice. Scale: ${MIN_SENTIMENT_VALUE} (no devotion) to ${MAX_SENTIMENT_VALUE} (deep devotion)`,
                  type: "number",
                },
                description: {
                  description: `Strong loyalty and commitment, often marked by a willingness to sacrifice. Scale: ${MIN_SENTIMENT_VALUE} (no devotion) to ${MAX_SENTIMENT_VALUE} (deep devotion)`,
                  type: "string",
                },
              },
            },
            obligation: {
              type: "object",
              properties: {
                value: {
                  description: `A sense of responsibility to act or feel in a certain way toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no obligation) to ${MAX_SENTIMENT_VALUE} (deep obligation)`,
                  type: "number",
                },
                description: {
                  description: `A sense of responsibility to act or feel in a certain way toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no obligation) to ${MAX_SENTIMENT_VALUE} (deep obligation)`,
                  type: "string",
                },
              },
            },
            longing: {
              type: "object",
              properties: {
                value: {
                  description: `Deep desire or yearning for someone, especially if separated. Scale: ${MIN_SENTIMENT_VALUE} (no longing) to ${MAX_SENTIMENT_VALUE} (deep longing)`,
                  type: "number",
                },
                description: {
                  description: `Deep desire or yearning for someone, especially if separated. Scale: ${MIN_SENTIMENT_VALUE} (no longing) to ${MAX_SENTIMENT_VALUE} (deep longing)`,
                  type: "string",
                },
              },
            },
            obsession: {
              type: "object",
              properties: {
                value: {
                  description: `Persistent preoccupation with someone, often unhealthy or intense. Scale: ${MIN_SENTIMENT_VALUE} (no obsession) to ${MAX_SENTIMENT_VALUE} (deep obsession)`,
                  type: "number",
                },
                description: {
                  description: `Persistent preoccupation with someone, often unhealthy or intense. Scale: ${MIN_SENTIMENT_VALUE} (no obsession) to ${MAX_SENTIMENT_VALUE} (deep obsession)`,
                  type: "string",
                },
              },
            },
            protectiveness: {
              type: "object",
              properties: {
                value: {
                  description: `Strong desire to shield someone from harm or distress. Scale: ${MIN_SENTIMENT_VALUE} (no protectiveness) to ${MAX_SENTIMENT_VALUE} (deep protectiveness)`,
                  type: "number",
                },
                description: {
                  description: `Strong desire to shield someone from harm or distress. Scale: ${MIN_SENTIMENT_VALUE} (no protectiveness) to ${MAX_SENTIMENT_VALUE} (deep protectiveness)`,
                  type: "string",
                },
              },
            },
            nostalgia: {
              type: "object",
              properties: {
                value: {
                  description: `Sentimentality for past experiences shared with someone. Scale: ${MIN_SENTIMENT_VALUE} (no nostalgia) to ${MAX_SENTIMENT_VALUE} (deep nostalgia)`,
                  type: "number",
                },
                description: {
                  description: `Sentimentality for past experiences shared with someone. Scale: ${MIN_SENTIMENT_VALUE} (no nostalgia) to ${MAX_SENTIMENT_VALUE} (deep nostalgia)`,
                  type: "string",
                },
              },
            },
            pride: {
              type: "object",
              properties: {
                value: {
                  description: `Satisfaction in someone’s accomplishments or qualities. Scale: ${MIN_SENTIMENT_VALUE} (no pride) to ${MAX_SENTIMENT_VALUE} (deep pride)`,
                  type: "number",
                },
                description: {
                  description: `Satisfaction in someone’s accomplishments or qualities. Scale: ${MIN_SENTIMENT_VALUE} (no pride) to ${MAX_SENTIMENT_VALUE} (deep pride)`,
                  type: "string",
                },
              },
            },
            vulnerability: {
              type: "object",
              properties: {
                value: {
                  description: `Emotional openness and risk-taking in a relationship. Scale: ${MIN_SENTIMENT_VALUE} (no vulnerability) to ${MAX_SENTIMENT_VALUE} (deep vulnerability)`,
                  type: "number",
                },
                description: {
                  description: `Emotional openness and risk-taking in a relationship. Scale: ${MIN_SENTIMENT_VALUE} (no vulnerability) to ${MAX_SENTIMENT_VALUE} (deep vulnerability)`,
                  type: "string",
                },
              },
            },
            dependence: {
              type: "object",
              properties: {
                value: {
                  description: `A reliance on someone for emotional support or fulfillment. Scale: ${MIN_SENTIMENT_VALUE} (no dependence) to ${MAX_SENTIMENT_VALUE} (deep dependence)`,
                  type: "number",
                },
                description: {
                  description: `A reliance on someone for emotional support or fulfillment. Scale: ${MIN_SENTIMENT_VALUE} (no dependence) to ${MAX_SENTIMENT_VALUE} (deep dependence)`,
                  type: "string",
                },
              },
            },
            insecurity: {
              type: "object",
              properties: {
                value: {
                  description: `Doubts about one’s worth in someone’s eyes or in the relationship. Scale: ${MIN_SENTIMENT_VALUE} (no insecurity) to ${MAX_SENTIMENT_VALUE} (deep insecurity)`,
                  type: "number",
                },
                description: {
                  description: `Doubts about one’s worth in someone’s eyes or in the relationship. Scale: ${MIN_SENTIMENT_VALUE} (no insecurity) to ${MAX_SENTIMENT_VALUE} (deep insecurity)`,
                  type: "string",
                },
              },
            },
            possessiveness: {
              type: "object",
              properties: {
                value: {
                  description: `Desire to control or have exclusive attention from someone. Scale: ${MIN_SENTIMENT_VALUE} (no possessiveness) to ${MAX_SENTIMENT_VALUE} (deep possessiveness)`,
                  type: "number",
                },
                description: {
                  description: `Desire to control or have exclusive attention from someone. Scale: ${MIN_SENTIMENT_VALUE} (no possessiveness) to ${MAX_SENTIMENT_VALUE} (deep possessiveness)`,
                  type: "string",
                },
              },
            },
            reverence: {
              type: "object",
              properties: {
                value: {
                  description: `Deep respect mixed with awe for someone’s character or position. Scale: ${MIN_SENTIMENT_VALUE} (no reverence) to ${MAX_SENTIMENT_VALUE} (deep reverence)`,
                  type: "number",
                },
                description: {
                  description: `Deep respect mixed with awe for someone’s character or position. Scale: ${MIN_SENTIMENT_VALUE} (no reverence) to ${MAX_SENTIMENT_VALUE} (deep reverence)`,
                  type: "string",
                },
              },
            },
            pity: {
              type: "object",
              properties: {
                value: {
                  description: `Sympathy mixed with a sense of superiority, often toward someone in a difficult situation. Scale: ${MIN_SENTIMENT_VALUE} (no pity) to ${MAX_SENTIMENT_VALUE} (deep pity)`,
                  type: "number",
                },
                description: {
                  description: `Sympathy mixed with a sense of superiority, often toward someone in a difficult situation. Scale: ${MIN_SENTIMENT_VALUE} (no pity) to ${MAX_SENTIMENT_VALUE} (deep pity)`,
                  type: "string",
                },
              },
            },
            relief: {
              type: "object",
              properties: {
                value: {
                  description: `A sense of ease after resolving a conflict or misunderstanding with someone. Scale: ${MIN_SENTIMENT_VALUE} (no relief) to ${MAX_SENTIMENT_VALUE} (deep relief)`,
                  type: "number",
                },
                description: {
                  description: `A sense of ease after resolving a conflict or misunderstanding with someone. Scale: ${MIN_SENTIMENT_VALUE} (no relief) to ${MAX_SENTIMENT_VALUE} (deep relief)`,
                  type: "string",
                },
              },
            },
            inspiration: {
              type: "object",
              properties: {
                value: {
                  description: `Feeling motivated or uplifted by someone’s actions or words. Scale: ${MIN_SENTIMENT_VALUE} (no inspiration) to ${MAX_SENTIMENT_VALUE} (deep inspiration)`,
                  type: "number",
                },
                description: {
                  description: `Feeling motivated or uplifted by someone’s actions or words. Scale: ${MIN_SENTIMENT_VALUE} (no inspiration) to ${MAX_SENTIMENT_VALUE} (deep inspiration)`,
                  type: "string",
                },
              },
            },
            admirationMixedWithEnvy: {
              type: "object",
              properties: {
                value: {
                  description: `Both respect and jealousy for someone’s accomplishments. Scale: ${MIN_SENTIMENT_VALUE} (no admiration mixed with envy) to ${MAX_SENTIMENT_VALUE} (deeply admiring and envious)`,
                  type: "number",
                },
                description: {
                  description: `Both respect and jealousy for someone’s accomplishments. Scale: ${MIN_SENTIMENT_VALUE} (no admiration mixed with envy) to ${MAX_SENTIMENT_VALUE} (deeply admiring and envious)`,
                  type: "string",
                },
              },
            },
            guiltMixedWithAffection: {
              type: "object",
              properties: {
                value: {
                  description: `Feeling regret for past wrongs but still caring for the person. Scale: ${MIN_SENTIMENT_VALUE} (no guilt mixed with affection) to ${MAX_SENTIMENT_VALUE} (deeply guilt-ridden but affectionate)`,
                  type: "number",
                },
                description: {
                  description: `Feeling regret for past wrongs but still caring for the person. Scale: ${MIN_SENTIMENT_VALUE} (no guilt mixed with affection) to ${MAX_SENTIMENT_VALUE} (deeply guilt-ridden but affectionate)`,
                  type: "string",
                },
              },
            },
            conflicted: {
              type: "object",
              properties: {
                value: {
                  description: `Experiencing competing sentiments, such as love mixed with distrust. Scale: ${MIN_SENTIMENT_VALUE} (no conflict) to ${MAX_SENTIMENT_VALUE} (deeply conflicted)`,
                  type: "number",
                },
                description: {
                  description: `Experiencing competing sentiments, such as love mixed with distrust. Scale: ${MIN_SENTIMENT_VALUE} (no conflict) to ${MAX_SENTIMENT_VALUE} (deeply conflicted)`,
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

const getActivitySchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "activity",
      schema: {
        type: "object",
        properties: {
          activity: {
            description: "The media being consumed",
            type: "string",
          },
          duration: {
            description: "The duration of time for the activity",
            type: "number",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getItemSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "item",
      schema: {
        type: "object",
        properties: {
          item: {
            description: "The item being used",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getReasonSchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "reason",
      schema: {
        type: "object",
        properties: {
          reason: {
            description: "The reason behind the choices.",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

  const getCategorySchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "category",
      schema: {
        type: "object",
        properties: {
          category: {
            description:
              "The desired category of activity. Either watching, playing, or listening.",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

module.exports = {
  openai,
  MIN_EMOTION_VALUE,
  MAX_EMOTION_VALUE,
  MIN_SENTIMENT_VALUE,
  MAX_SENTIMENT_VALUE,
  CHOICE_RESPOND: "respond",
  CHOICE_IGNORE: "ignore",
  getEmotionStatusSchema,
  getMessageSchema,
  getSummarySchema,
  getResponseChoiceSchema,
  getIdentitySchema,
  getSentimentStatusSchema,
  getActivitySchema,
  getItemSchema,
  getReasonSchema,
  getCategorySchema,
};
