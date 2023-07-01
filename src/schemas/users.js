const { Schema, model, Types } = require("mongoose");

/**
 * Database schema for user data
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
    required: false,
  },
});

module.exports = model("users", userSchema);
