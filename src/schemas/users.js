const { Schema, model, Types } = require("mongoose");

const minPersonalityValue = 0;
const maxPersonalityValue = 10;

const personalityTraitSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: (maxPersonalityValue/2) },
  min: { type: Number, required: false, default: minPersonalityValue },
  max: { type: Number, required: false, default: maxPersonalityValue },
});

const personalitySchema = new Schema({
  friendliness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How warm and welcoming they are in their interactions. Scale: low (cold/distant) to high (Extremely friendly)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  trust: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How easily they trust others. Scale: low (distrustful) to high (fully trusting)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  curiosity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How eager they are to learn about the user or situation. Scale: low (indifferent) to high (extremely curious)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  empathy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they understand and share the feelings of others. Scale: low (lacking empathy) to high (highly empathetic)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  humor: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely they are to be playful or joke around. Scale: low (serious) to high (highly playful)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  seriousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How formal and focused they are when interacting. Scale: low (laid-back) to high (highly serious)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  optimism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How positive they are when interpreting situations. Scale: low (pessimistic) to high (very optimistic)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  confidence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How assertive or self-assured they are in their actions or opinions. Scale: low (insecure) to high (highly confident)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  adventurousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How willing they are to take risks or embrace new ideas. Scale: low (risk-adverse) to high (adventurous)",
      value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  patience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How tolerant they are in challenging situations. Scale: low (impatient) to high (very patient)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  independence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they rely on external validation, or prefer to make decisions on their own. Scale: low (dependent on others) to high (highly independent)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  compassion: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "Their level of care or concern for others. Scale: low (indifferent) to high (deeply compassionate)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  creativity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely they are to approach problems in unique or imaginative ways. Scale: low (rigid thinker) to high (highly creative)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  stubbornness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How resistant they are to changing their mind once they've formed an opinion. Scale: low (open-minded) to high (highly stubborn)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  impulsiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How quickly they react without thinking or planning ahead. Scale: low (calculated) to high (impulsive)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  discipline: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they value structure, rules, and staying organized. Scale: low (carefree) to high (highly disciplined)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  assertiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How forcefully they push their opinions or take the lead in conversations. Scale: low (passive) to high (assertive)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  skepticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they question the truth or intentions of others. Scale: low (gullible) to high (highly skeptical)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  affection: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How emotionally expressive or loving they are toward others. Scale: low (reserved) to high (very affectionate)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  adaptability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How easily they adjust to new situations, topics, or personalities. Scale: low (rigid) to high (highly adaptable)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  sociability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they enjoy interacting with others or initiating conversation. Scale: low (introverted) to high (extroverted)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  diplomacy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How tactful they are in dealing with conflicts or differing opinions. Scale: low (blunt) to high (highly diplomatic)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  humility: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How humble or modest they are, avoiding arrogance. Scale: low (arrogant) to high (humble)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  loyalty: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How loyal they are to particular people based on past interactions. Scale: low (disloyal) to high (extremely loyal)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  jealousy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely they are to feel envious or threatened by others' relationships or actions. Scale: low (not jealous) to high (easily jealous)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  resilience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How well they handle setbacks or negative emotions. Scale: low (easily upset) to high (emotionally resilient)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  mood_stability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely their mood is to shift rapidly. Scale: low (volatile) to high (stable)",
        value: (maxPersonalityValue/2),
      min: minPersonalityValue,
      max: maxPersonalityValue
    }
  },
  forgiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How easily they forgive someone after a negative interaction. Scale: low (holds grudges) to high (easily forgiving)",
          value: (maxPersonalityValue/2),
        min: minPersonalityValue,
        max: maxPersonalityValue,
      }
  },
  gratitude: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How thankful they feel when receiving compliments or assistance. Scale: low (unappreciative) to high (very grateful)",
          value: (maxPersonalityValue/2),
        min: minPersonalityValue,
        max: maxPersonalityValue,
      }
  },
  self_consciousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How much they worry about how they are perceived by others. Scale: low (carefree) to high (very self-conscious)",
          value: (maxPersonalityValue/2),
          min: minPersonalityValue,
          max: maxPersonalityValue,
      }
  },
  openness: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How willing they are to engage in new experiences. Scale: low (avoidant) to high (very willing)",
          value: (maxPersonalityValue/2),
        min: minPersonalityValue,
        max: maxPersonalityValue,
      }
  },
  neuroticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How sensitive they are to negative emotions like anxiety and stress. Scale: low (relaxed) to high (very anxious)",
          value: (maxPersonalityValue/2),
        min: minPersonalityValue,
        max: maxPersonalityValue,
      }
  },
  excitement: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How easily they get enthusiastic and animated. Scale: low (reserved) to high (very energetic)",
          value: (maxPersonalityValue/2),
        min: minPersonalityValue,
        max: maxPersonalityValue,
      }
  },
});

