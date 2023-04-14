const { Schema, model } = require('mongoose');

/**
 * Database schema for user levels
 */
const levelSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 0,
    },
    xp: {
        type: Number,
        default: 1,
    }
});

module.exports = model('userLevel', levelSchema);