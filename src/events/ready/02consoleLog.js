const { ActivityType, Client } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { Self, Activity } = require("../../schemas/users");
const {openai, MIN_EMOTION_VALUE, MAX_EMOTION_VALUE, getActivitySchema, getItemSchema, getReasonSchema, getCategorySchema} = require("../../constants/constants");
/**
 * @brief Alert that the bot is online, and set the status
 * @param {Client} client - The bot
 */
module.exports = async (client) => {

  try {
    class Item {
      constructor(name, activities) {
        this.name = name; // e.g., "Computer", "TV"
        this.activities = activities;
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
    let self = await grabSelf(process.env.BOT_NAME);

    const room = new Room();
    const computer = new Item("Computer", [
      "streaming",
      "playing",
      "listening",
      "watching",
    ]);

    const speakers = new Item("Speakers", ["listening"]);
    const headphones = new Item("Headphones", ["listening"]);
    const playing_cards = new Item("Playing Cards", ["playing"]);
    const playstation_five = new Item("PS5", ["playing", "watching", "listen"]);
    const bed = new Item("Bed", ["custom"]);
    const floor = new Item("Journal", ["custom"]);

    room.addItem(computer);
    room.addItem(speakers);
    room.addItem(headphones);
    room.addItem(playing_cards);
    room.addItem(playstation_five);
    room.addItem(bed);
    room.addItem(floor);

    console.log(`${client.user.tag} is online.`);

    const getActivitiesForDay = async (date) => {
      try {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0)); // 12:00 AM
        const endOfDay = new Date(date.setHours(23, 59, 59, 999)); // 11:59:59 PM

        const activities = await Activity.find({
          start_time: { $gte: startOfDay, $lte: endOfDay },
        });

        return activities;
      } catch (error) {
        console.error(`Error fetching activities for the day: ${error}`);
        return [];
      }
    };

    let today = new Date();
    let todaysActivities = await getActivitiesForDay(today);
    let categoryQuery =
      {
        role: "user",
        content: `${
          self.name
        } is in their room with these items in it: ${JSON.stringify(
          room.items
        )}. This is ${self.name}'s personality: ${JSON.stringify(
          self.personality_matrix.toObject()
        )}. This is ${self.name}'s emotional status: ${JSON.stringify(
          self.emotional_status.toObject()
        )}. These are the activities they have done today: ${JSON.stringify(
          todaysActivities
        )}. What category of activity does ${
          self.name
        } want to do next? Provide the name of the category, either watching, playing, or listening. Respond with a JSON object with the property category. `,
      };

    let innerDialogue = [categoryQuery];

    let categoryQueryResponse = await getStructuredQueryResponse(
      innerDialogue,
      getCategorySchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(categoryQueryResponse)}`,
    });

    const activityQueries = {
      "listening": `Provide the name of a song ${self.name} is interested in listening to, and the length of time she will, in milliseconds. Respond with a JSON object with the properties activity and duration.`,
      "playing": `Provide the name of a video game ${self.name} is interested in playing, and the length of time she will, in milliseconds. Respond with a JSON object with the properties activity and duration.`,
      "watching": `Provide the name of a show or movie ${self.name} is interested in watching, and the length of time she will, in milliseconds. Respond with a JSON object with the properties activity and duration.`
    };

    let activityQuery = activityQueries[categoryQueryResponse.category];

    innerDialogue.push({
      role: "user",
      content: activityQuery,
    });

    let activityQueryResponse = await getStructuredQueryResponse(
      innerDialogue,
      getActivitySchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(activityQueryResponse)}`,
    });

    let activityType = getType(categoryQueryResponse.category);

    let itemQuery = `Which item in ${
      self.name
    }'s room do they want to use for ${categoryQueryResponse.category} ${
      activityQueryResponse.activity
    }? They can choose from ${room.items.filter((item) =>
      item.activities.includes(categoryQueryResponse.category)
    )}. Respond with the item name in a JSON object with the property item.`;

    innerDialogue.push({
      role: "user",
      content: itemQuery,
    });

    let itemQueryResponse = await getStructuredQueryResponse(
      innerDialogue,
      getItemSchema()
    );

    innerDialogue.push({
      role: "assistant",
      content: `${JSON.stringify(itemQueryResponse)}`,
    });

    let reasonQuery = `Give a short explanation as to why ${self.name} made these choices. Respond with  a JSON object with the property reason.`;

    innerDialogue.push({
      role: "user",
      content: reasonQuery,
    });

    let reasonQueryResponse = await getStructuredQueryResponse(
      innerDialogue,
      getReasonSchema()
    );

    client.user.setActivity({
      name: activityQueryResponse.activity,
      type: activityType,
    });

    self.activity_status = new Activity({
      name: activityQueryResponse.activity,
      category: categoryQueryResponse.category,
      reason: reasonQueryResponse.reason,
      item: itemQueryResponse.item,
    });

    const activityRecord = new Activity({
      name: activityQueryResponse.activity,
      category: categoryQueryResponse.category,
      reason: reasonQueryResponse.reason,
      item: itemQueryResponse.item,
    });

    // ACTIVITY LOOP //
    const activityLoop = async () => {
      try {
        self = await grabSelf(process.env.BOT_NAME);
        today = new Date();
        todaysActivities = await getActivitiesForDay(today);
        categoryQuery =
          {
            role: "user",
            content: `${
              self.name
            } is in their room with these items in it: ${JSON.stringify(
              room.items
            )}. This is ${self.name}'s personality: ${JSON.stringify(
              self.personality_matrix.toObject()
            )}. This is ${self.name}'s emotional status: ${JSON.stringify(
              self.emotional_status.toObject()
            )}. These are the activities they have done today: ${JSON.stringify(
              todaysActivities
            )}. What category of activity does ${
              self.name
            } want to do next? A variety of categorys is good for mental stimulation. Provide the name of the category, either watching, playing, or listening. Respond with a JSON object with the property category. `,
          };

        innerDialogue = [categoryQuery];

        categoryQueryResponse = await getStructuredQueryResponse(
          innerDialogue,
          getCategorySchema()
        );

        // Check if categoryQueryResponse is valid
    if (!categoryQueryResponse || !categoryQueryResponse.category) {
      console.log("Error: categoryQueryResponse is null or undefined.");
      console.log(categoryQueryResponse); // Log the response for debugging
      return; // Exit the loop if the response is invalid
    }

        innerDialogue.push({
          role: "assistant",
          content: `${JSON.stringify(categoryQueryResponse)}`,
        });

      activityQuery = activityQueries[categoryQueryResponse.category];

        innerDialogue.push({
          role: "user",
          content: activityQuery,
        });

       activityQueryResponse = await getStructuredQueryResponse(
          innerDialogue,
          getActivitySchema()
        );

        innerDialogue.push({
          role: "assistant",
          content: `${JSON.stringify(activityQueryResponse)}`,
        });

        activityType = getType(categoryQueryResponse.category);

        itemQuery = `Which item in ${
          self.name
        }'s room do they want to use for ${categoryQueryResponse.category} ${
          activityQueryResponse.activity
        }? They can choose from ${room.items.filter((item) =>
          item.activities.includes(categoryQueryResponse.category)
        )}. Respond with the item name in a JSON object with the property item.`;

        innerDialogue.push({
          role: "user",
          content: itemQuery,
        });

        itemQueryResponse = await getStructuredQueryResponse(
          innerDialogue,
          getItemSchema()
        );

        innerDialogue.push({
          role: "assistant",
          content: `${JSON.stringify(itemQueryResponse)}`,
        });

        innerDialogue.push({
          role: "user",
          content: reasonQuery,
        });

        reasonQueryResponse = await getStructuredQueryResponse(
          innerDialogue,
          getReasonSchema()
        );

        client.user.setActivity({
          name: activityQueryResponse.activity,
          type: activityType,
        });

        self.activity_status = new Activity({
          name: activityQueryResponse.activity,
          category: categoryQueryResponse.category,
          reason: reasonQueryResponse.reason,
          item: itemQueryResponse.item,
        });

        const activityRecord = new Activity({
          name: activityQueryResponse.activity,
          category: categoryQueryResponse.category,
          reason: reasonQueryResponse.reason,
          item: itemQueryResponse.item,
        });

        await self.save();
        await activityRecord.save();
      } catch (error) {
        console.log(`Error during activity update: ${error}`);
      }
      setTimeout(activityLoop, activityQueryResponse.duration);
    };

    // EMOTIONAL DECAY //
    const decayRate = 60000; //one minute
    const emotionDecay = async () => {
      try {
        self = await grabSelf(process.env.BOT_NAME);
        const emotions = self.emotional_status.emotions.toObject();
        Object.entries(emotions).forEach(([emotion, data]) => {
          if (data.value > MIN_EMOTION_VALUE) {
            data.value -= 1;
            self.emotional_status.emotions[emotion].value = data.value;
            console.log(`Emotional decay: ${emotion} : ${data.value}`);
          }
        });

        await self.save();
      } catch (error) {
        console.log(`Error during emotional decay: ${error}`);
      }
      setTimeout(emotionDecay, decayRate);
    };

    emotionDecay();
    activityLoop();
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }

  async function grabSelf(agentName) {
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
  }

  function getType(type) {
    switch (type) {
      case "streaming":
        return ActivityType.Streaming;
      case "watching":
        return ActivityType.Watching;
      case "custom":
        return ActivityType.Custom;
      case "listening":
        return ActivityType.Listening;
      case "playing":
        return ActivityType.Playing;
      default:
        return ActivityType.Custom;
    }
  }

  async function getStructuredQueryResponse(query, schema) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: query,
        response_format: schema,
      });
      console.log("---");
      console.log(
        JSON.stringify(JSON.parse(response.data.choices[0].message.content))
      );
      console.log("---");

      const parsed = JSON.parse(
        response.data.choices[0].message.content.trim()
      );

      return parsed;
    } catch (error) {
      return null;
    }
  }
};