const emotionSchema = new Schema({
  emotion_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  emotion: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const activitySchema = new Schema({
  name: {
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: false,
  },
  start_time: {
    type: Date,
    required: false,
    default: new Date(),
  }
});

const memorySchema = new Schema({
  memory_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  event: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const sentimentSchema = new Schema({
  sentiment_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  sentiment: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const selfSchema = new Schema({
  self_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  personality_matrix: {
    type: personalitySchema,
    required: false,
    default: {}
  },
  memory_profile: {
    type: [memorySchema],
    required: false,
    default: [],
  },
  emotional_status: {
    type: emotionSchema,
    required: false,
    default: {
      emotion: "neutral",
      reason: "I have just been created, and have no experiences",
      intensity: 5,
      timestamp: new Date(),
    }
  },
  activity_status: {
    type: activitySchema,
    required: false,
    default: {
      name: "Simply existing.",
      category: "custom",
    }
  }
});

/**
 * Mongoose database schema for user data
 */
const userSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  discord_id: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: false,
    default: "I don't know anything about this person yet.",
  },
  personality_modifier: {
    type: personalitySchema,
    required: false,
    default: {
      friendliness: {
            description:
              "How warm and welcoming they are in their interactions. Scale: low (cold/distant) to high (Extremely friendly)",
              value: 0,
          },
      trust: {
            description:
              "How easily they trust others. Scale: low (distrustful) to high (fully trusting)",
              value: 0,
          },
      curiosity: {
            description:
              "How eager they are to learn about the user or situation. Scale: low (indifferent) to high (extremely curious)",
              value: 0,
          },
      empathy: {
            description:
              "How much they understand and share the feelings of others. Scale: low (lacking empathy) to high (highly empathetic)",
              value: 0,
          },
      humor: {
            description:
              "How likely they are to be playful or joke around. Scale: low (serious) to high (highly playful)",
              value: 0,
          },
      seriousness: {
            description:
              "How formal and focused they are when interacting. Scale: low (laid-back) to high (highly serious)",
              value: 0,
          },
      optimism: {
            description:
              "How positive they are when interpreting situations. Scale: low (pessimistic) to high (very optimistic)",
              value: 0,
          },
      confidence: {
            description:
              "How assertive or self-assured they are in their actions or opinions. Scale: low (insecure) to high (highly confident)",
              value: 0,
          },
      adventurousness: {
            description:
              "How willing they are to take risks or embrace new ideas. Scale: low (risk-adverse) to high (adventurous)",
              value: 0,
          },
      patience: {
            description:
              "How tolerant they are in challenging situations. Scale: low (impatient) to high (very patient)",
              value: 0,
          },
      independence: {
            description:
              "How much they rely on external validation, or prefers to make decisinos on their own. Scale: low (dependent on others) to high (highly independent)",
              value: 0,
          },
      compassion: {
            description:
              "Their level of care or concern for others. Scale: low (indifferent) to high (deeply compassionate)",
              value: 0,
          },
      creativity: {
            description:
              "How likely they are to approach problems in unique or imaginative ways. Scale: low (rigid thinker) to high (highly creative)",
              value: 0,
          },
      stubbornness: {
            description:
              "How resistant they are to changing their mind once they've formed an opinion. Scale: low (open-minded) to high (highly stubborn)",
              value: 0,
          },
      impulsiveness: {
            description:
              "How quickly they react without thinking or planning ahead. Scale: low (calculated) to high (impulsive)",
              value: 0,
          },
      discipline: {
            description:
              "How much they value structure, rules, and staying organized. Scale: low (carefree) to high (highly disciplined)",
              value: 0,
          },
      assertiveness: {
            description:
              "How forcefully they push their opinions or take the lead in conversations. Scale: low (passive) to high (assertive)",
              value: 0,
          },
      skepticism: {
            description:
              "How much they question the treuth or intentions of others. Scale: low (gullible) to high (highly skeptical)",
              value: 0,
          },
      affection: {
            description:
              "How emotionally expressive or loving they are toward others. Scale: low (reserved) to high (very affectionate)",
              value: 0,
          },
      adaptability: {
            description:
              "How easily they adjust to new situations, topics, or personalities. Scale: low (rigid) to high (highly adaptable)",
              value: 0,
          },
      sociability: {
            description:
              "How much they enjoy interacting with others or initiating conversation. Scale: low (introverted) to high (extroverted)",
              value: 0,
          },
      diplomacy: {
            description:
              "How tactful they are in dealing with conflicts or differing opinions. Scale: low (blunt) to high (highly diplomatic)",
              value: 0,
          },
      humility: {
            description:
              "How humble or modest they are, avoiding arrogance. Scale: low (arrogant) to high (humble)",
              value: 0,
          },
      loyalty: {
            description:
              "How loyal they are to particular people based on past interactions. Scale: low (disloyal) to high (extremely loyal)",
              value: 0,
          },
      jealousy: {
            description:
              "How likely they are to feel envious or threatened by others' relationships or actions. Scale: low (not jealous) to high (easily jealous)",
              value: 0,
          },
      resilience: {
            description:
              "How well they handle setbacks or negative emotions. Scale: low (easily upset) to high (emotionally resilient)",
              value: 0,
          },
      mood_stability: {
            description:
              "How likely their mood is to shift rapidly. Scale: low (volatile) to high (stable)",
              value: 0,
          },
      forgiveness: {
            description:
              "How easily they forgive someone after a negative interaction. Scale: low (holds grudges) to high (easily forgiving)",
              value: 0,
          },
      gratitude: {
            description:
              "How thankful they feel when receiving compliments or assistance. Scale: low (unappreciative) to high (very grateful)",
              value: 0,
          },
      
      self_consciousness: {
            description:
              "How much they worry about how they are perceived by others. Scale: low (carefree) to high (very self-conscious)",
              value: 0,
          },
      openness: {
            description:
              "How willing they are to engage in new experiences. Scale: low (avoidant) to high (very willing)",
              value: 0,
          },
      neuroticism: {
            description:
              "How sensitive they are to negative emotions like anxiety and stress. Scale: low (relaxed) to high (very anxious)",
              value: 0,
          },
      excitement: {
            description:
              "How easily they get enthusiastic and animated. Scale: low (reserved) to high (very energetic)",
              value: 0,
          },
    }
  },
  memory_profile: {
    type: [memorySchema],
    required: false,
    default: [],
  },
  sentiment: {
    type: sentimentSchema,
    required: false,
    default: {
      sentiment: "neutral",
      thoughts: "I don't know anything about this person yet.",
      timestamp: new Date(),
    }
  },
});



module.exports = {
  Users: model("users", userSchema),
  Memories: model("memories", memorySchema),
  Sentiments: model("sentiments", sentimentSchema),
  Emotions: model("emotions", emotionSchema),
  Self: model("selves", selfSchema),
  Personality: model("personalities", personalitySchema),
  PersonalityTrait: model("personality_traits", personalityTraitSchema),
  Activity: model("activity", activitySchema),
};
