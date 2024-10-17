const { Schema, model, Types } = require("mongoose");
const {EmotionModifier, EmotionStatusSchema} = require("./emotionSchemas");
const {SentimentStatusSchema} = require("./sentimentSchemas");
const {Personality, PersonalityModifier} = require("./personalitySchema");
const { EXTRINSIC_RELATIONSHIPS, NO_INTRINSIC_RELATIONSHIP, INTRINSIC_RELATIONSHIPS } = require("../constants/constants");

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: false,
  },
  reason: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

const memorySchema = new Schema({
  memory_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  event: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const selfSchema = new Schema({
  self_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: false,
    default: "I am a prototype program made by cozycharm, designed as a digital replication of the human mind.",
  },
  personality_matrix: {
    type: Personality,
    required: false,
    default: {},
  },
  memory_profile: {
    type: [memorySchema],
    required: false,
    default: [],
  },
  emotional_status: {
    type: EmotionStatusSchema,
    required: false,
    default: {},
  },
  activity_status: {
    type: activitySchema,
    required: false,
    default: {
      name: "Simply existing.",
      category: "custom",
      reason: "Liminality."
    },
  },
});

const userSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  discord_id: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: false,
    default: "",
  },
  intrinsic_relationship: {
    type: String,
    enum: INTRINSIC_RELATIONSHIPS,
    required: false,
    default: NO_INTRINSIC_RELATIONSHIP,
  },
  extrinsic_relationship: {
    type: String,
    enum: EXTRINSIC_RELATIONSHIPS,
    required: false,
    default: 'stranger',
  },
  memory_profile: {
    type: [memorySchema],
    required: false,
    default: [],
  },
  sentiment_status: {
    type: SentimentStatusSchema,
    required: false,
    default: {},
  },
});

module.exports = {
  Users: model("users", userSchema),
  Memories: model("memories", memorySchema),
  Self: model("selves", selfSchema),
  Activity: model("activity", activitySchema),
};
