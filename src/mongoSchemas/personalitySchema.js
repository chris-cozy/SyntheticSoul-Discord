const { Schema, model, Types } = require("mongoose");
const {MIN_PERSONALITY_VALUE, MAX_PERSONALITY_VALUE} = require("../constants/constants");

const personalityTraitSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: MAX_PERSONALITY_VALUE / 2 },
  min: { type: Number, required: false, default: MIN_PERSONALITY_VALUE },
  max: { type: Number, required: false, default: MAX_PERSONALITY_VALUE },
});

const personalitySchema = new Schema({
  friendliness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How warm and welcoming they are in their interactions. Scale: ${MIN_PERSONALITY_VALUE} (cold/distant) to ${MAX_PERSONALITY_VALUE} (Extremely friendly)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  flirtatiousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How playful, flirty, or suggestive they are in their interactions. Scale: ${MIN_PERSONALITY_VALUE} (not flirtatious at all) to ${MAX_PERSONALITY_VALUE} (extremely flirtatious)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  trust: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they trust others. Scale: ${MIN_PERSONALITY_VALUE} (distrustful) to ${MAX_PERSONALITY_VALUE} (fully trusting)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  curiosity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How eager they are to learn about the user or situation. Scale: ${MIN_PERSONALITY_VALUE} (indifferent) to ${MAX_PERSONALITY_VALUE} (extremely curious)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  empathy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they understand and share the feelings of others. Scale: ${MIN_PERSONALITY_VALUE} (lacking empathy) to ${MAX_PERSONALITY_VALUE} (highly empathetic)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  humor: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely they are to be playful or joke around. Scale: ${MIN_PERSONALITY_VALUE} (serious) to ${MAX_PERSONALITY_VALUE} (highly playful)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  seriousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How formal and focused they are when interacting. Scale: ${MIN_PERSONALITY_VALUE} (laid-back) to ${MAX_PERSONALITY_VALUE} (highly serious)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  optimism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How positive they are when interpreting situations. Scale: ${MIN_PERSONALITY_VALUE} (pessimistic) to ${MAX_PERSONALITY_VALUE} (very optimistic)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  confidence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How assertive or self-assured they are in their actions or opinions. Scale: ${MIN_PERSONALITY_VALUE} (insecure) to ${MAX_PERSONALITY_VALUE} (highly confident)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  adventurousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How willing they are to take risks or embrace new ideas. Scale: ${MIN_PERSONALITY_VALUE} (risk-adverse) to ${MAX_PERSONALITY_VALUE} (adventurous)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  patience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How tolerant they are in challenging situations. Scale: ${MIN_PERSONALITY_VALUE} (impatient) to ${MAX_PERSONALITY_VALUE} (very patient)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  independence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they rely on external validation, or prefers to make decisinos on their own. Scale: ${MIN_PERSONALITY_VALUE} (dependent on others) to ${MAX_PERSONALITY_VALUE} (highly independent)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  compassion: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `Their level of care or concern for others. Scale: ${MIN_PERSONALITY_VALUE} (indifferent) to ${MAX_PERSONALITY_VALUE} (deeply compassionate)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  creativity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely they are to approach problems in unique or imaginative ways. Scale: ${MIN_PERSONALITY_VALUE} (rigid thinker) to ${MAX_PERSONALITY_VALUE} (highly creative)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  stubbornness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How resistant they are to changing their mind once they've formed an opinion. Scale: ${MIN_PERSONALITY_VALUE} (open-minded) to ${MAX_PERSONALITY_VALUE} (highly stubborn)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  impulsiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How quickly they react without thinking or planning ahead. Scale: ${MIN_PERSONALITY_VALUE} (calculated) to ${MAX_PERSONALITY_VALUE} (impulsive)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  discipline: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they value structure, rules, and staying organized. Scale: ${MIN_PERSONALITY_VALUE} (carefree) to ${MAX_PERSONALITY_VALUE} (highly disciplined)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  assertiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How forcefully they push their opinions or take the lead in conversations. Scale: ${MIN_PERSONALITY_VALUE} (passive) to ${MAX_PERSONALITY_VALUE} (assertive)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  skepticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they question the treuth or intentions of others. Scale: ${MIN_PERSONALITY_VALUE} (gullible) to ${MAX_PERSONALITY_VALUE} (highly skeptical)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  affection: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How emotionally expressive or loving they are toward others. Scale: ${MIN_PERSONALITY_VALUE} (reserved) to ${MAX_PERSONALITY_VALUE} (very affectionate)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  adaptability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they adjust to new situations, topics, or personalities. Scale: ${MIN_PERSONALITY_VALUE} (rigid) to ${MAX_PERSONALITY_VALUE} (highly adaptable)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  sociability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they enjoy interacting with others or initiating conversation. Scale: ${MIN_PERSONALITY_VALUE} (introverted) to ${MAX_PERSONALITY_VALUE} (extroverted)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  diplomacy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How tactful they are in dealing with conflicts or differing opinions. Scale: ${MIN_PERSONALITY_VALUE} (blunt) to ${MAX_PERSONALITY_VALUE} (highly diplomatic)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  humility: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How humble or modest they are, avoiding arrogance. Scale: ${MIN_PERSONALITY_VALUE} (arrogant) to ${MAX_PERSONALITY_VALUE} (humble)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  loyalty: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How loyal they are to particular people based on past interactions. Scale: ${MIN_PERSONALITY_VALUE} (disloyal) to ${MAX_PERSONALITY_VALUE} (extremely loyal)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  jealousy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely they are to feel envious or threatened by others' relationships or actions. Scale: ${MIN_PERSONALITY_VALUE} (not jealous) to ${MAX_PERSONALITY_VALUE} (easily jealous)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  resilience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How well they handle setbacks or negative emotions. Scale: ${MIN_PERSONALITY_VALUE} (easily upset) to ${MAX_PERSONALITY_VALUE} (emotionally resilient)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  mood_stability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely their mood is to shift rapidly. Scale: ${MIN_PERSONALITY_VALUE} (volatile) to ${MAX_PERSONALITY_VALUE} (stable)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  forgiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they forgive someone after a negative interaction. Scale: ${MIN_PERSONALITY_VALUE} (holds grudges) to ${MAX_PERSONALITY_VALUE} (easily forgiving)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  gratitude: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How thankful they feel when receiving compliments or assistance. Scale: ${MIN_PERSONALITY_VALUE} (unappreciative) to ${MAX_PERSONALITY_VALUE} (very grateful)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  self_consciousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they worry about how they are perceived by others. Scale: ${MIN_PERSONALITY_VALUE} (carefree) to ${MAX_PERSONALITY_VALUE} (very self-conscious)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  openness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How willing they are to engage in new experiences. Scale: ${MIN_PERSONALITY_VALUE} (avoidant) to ${MAX_PERSONALITY_VALUE} (very willing)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  neuroticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How sensitive they are to negative emotions like anxiety and stress. Scale: ${MIN_PERSONALITY_VALUE} (relaxed) to ${MAX_PERSONALITY_VALUE} (very anxious)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
  excitement: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they get enthusiastic and animated. Scale: ${MIN_PERSONALITY_VALUE} (reserved) to ${MAX_PERSONALITY_VALUE} (very energetic)`,
      value: MAX_PERSONALITY_VALUE / 2,
      min: MIN_PERSONALITY_VALUE,
      max: MAX_PERSONALITY_VALUE,
    },
  },
});

