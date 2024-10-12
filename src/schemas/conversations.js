const { Schema, model, Types } = require("mongoose");

const messageSchema = new Schema({
  message_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  message: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: false,
    default: new Date(),
  },
  is_bot: {
    type: Boolean,
    required: true,
  },
});

/**
 * Database schema for conversations
 */
const conversationSchema = new Schema({
  conversation_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  user_id: {
    type: String,
    required: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
});

module.exports = {
  Conversations: model("conversations", conversationSchema),
  Messages: model("messages", messageSchema),
};
