const { Schema, model, Types } = require("mongoose");

const personalityTraitSchema = new Schema({
  description: { type: String, required: true }, // Description of the tra
  value: { type: Number, required: false, default: 5 }, // Base value
  min: { type: Number, required: false, default: 1 }, // Set minimum scale
  max: { type: Number, required: false, default: 10 }, // Set maximum scale
});

const personalitySchema = new Schema({
  friendliness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How warm and welcoming they are in their interactions. Scale: low (cold/distant) to high (Extremely friendly)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  trust: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How easily they trust others. Scale: low (distrustful) to high (fully trusting)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  curiosity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How eager they are to learn about the user or situation. Scale: low (indifferent) to high (extremely curious)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  empathy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they understand and share the feelings of others. Scale: low (lacking empathy) to high (highly empathetic)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  humor: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely they are to be playful or joke around. Scale: low (serious) to high (highly playful)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  seriousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How formal and focused they are when interacting. Scale: low (laid-back) to high (highly serious)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  optimism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How positive they are when interpreting situations. Scale: low (pessimistic) to high (very optimistic)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  confidence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How assertive or self-assured they are in their actions or opinions. Scale: low (insecure) to high (highly confident)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  adventurousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How willing they are to take risks or embrace new ideas. Scale: low (risk-adverse) to high (adventurous)",
      value: 5,
      min: 1,
      max: 10
    }
  },
  patience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How tolerant they are in challenging situations. Scale: low (impatient) to high (very patient)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  independence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they rely on external validation, or prefer to make decisions on their own. Scale: low (dependent on others) to high (highly independent)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  compassion: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "Their level of care or concern for others. Scale: low (indifferent) to high (deeply compassionate)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  creativity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely they are to approach problems in unique or imaginative ways. Scale: low (rigid thinker) to high (highly creative)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  stubbornness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How resistant they are to changing their mind once they've formed an opinion. Scale: low (open-minded) to high (highly stubborn)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  impulsiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How quickly they react without thinking or planning ahead. Scale: low (calculated) to high (impulsive)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  discipline: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they value structure, rules, and staying organized. Scale: low (carefree) to high (highly disciplined)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  assertiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How forcefully they push their opinions or take the lead in conversations. Scale: low (passive) to high (assertive)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  skepticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they question the truth or intentions of others. Scale: low (gullible) to high (highly skeptical)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  affection: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How emotionally expressive or loving they are toward others. Scale: low (reserved) to high (very affectionate)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  adaptability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How easily they adjust to new situations, topics, or personalities. Scale: low (rigid) to high (highly adaptable)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  sociability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How much they enjoy interacting with others or initiating conversation. Scale: low (introverted) to high (extroverted)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  diplomacy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How tactful they are in dealing with conflicts or differing opinions. Scale: low (blunt) to high (highly diplomatic)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  humility: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How humble or modest they are, avoiding arrogance. Scale: low (arrogant) to high (humble)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  loyalty: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How loyal they are to particular people based on past interactions. Scale: low (disloyal) to high (extremely loyal)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  jealousy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely they are to feel envious or threatened by others' relationships or actions. Scale: low (not jealous) to high (easily jealous)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  resilience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How well they handle setbacks or negative emotions. Scale: low (easily upset) to high (emotionally resilient)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  mood_stability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description:
        "How likely their mood is to shift rapidly. Scale: low (volatile) to high (stable)",
        value: 5,
      min: 1,
      max: 10
    }
  },
  forgiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How easily they forgive someone after a negative interaction. Scale: low (holds grudges) to high (easily forgiving)",
          value: 5,
        min: 1,
        max: 10,
      }
  },
  gratitude: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How thankful they feel when receiving compliments or assistance. Scale: low (unappreciative) to high (very grateful)",
          value: 5,
        min: 1,
        max: 10,
      }
  },
  self_consciousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How much they worry about how they are perceived by others. Scale: low (carefree) to high (very self-conscious)",
          value: 5,
          min: 1,
          max: 10,
      }
  },
  openness: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How willing they are to engage in new experiences. Scale: low (avoidant) to high (very willing)",
          value: 5,
        min: 1,
        max: 10,
      }
  },
  neuroticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How sensitive they are to negative emotions like anxiety and stress. Scale: low (relaxed) to high (very anxious)",
          value: 5,
        min: 1,
        max: 10,
      }
  },
  excitement: {
    type: personalityTraitSchema,
    required: false,
    default: {
        description:
          "How easily they get enthusiastic and animated. Scale: low (reserved) to high (very energetic)",
          value: 5,
        min: 1,
        max: 10,
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
