const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

/**
 * Get a response to the incoming message
 * @param {Object} msg - The latest message object.
 * @returns {String} Response to the message
 */
async function GetResponse(message, username, type) {
    const url = process.env.SYNTHETIC_SOUL_API_URL;
    const payload = {
        message: message,
        username: username,
        type: type,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    
    try {
    const response = await axios.post(url, payload, { headers });

    console.log(response.data.response)

    return response.data.response
    } catch (error) {
        console.error('Error - GetResponse: Sending message:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

module.exports = {
    GetResponse,
};