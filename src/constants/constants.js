const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MIN_EMOTION_VALUE = 0;
const MAX_EMOTION_VALUE = 100;
const MIN_SENTIMENT_VALUE = 0;
const MAX_SENTIMENT_VALUE = 100;
const MIN_PERSONALITY_VALUE = 0;
const MAX_PERSONALITY_VALUE = 100;
const THOUGHT_RATE = 60;
const ACTIVITY_RATE = 30;
const EMOTIONAL_DECAY_RATE = 2;


const EXTRINSIC_RELATIONSHIPS = ['stranger','friend', 'acquaintance', 'enemy', 'romantic partner', 'best friend'];
const NO_INTRINSIC_RELATIONSHIP = "n/a";
const INTRINSIC_RELATIONSHIPS = ['creator and master', 'brother', 'sister', 'mother', 'father', 'son', 'daughter', NO_INTRINSIC_RELATIONSHIP]

module.exports = {
  openai,
  MIN_EMOTION_VALUE,
  MAX_EMOTION_VALUE,
  MIN_SENTIMENT_VALUE,
  MAX_SENTIMENT_VALUE,
  MIN_PERSONALITY_VALUE,
  MAX_PERSONALITY_VALUE,
  EXTRINSIC_RELATIONSHIPS,
  INTRINSIC_RELATIONSHIPS,
  NO_INTRINSIC_RELATIONSHIP,
  CHOICE_RESPOND: "respond",
  CHOICE_IGNORE: "ignore",
  THOUGHT_RATE,
  ACTIVITY_RATE,
  EMOTIONAL_DECAY_RATE,
};