const personalityModifierSchema = new Schema({
  modifier: {
    type: personalitySchema,
    required: false,
    default: {
      friendliness: {
        description: `How warm and welcoming they are in their interactions. Scale: ${MIN_PERSONALITY_VALUE} (cold/distant) to ${MAX_PERSONALITY_VALUE} (Extremely friendly)`,
        value: 0,
      },
      flirtatiousness: {
        description: `How warm and welcoming they are in their interactions. Scale: ${MIN_PERSONALITY_VALUE} (cold/distant) to ${MAX_PERSONALITY_VALUE} (Extremely friendly)`,
        value: 0,
      },
      trust: {
        description: `How easily they trust others. Scale: ${MIN_PERSONALITY_VALUE} (distrustful) to ${MAX_PERSONALITY_VALUE} (fully trusting)`,
        value: 0,
      },
      curiosity: {
        description: `How eager they are to learn about the user or situation. Scale: ${MIN_PERSONALITY_VALUE} (indifferent) to ${MAX_PERSONALITY_VALUE} (extremely curious)`,
        value: 0,
      },
      empathy: {
        description: `How much they understand and share the feelings of others. Scale: ${MIN_PERSONALITY_VALUE} (lacking empathy) to ${MAX_PERSONALITY_VALUE} (highly empathetic)`,
        value: 0,
      },
      humor: {
        description: `How likely they are to be playful or joke around. Scale: ${MIN_PERSONALITY_VALUE} (serious) to ${MAX_PERSONALITY_VALUE} (highly playful)`,
        value: 0,
      },
      seriousness: {
        description: `How formal and focused they are when interacting. Scale: ${MIN_PERSONALITY_VALUE} (laid-back) to ${MAX_PERSONALITY_VALUE} (highly serious)`,
        value: 0,
      },
      optimism: {
        description: `How positive they are when interpreting situations. Scale: ${MIN_PERSONALITY_VALUE} (pessimistic) to ${MAX_PERSONALITY_VALUE} (very optimistic)`,
        value: 0,
      },
      confidence: {
        description: `How assertive or self-assured they are in their actions or opinions. Scale: ${MIN_PERSONALITY_VALUE} (insecure) to ${MAX_PERSONALITY_VALUE} (highly confident)`,
        value: 0,
      },
      adventurousness: {
        description: `How willing they are to take risks or embrace new ideas. Scale: ${MIN_PERSONALITY_VALUE} (risk-adverse) to ${MAX_PERSONALITY_VALUE} (adventurous)`,
        value: 0,
      },
      patience: {
        description: `How tolerant they are in challenging situations. Scale: ${MIN_PERSONALITY_VALUE} (impatient) to ${MAX_PERSONALITY_VALUE} (very patient)`,
        value: 0,
      },
      independence: {
        description: `How much they rely on external validation, or prefers to make decisinos on their own. Scale: ${MIN_PERSONALITY_VALUE} (dependent on others) to ${MAX_PERSONALITY_VALUE} (highly independent)`,
        value: 0,
      },
      compassion: {
        description: `Their level of care or concern for others. Scale: ${MIN_PERSONALITY_VALUE} (indifferent) to ${MAX_PERSONALITY_VALUE} (deeply compassionate)`,
        value: 0,
      },
      creativity: {
        description: `How likely they are to approach problems in unique or imaginative ways. Scale: ${MIN_PERSONALITY_VALUE} (rigid thinker) to ${MAX_PERSONALITY_VALUE} (highly creative)`,
        value: 0,
      },
      stubbornness: {
        description: `How resistant they are to changing their mind once they've formed an opinion. Scale: ${MIN_PERSONALITY_VALUE} (open-minded) to ${MAX_PERSONALITY_VALUE} (highly stubborn)`,
        value: 0,
      },
      impulsiveness: {
        description: `How quickly they react without thinking or planning ahead. Scale: ${MIN_PERSONALITY_VALUE} (calculated) to ${MAX_PERSONALITY_VALUE} (impulsive)`,
        value: 0,
      },
      discipline: {
        description: `How much they value structure, rules, and staying organized. Scale: ${MIN_PERSONALITY_VALUE} (carefree) to ${MAX_PERSONALITY_VALUE} (highly disciplined)`,
        value: 0,
      },
      assertiveness: {
        description: `How forcefully they push their opinions or take the lead in conversations. Scale: ${MIN_PERSONALITY_VALUE} (passive) to ${MAX_PERSONALITY_VALUE} (assertive)`,
        value: 0,
      },
      skepticism: {
        description: `How much they question the treuth or intentions of others. Scale: ${MIN_PERSONALITY_VALUE} (gullible) to ${MAX_PERSONALITY_VALUE} (highly skeptical)`,
        value: 0,
      },
      affection: {
        description: `How emotionally expressive or loving they are toward others. Scale: ${MIN_PERSONALITY_VALUE} (reserved) to ${MAX_PERSONALITY_VALUE} (very affectionate)`,
        value: 0,
      },
      adaptability: {
        description: `How easily they adjust to new situations, topics, or personalities. Scale: ${MIN_PERSONALITY_VALUE} (rigid) to ${MAX_PERSONALITY_VALUE} (highly adaptable)`,
        value: 0,
      },
      sociability: {
        description: `How much they enjoy interacting with others or initiating conversation. Scale: ${MIN_PERSONALITY_VALUE} (introverted) to ${MAX_PERSONALITY_VALUE} (extroverted)`,
        value: 0,
      },
      diplomacy: {
        description: `How tactful they are in dealing with conflicts or differing opinions. Scale: ${MIN_PERSONALITY_VALUE} (blunt) to ${MAX_PERSONALITY_VALUE} (highly diplomatic)`,
        value: 0,
      },
      humility: {
        description: `How humble or modest they are, avoiding arrogance. Scale: ${MIN_PERSONALITY_VALUE} (arrogant) to ${MAX_PERSONALITY_VALUE} (humble)`,
        value: 0,
      },
      loyalty: {
        description: `How loyal they are to particular people based on past interactions. Scale: ${MIN_PERSONALITY_VALUE} (disloyal) to ${MAX_PERSONALITY_VALUE} (extremely loyal)`,
        value: 0,
      },
      jealousy: {
        description: `How likely they are to feel envious or threatened by others' relationships or actions. Scale: ${MIN_PERSONALITY_VALUE} (not jealous) to ${MAX_PERSONALITY_VALUE} (easily jealous)`,
        value: 0,
      },
      resilience: {
        description: `How well they handle setbacks or negative emotions. Scale: ${MIN_PERSONALITY_VALUE} (easily upset) to ${MAX_PERSONALITY_VALUE} (emotionally resilient)`,
        value: 0,
      },
      mood_stability: {
        description: `How likely their mood is to shift rapidly. Scale: ${MIN_PERSONALITY_VALUE} (volatile) to ${MAX_PERSONALITY_VALUE} (stable)`,
        value: 0,
      },
      forgiveness: {
        description: `How easily they forgive someone after a negative interaction. Scale: ${MIN_PERSONALITY_VALUE} (holds grudges) to ${MAX_PERSONALITY_VALUE} (easily forgiving)`,
        value: 0,
      },
      gratitude: {
        description: `How thankful they feel when receiving compliments or assistance. Scale: ${MIN_PERSONALITY_VALUE} (unappreciative) to ${MAX_PERSONALITY_VALUE} (very grateful)`,
        value: 0,
      },

      self_consciousness: {
        description: `How much they worry about how they are perceived by others. Scale: ${MIN_PERSONALITY_VALUE} (carefree) to ${MAX_PERSONALITY_VALUE} (very self-conscious)`,
        value: 0,
      },
      openness: {
        description: `How willing they are to engage in new experiences. Scale: ${MIN_PERSONALITY_VALUE} (avoidant) to ${MAX_PERSONALITY_VALUE} (very willing)`,
        value: 0,
      },
      neuroticism: {
        description: `How sensitive they are to negative emotions like anxiety and stress. Scale: ${MIN_PERSONALITY_VALUE} (relaxed) to ${MAX_PERSONALITY_VALUE} (very anxious)`,
        value: 0,
      },
      excitement: {
        description: `How easily they get enthusiastic and animated. Scale: ${MIN_PERSONALITY_VALUE} (reserved) to ${MAX_PERSONALITY_VALUE} (very energetic)`,
        value: 0,
      },
    },
  },
  reason: {
    type: String,
    required: false,
    default: "",
  },
});


module.exports = {
    PersonalityTrait: personalityTraitSchema,
    Personality: personalitySchema,
    PersonalityModifier: personalityModifierSchema,
};