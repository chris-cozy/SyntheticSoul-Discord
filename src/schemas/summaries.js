const { Schema, model, Types } = require("mongoose");

const summarySchema = new Schema({
  summary_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  user_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model("summaries", summarySchema);
