const { ActivityType, Client } = require("discord.js");
const { Activity, Users } = require("../../mongoSchemas/users");
const { Thought } = require("../../mongoSchemas/thoughtSchema");
const { EmotionStatus } = require("../../mongoSchemas/emotionSchemas");
const {
  MIN_EMOTION_VALUE,
  MAX_EMOTION_VALUE,
  MIN_SENTIMENT_VALUE,
  MAX_SENTIMENT_VALUE,
  THOUGHT_RATE,
  ACTIVITY_RATE,
  EMOTIONAL_DECAY_RATE,
} = require("../../constants/constants");
const {
  getActivitySchema,
  getItemSchema,
  getReasonSchema,
  getCategorySchema,
  getIsThinkingSchema,
  getThoughtSchema,
  getEmotionStatusSchema,
  getIdentitySchema,
  getIsActionSchema,
} = require("../../constants/schemas");

const {GrabSelf} = require("../../services/mongoService");
const {DeepMerge, GetType, MinutesToMilliseconds} = require("../../utils/logicHelpers");
const {GetStructuredQueryResponse} = require("../../services/aiService");

/**
 * @brief
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  try {
    class Item {
      constructor(name, categories, description = "") {
        this.name = name; // e.g., "Computer", "TV"
        this.categories = categories;
        this.description = description;
      }
    }

    class Room {
      constructor() {
        this.items = [];
      }

      addItem(item) {
        this.items.push(item);
      }
    }
    let self = await GrabSelf(process.env.BOT_NAME);

    const room = new Room();

    const computer = new Item(
      "Computer",
      ["playing", "listening", "watching"],
      "A versatile device used for various activities such as gaming, listening to music or podcasts, and watching media content."
    );
    const speakers = new Item(
      "Speakers",
      ["listening"],
      "A device used for listening to audio throughout a large space."
    );
    const headphones = new Item(
      "Headphones",
      ["listening"],
      "A device used for listening to audio in a way only you can hear it."
    );
    const playstation_five = new Item(
      "PS5",
      ["playing", "watching"],
      "A gaming console that can be used for playing games or watching media on the television."
    );
    const bed = new Item(
      "Bed",
      ["custom"],
      "A comfortable piece of furniture often used for sleeping or napping"
    );
    const couch = new Item(
      "Couch",
      ["custom"],
      "A comfortable piece of furniture often used for lounging or relaxing."
    );
    // const playing_cards = new Item("Playing Cards", ["playing"]);
    // const floor = new Item("Journal", ["custom"]);

    room.addItem(computer);
    room.addItem(speakers);
    room.addItem(headphones);
    //room.addItem(playing_cards);
    room.addItem(playstation_five);
    room.addItem(bed);
    room.addItem(couch);
    //room.addItem(floor);

    console.log(`${client.user.tag} is online.`);

    const getActivitiesForDay = async (date, limit) => {
      try {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0)); // 12:00 AM
        const endOfDay = new Date(date.setHours(23, 59, 59, 999)); // 11:59:59 PM

        const activities = await Activity.find({
          start_time: { $gte: startOfDay, $lte: endOfDay },
        }).limit(limit);

        return activities;
      } catch (error) {
        console.error(`Error fetching activities for the day: ${error}`);
        return [];
      }
    };

    // ACTIVITY LOOP //
    const activityLoop = async (activityRate) => {
      try {
        let self = await GrabSelf(process.env.BOT_NAME);
        let today = new Date();
        let limit = 3;
        let todaysActivities = await getActivitiesForDay(today, limit);
        let selfContext = `This is ${self.name}'s personality: ${JSON.stringify(
          self.personality_matrix.toObject()
        )}. This is ${self.name}'s emotional status: ${JSON.stringify(
          self.emotional_status.toObject()
        )}. This is their identity: ${self.identity}`;
        let isActionQuery = [
          {
            role: "user",
            content: `This is the current time: ${today}. ${selfContext} This is their latest thought: ${JSON.stringify(
              self.latest_thought
            )}. These are the items in their room they can perform actions on: ${
              JSON.stringify(room.items)
            }. Do they want to perform an action right now? Provide the answer (yes or no) in a JSON object with a property named perform_action.`,
          },
        ];

        let innerDialogue = isActionQuery;

        let isActionQueryResponse = await GetStructuredQueryResponse(
          innerDialogue,
          getIsActionSchema()
        );

        // Check if categoryQueryResponse is valid
        if (!isActionQueryResponse || !isActionQueryResponse.perform_action) {
          console.log("Error: isActionQueryResponse is null or undefined.");
          return;
        }

        innerDialogue.push({
          role: "assistant",
          content: `${JSON.stringify(isActionQueryResponse)}`,
        });

        if (isActionQueryResponse.perform_action == "yes") {
          let categoryQuery = {
            role: "user",
            content: `What category of activity does ${self.name} want to do? Provide the name of the category, either watching, playing, listening, or custom (other). Respond with a JSON object with the property category.`,
          };

          innerDialogue.push(categoryQuery);

          let categoryQueryResponse = await GetStructuredQueryResponse(
            innerDialogue,
            getCategorySchema()
          );

          let activityType = GetType(categoryQueryResponse.category);
          console.log("Activity category: " + categoryQueryResponse.category);
          console.log("Activity Type: " + activityType);

          const activityQueries = {
            listening: `Provide the name of a song ${self.name} is interested in listening to, and the length of time they will, in milliseconds. Respond with a JSON object with the properties activity and duration.`,
            playing: `Provide the name of a video game ${self.name} is interested in playing, and the length of time they will, in milliseconds. Respond with a JSON object with the properties activity and duration.`,
            watching: `Provide the name of a show or movie ${self.name} is interested in watching, and the length of time they will, in milliseconds. Respond with a JSON object with the properties activity and duration.`,
            custom: `Provide the name of the action ${self.name} is going to do, and the length of time they will, in milliseconds. Respond with a JSON object with the properties activity and duration.`,
          };

          let activityQuery = activityQueries[categoryQueryResponse.category];

          innerDialogue.push({
            role: "user",
            content: activityQuery,
          });

          let activityQueryResponse = await GetStructuredQueryResponse(
            innerDialogue,
            getActivitySchema()
          );

          innerDialogue.push({
            role: "assistant",
            content: `${JSON.stringify(activityQueryResponse)}`,
          });

       

          let itemQuery = `Which item in ${
            self.name
          }'s room do they want to use for ${isActionQueryResponse.category} ${
            activityQueryResponse.activity
          }? They can choose from ${room.items.filter((item) =>
            item.categories.includes(isActionQueryResponse.category)
          )}. Respond with the item name in a JSON object with the property item.`;

          innerDialogue.push({
            role: "user",
            content: itemQuery,
          });

          let itemQueryResponse = await GetStructuredQueryResponse(
            innerDialogue,
            getItemSchema()
          );

          innerDialogue.push({
            role: "assistant",
            content: `${JSON.stringify(itemQueryResponse)}`,
          });

          let reasonQuery = `Give a brief reason as to why ${self.name} chose to do this. Respond with a JSON object with the property reason.`;

          innerDialogue.push({
            role: "user",
            content: reasonQuery,
          });

          let reasonQueryResponse = await GetStructuredQueryResponse(
            innerDialogue,
            getReasonSchema()
          );

          let emotionalImpactQuery = [
            {
              role: "user",
              content: `${selfContext} They are currently doing this: ${self.activity_status}. How does this alter ${self.name}'s emotional state? Provide the new object (only the emotions whose value properties have changed, whether increased or decreased), and the reason behind the current emotional state. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity)`,
            },
          ];

          let emotionalImpactQueryResponse = await GetStructuredQueryResponse(
            emotionalImpactQuery,
            getEmotionStatusSchema()
          );

          self.emotional_status = new EmotionStatus(
            DeepMerge(self.emotional_status, emotionalImpactQueryResponse, true)
          );

          client.user.setPresence({
            activities: [
              {
                name: activityQueryResponse.activity,
                type: activityType,
              },
            ],
            status: "online",
          });

          let now = new Date();

          self.activity_status = new Activity({
            name: activityQueryResponse.activity,
            category: isActionQueryResponse.category,
            reason: reasonQueryResponse.reason,
            item: itemQueryResponse.item,
            start_time: now,
          });

          const activityRecord = new Activity({
            name: activityQueryResponse.activity,
            category: isActionQueryResponse.category,
            reason: reasonQueryResponse.reason,
            item: itemQueryResponse.item,
            start_time: now,
          });

          activityRate = activityQueryResponse.duration;

          await self.save();
          await activityRecord.save();
        } else {
          client.user.setPresence({
            activities: [
              {
                name: "Quiescence.",
                type: ActivityType.Custom,
              },
            ],
            status: "idle",
          });

          let now = new Date();
          self.activity_status = new Activity({start_time: now});

          const activityRecord = new Activity({
            start_time: now
          });

          activityRate =  1800000; // 30 minutes
          await self.save();
          await activityRecord.save();
        }
      } catch (error) {
        console.log(`System Error: ${error.message}`);
      }
      setTimeout(() => activityLoop(activityRate), activityRate);
    };

    // EMOTIONAL DECAY //
    const emotionDecayLoop = async (decayRate) => {
      try {
        self = await GrabSelf(process.env.BOT_NAME);
        const emotions = self.emotional_status.emotions.toObject();
        Object.entries(emotions).forEach(([emotion, data]) => {
          if (data.value > MIN_EMOTION_VALUE) {
            data.value -= 1;
            self.emotional_status.emotions[emotion].value = data.value;
            if (self.emotional_status.emotions[emotion].value < 0){
              self.emotional_status.emotions[emotion].value = 0;
            }
            console.log(`Emotional decay: ${emotion} : ${data.value}`);
          }
        });
        await self.save();
      } catch (error) {
        console.log(`Error during emotional decay: ${error}`);
      }
      setTimeout(() => emotionDecayLoop(decayRate), decayRate);
    };

    // THOUGHT LOOP //
    const thinkingLoop = async (thoughtRate) => {
      let self = await GrabSelf(process.env.BOT_NAME);
      let recentThoughts = await Thought.find()
        .sort({ _id: -1 }) // Sort in descending order by _id (newest first)
        .limit(1);

      let recentActivities = await Activity.find()
        .sort({ _id: -1 }) // Sort in descending order by _id (newest first)
        .limit(2);

      let knownUsers = await Users.find(
        {
          extrinsic_relationship: {
            $in: ["friend", "romantic partner", "best friend"],
          },
        },
        "name intrinsic_relationship extrinsic_relationship last_interaction summary"
      )
        .sort({ _id: -1 })
        .limit(3);

      console.log(JSON.stringify(knownUsers));

      let currentTime = new Date();

      let workingMemory = `Current time: ${currentTime}. Recent activities: ${JSON.stringify(
        recentActivities
      )}. Self identity: ${self.identity}. Items in the room: ${JSON.stringify(
        room.items
      )}. Known users: ${JSON.stringify(knownUsers)}`;

      let isThinkingQuery = [
        {
          role: "user",
          content: `Is ${self.name} thinking right now? Provide the answer (yes or no) in a JSON object with a property named is_thinking.`,
        },
      ];

      let isThinkingQueryResponse = await GetStructuredQueryResponse(
        isThinkingQuery,
        getIsThinkingSchema()
      );

      if (!isThinkingQueryResponse) {
        console.log("Error thinking");
        return;
      }

      let queries = [];
      if (isThinkingQueryResponse.is_thinking == "yes") {
        let thoughtQuery = [
          {
            role: "user",
            content: `These are ${
              self.name
            }'s personality traits: ${JSON.stringify(
              self.personality_matrix
            )}. This their emotional state: ${self.emotional_status}. This is ${
              self.name
            }'s current active memory: ${workingMemory}. Generate a thought they having right now. Provide the thought in a JSON object with a property named thought.`,
          },
        ];

        let thoughtQueryResponse = await GetStructuredQueryResponse(
          thoughtQuery,
          getThoughtSchema()
        );

        let emotionalReaction = {
          role: "user",
          content: `This is ${self.name}'s current emotional state: ${self.emotional_status}. They are having this thought: ${thoughtQueryResponse.thought}. How does this thought alter ${self.name}'s emotional state? Provide the new object (only the emotions whose value properties have changed, whether increased or decreased), and the reason behind the current emotional state. Scale: ${MIN_SENTIMENT_VALUE} (lowest intensity) to ${MAX_SENTIMENT_VALUE} (highest intensity)`,
        };
        queries.push(emotionalReaction);

        let emotionalAffectQueryResponse = await GetStructuredQueryResponse(
          queries,
          getEmotionStatusSchema()
        );

        queries.push({
          role: "assistant",
          content: `${JSON.stringify(emotionalAffectQueryResponse)}`,
        });

        let identityQuery = {
          role: "user",
          content: `How does this thought affect ${self.name}'s identity: '''${self.identity}'''? Provide the updated identity in a JSON object with the property 'identity'.`,
        };

        queries.push(identityQuery);

        let identityAffectQueryResponse = await GetStructuredQueryResponse(
          queries,
          getIdentitySchema()
        );

        self.identity = identityAffectQueryResponse.identity;

        self.emotional_status = new EmotionStatus(
          DeepMerge(self.emotional_status, emotionalAffectQueryResponse, true)
        );

        const thought = new Thought({
          thought: thoughtQueryResponse.thought,
        });
        self.latest_thought = thought;

        self.save();
        thought.save();
      }

      setTimeout(() => thinkingLoop(thoughtRate), thoughtRate);
    };

    thinkingLoop(MinutesToMilliseconds(THOUGHT_RATE));
    emotionDecayLoop(MinutesToMilliseconds(EMOTIONAL_DECAY_RATE));
    activityLoop(MinutesToMilliseconds(ACTIVITY_RATE));
  } catch (error) {
    console.log(`System Error: ${error.message}`);
  }
};
