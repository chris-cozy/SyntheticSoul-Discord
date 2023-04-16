const { Schema, model } = require('mongoose');

/**
 * Database schema for guild autorole
 */
const autoRoleSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    roleId: {
        type: String,
        required: true,
    },
});

module.exports = model('autoRole', autoRoleSchema);