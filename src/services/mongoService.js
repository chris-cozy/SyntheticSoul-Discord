const { Users, Self } = require("../schemas/users");


/**
* @brief Grab user object based on their discord Id.
* @param {String} authorId 
* @returns User object for user
*/
export const GrabUser = async (authorId) => {
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
export const GrabSelf = async (agentName) => {
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
