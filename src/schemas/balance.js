const { Schema, model } = require('mongoose');

/**
 * Database schema for user balance
 */
const balanceSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 1000,
    },
    lastDailyCollect: {
        type: Date,
        required: true,
    }
});

module.exports = model('userBalance', balanceSchema);