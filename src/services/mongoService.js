const { Users, Self } = require("../mongoSchemas/users");
const { Conversations } = require("../mongoSchemas/conversationSchema");
const {
  NO_INTRINSIC_RELATIONSHIP,
} = require("../constants/constants");


/**
* @brief Grab user object based on their discord Id.
* @param {String} authorId 
* @returns User object for user
*/
async function GrabUser(authorId){
  let user = await Users.findOne({ discord_id: authorId });

  let intrinsicRelationship;

  switch (authorId) {
    case process.env.DEVELOPER_ID:
      intrinsicRelationship = "creator and master";
      break;
    default:
      intrinsicRelationship = NO_INTRINSIC_RELATIONSHIP;
      break;
  }

  if (!user) {
    user = new Users({
      name: msg.author.username,
      discord_id: msg.author.id,
      intrinsic_relationship: intrinsicRelationship,
    });
    await user.save();
    user = await Users.findOne({ discord_id: authorId });
  }

  return user;
};

/**
* @brief Grab self object based on the agent name.
* @param {String} agentName 
* @returns Self object for agent
*/
async function GrabSelf(agentName){
  let self = await Self.findOne({ name: agentName });

  if (!self) {
    self = new Self({
      name: process.env.BOT_NAME,
      personality_matrix: JSON.parse(process.env.BOT_PERSONALITY_MATRIX),
    });

    await self.save();
    self = await Self.findOne({ name: agentName });
  }
  return self;
};


/**
* @brief Grab conversation messages in an array based on the user id.
* @param {String} userId - Discord Id of the user
* @param {int} messageCount - Number of messages to return
* @returns Array of message objects
*/
async function GetConversation(userId){
    let userConversation =
      (await Conversations.findOne({
        user_id: userId,
      })) || new Conversations({ user_id: userId });

    return userConversation;
}

module.exports = {
  GetConversation,
  GrabSelf,
  GrabUser,
}
