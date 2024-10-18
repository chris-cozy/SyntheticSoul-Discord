const { Schema, model, Types } = require("mongoose");

const thoughtSchema = new Schema({
  thought_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  thought: {
    type: String,
    required: false,
    default: "",
  },
  timestamp: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

module.exports = {
  ThoughtSchema: thoughtSchema,
  Thought: model("thoughts", thoughtSchema),
};
