const { ActivityType, Client } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { Self, Activity } = require("../../schemas/users");

/**
 * @brief Alert that the bot is online, and set the status
 * @param {Client} client - The bot
 */
module.exports = async (client) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const minEmotionValue = 0;
  const maxEmotionValue = 100;

  const getActivitySchema = () => ({
    type: "json_schema",
    json_schema: {
      name: "activity",
      schema: {
        type: "object",
        properties: {
          name: {
            description:
              "The activity being done. There are restrictions on this depending on the corresponding category. watching - must be the title of a show, movie, youtube video, or stream (i.e Kai Cenat live on Twitch). streaming - must be the title of a game. playing - must be the title of a game. custom - can be any activity that doesn't fit in the other categories. listening - must be the title of a song, podcast, or audiobook.",
            type: "string",
          },
          category: {
            description: "Which category the activity falls into.",
            type: "string",
            enum: ["watching", "streaming", "playing", "custom", "listening"],
          },
          time: {
            description:
              "Amount of time to perform the action for (in milliseconds)",
            type: "number",
          },
          item: {
            desciption: "The room item being used",
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  });

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

    const activityQuery = [
      {
        role: "user",
        content: `${
          self.name
        } is alone in their room that has these items in it: ${JSON.stringify(
          room.items
        )}. This is ${self.name}'s personality: ${JSON.stringify(
          self.personality_matrix
        )}. Given this information, what does ${
          self.name
        } want to do? Provide the name of the activity (If the category is watching - name must be the name of a show, movie, youtube video, or stream (i.e iRobot, A Movie). if it is streaming or playing - name must be the name of a game. if it is custom - name can be any activity that doesn't fit in the other categories. if it is listening - name must be the name of a song, podcast, or audiobook (i.e 'Chasing Cars' by Snow Patrol)), category of the activity, length of time the activity will be performed for (in milliseconds), and item the activity is being performed on. Respond with the following JSON object: { name: string, category: string, time: number, item: string}. `,
      },
    ];
    const activitySchema = getActivitySchema();

    console.log(`${client.user.tag} is online.`);

    let activity = await getActivity(activityQuery, activitySchema);
    let activityType = getType(activity.category);

    const activityLoop = async () => {
      try {
        activity = await getActivity(activityQuery, activitySchema);

        if (!activity) {
          console.log("Activity returned null, skipping update.");
          return;
        }

        console.log(JSON.stringify(activity));

        // Get the activity type
        activityType = getType(activity.category);

        client.user.setActivity({
          name: activity.name,
          type: activityType,
        });

        self.activity_status = new Activity({
          name: activity.name,
          category: activity.category,
          item: activity.item,
        });

        await self.save();
      } catch (error) {
        console.log(`Error during activity update: ${error}`);
      }
      setTimeout(activityLoop, activity.time);
    };

    const decayRate = 60000; //one minute
    const emotionDecay = async () => {
      try {
        const emotions = self.emotional_status.emotions.toObject();   
        Object.entries(emotions).forEach(
          ([emotion, data]) => {
            if (data.value > minEmotionValue){
              data.value -= 1;
              self.emotional_status.emotions[emotion].value = data.value;
              console.log(`Emotional decay: ${emotion} : ${data.value}`);
            }
          }
        );

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

  async function getActivity(query, schema) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: query,
        response_format: schema,
      });

      const parsed = JSON.parse(
        response.data.choices[0].message.content.trim()
      );

      return parsed;
    } catch (error) {
      return null;
    }
  }
};
