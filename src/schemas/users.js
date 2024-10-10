const { Schema, model, Types } = require("mongoose");

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
  personality: {
      type: String,
      required: true,
  },
  memory_profile: {
      type: [memorySchema],
      default: [],
  },
  emotional_status: {
      type: [emotionSchema],
      required: true,
  }
});

const emotionSchema = new Schema({
  emotion_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  emotion: {
    type: String, 
    required: true
  },
  reason: {
    type: String,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

/**
 * Mongoose database schema for user data
 */
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
    required: true,
  },
	memory_profile: {
    type: [memorySchema],
    default: []
  },
	sentiment: {
    type: sentimentSchema,
    required: true,  
  }
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
  }
});

const sentimentSchema = new Schema({
  sentiment_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  sentiment: {
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
  }
})

module.exports = {
  Users: model("users", userSchema),
  Memories: model("memories", memorySchema),
  Sentiments: model("sentiments", sentimentSchema),
  Emotions: model("emotions", emotionSchema),
  Self: model("self", selfSchema)
};
