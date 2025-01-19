const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

/**
 * Check if the message implicitly addresses the agent
 * @param {Object} msg - The latest message object.
 * @returns {Boolean} Whether the agent was implicitly addressed
 */
async function CheckImplicitAddressing(message, username) {

  const url = process.env.SYNTHETIC_SOUL_API_IMPLICIT_ADDRESSING_URL;
  const payload = {
      message: message,
      username: username
  };
  const headers = {
      'Content-Type': 'application/json',
  };

  try {
      const response = await axios.post(url, payload, { headers });

      console.log('Success - Implicitly addressed value:', response.data);

      return (response.data["implicitly_addressed"] == "yes");
  } catch (error) {
      console.error('Error - CheckImplicitAddressing: Sending message:', error.message);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
    }
  }
}

/**
 * Get a response to the incoming message
 * @param {Object} msg - The latest message object.
 * @returns {String} Response to the message
 */
async function GetResponse(message, username) {
    const url = process.env.SYNTHETIC_SOUL_API_URL;
    const payload = {
        message: message,
        username: username
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
    CheckImplicitAddressing,
    GetResponse,
};