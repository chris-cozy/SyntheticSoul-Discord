# Jasmine (discord.js)
## Description
This is a discord bot created using the discord.js library, as well as other capatible libraries. The purpose of this bot is a digital-assistant, conversationalist, and server manager.

## Features
### Conversation
This bot has integrated gpt-3.5 turbo capabilities, and can be conversed with by the user prefixing their message with a bot mention. The bot will retain the conversation context with that specific user, to a certain degree.
Due to the API cost, the user needs to have credits to chat with the bot. These credits can be collected for free each day with the '/daily' command. Each chat subtracts an amount of credits from the user's balance, currenty 25.
### Administrative Commands
- /autorole-configure - Set up the auto role for users to gain when joining the server
- /autorole-disable - Disable the auto role for the server
- /role-add - Add a role to the server
- /role-edit - Edit a server role
- /role-delete - Delete a role from the server
### Miscellaneous Commands
- /info - Displays general information about the bot.
- /ping - Sends the bot's websocket and client pings.
### Moderation Commands
- /ban - Bans the specified user, if permitted.
- /kick - Kicks the specified user, if permitted.
- /timeout - Puts the specified user in a timeout of specified length, if permitted.
- /roles - Sends role buttons, allowing a user to change their role.
### Economic Commands
- /level - Sends a rank card which displays the specified user's level, xp, and rank in the server.
- /daily - Collects the user's daily allowance. If user does not have balance account yet, sets it up.
- /balance - Checks the specified user's balance
## Prerequisites
Node.js

## Installation and Use
1. Download the code base.
2. Open a terminal in the main directory
3. Run the command: `npx nodemon index.js`
## Contributing
Issue Tracker: [discord-bot-js/issues](https://github.com/chris-cozy/discord-bot-js/issues "Issue tracker for the discord bot")
## License
Currently Not Applicable
## Citation
Currently Not Applicable
## Contact
For more information, contact <csande9@clemson.edu>