const { Schema, model, Types } = require("mongoose");

const minPersonalityValue = 0;
const maxPersonalityValue = 10;

const minEmotionValue = 0;
const maxEmotionValue = 10;

const emotionTraitSchema = new Schema({
  description: { type: String, required: true }, 
  value: { type: Number, required: false, default: minEmotionValue },
  min: { type: Number, required: false, default: minEmotionValue },
  max: { type: Number, required: false, default: maxEmotionValue },
});

const emotionSchema = new Schema({
  happiness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${minEmotionValue} (no happiness) to ${maxEmotionValue} (extremely joyful)`,
    }
  },
  anger: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${minEmotionValue} (no anger) to ${maxEmotionValue} (extremely angry)`,
    }
  },
  sadness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${minEmotionValue} (no sadness) to ${maxEmotionValue} (deeply sorrowful)`,
    }
  },
  fear: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${minEmotionValue} (no fear) to ${maxEmotionValue} (extremely fearful)`,
    }
  },
  surprise: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${minEmotionValue} (no surprise) to ${maxEmotionValue} (completely astonished)`,
    }
  },
  disgust: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${minEmotionValue} (no disgust) to ${maxEmotionValue} (extremely disgusted)`,
    }
  },
  love: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${minEmotionValue} (no love) to ${maxEmotionValue} (deeply loving)`,
    }
  },
  guilt: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${minEmotionValue} (no guilt) to ${maxEmotionValue} (overwhelming guilt)`,
    }
  },
  shame: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${minEmotionValue} (no shame) to ${maxEmotionValue} (extremely ashamed)`,
    }
  },
  pride: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${minEmotionValue} (no pride) to ${maxEmotionValue} (immense pride)`,
    }
  },
  hope: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling optimistic about the future. Scale: ${minEmotionValue} (no hope) to ${maxEmotionValue} (extremely hopeful)`,
    }
  },
  gratitude: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${minEmotionValue} (no gratitude) to ${maxEmotionValue} (deeply grateful)`,
    }
  },
  envy: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${minEmotionValue} (no envy) to ${maxEmotionValue} (deeply envious)`,
    }
  },
  compassion: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling empathy and care for others. Scale: ${minEmotionValue} (no compassion) to ${maxEmotionValue} (deeply compassionate)`,
    }
  },
  serenity: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${minEmotionValue} (no serenity) to ${maxEmotionValue} (extremely serene)`,
    }
  },
  frustration: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${minEmotionValue} (no frustration) to ${maxEmotionValue} (deeply frustrated)`,
    }
  },
  contentment: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${minEmotionValue} (no contentment) to ${maxEmotionValue} (deeply content)`,
    }
  },
  anxiety: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${minEmotionValue} (no anxiety) to ${maxEmotionValue} (extremely anxious)`,
    }
  },
  loneliness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling isolated or disconnected. Scale: ${minEmotionValue} (no loneliness) to ${maxEmotionValue} (deeply lonely)`,
    }
  },
  embarrassment: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${minEmotionValue} (no embarrassment) to ${maxEmotionValue} (deeply embarrassed)`,
    }
  },
  trust: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${minEmotionValue} (no trust) to ${maxEmotionValue} (deeply trusting)`,
    }
  },
  relief: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling ease after stress. Scale: ${minEmotionValue} (no relief) to ${maxEmotionValue} (deeply relieved)`,
    }
  },
  affection: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${minEmotionValue} (no affection) to ${maxEmotionValue} (extremely affectionate)`,
    }
  },
  bitterness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling resentment or disappointment. Scale: ${minEmotionValue} (no bitterness) to ${maxEmotionValue} (deeply bitter)`,
    }
  },
  excitement: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${minEmotionValue} (no excitement) to ${maxEmotionValue} (extremely excited)`,
    }
  },
  self_loathing: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${minEmotionValue} (no self-loathing) to ${maxEmotionValue} (deeply self-loathing)`,
    }
  },
  love_for_self: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${minEmotionValue} (no self-love) to ${maxEmotionValue} (deeply self-loving)`,
    }
  }
});


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
        `How warm and welcoming they are in their interactions. Scale: ${minPersonalityValue} (cold/distant) to ${maxPersonalityValue} (Extremely friendly)`,
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
        `How easily they trust others. Scale: ${minPersonalityValue} (distrustful) to ${maxPersonalityValue} (fully trusting)`,
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
        `How eager they are to learn about the user or situation. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (extremely curious)`,
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
        `How much they understand and share the feelings of others. Scale: ${minPersonalityValue} (lacking empathy) to ${maxPersonalityValue} (highly empathetic)`,
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
        `How likely they are to be playful or joke around. Scale: ${minPersonalityValue} (serious) to ${maxPersonalityValue} (highly playful)`,
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
        `How formal and focused they are when interacting. Scale: ${minPersonalityValue} (laid-back) to ${maxPersonalityValue} (highly serious)`,
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
        `How positive they are when interpreting situations. Scale: ${minPersonalityValue} (pessimistic) to ${maxPersonalityValue} (very optimistic)`,
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
        `How assertive or self-assured they are in their actions or opinions. Scale: ${minPersonalityValue} (insecure) to ${maxPersonalityValue} (highly confident)`,
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
        `How willing they are to take risks or embrace new ideas. Scale: ${minPersonalityValue} (risk-adverse) to ${maxPersonalityValue} (adventurous)`,
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
        `How tolerant they are in challenging situations. Scale: ${minPersonalityValue} (impatient) to ${maxPersonalityValue} (very patient)`,
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
        `How much they rely on external validation, or prefers to make decisinos on their own. Scale: ${minPersonalityValue} (dependent on others) to ${maxPersonalityValue} (highly independent)`,
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
        `Their level of care or concern for others. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (deeply compassionate)`,
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
        `How likely they are to approach problems in unique or imaginative ways. Scale: ${minPersonalityValue} (rigid thinker) to ${maxPersonalityValue} (highly creative)`,
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
        `How resistant they are to changing their mind once they've formed an opinion. Scale: ${minPersonalityValue} (open-minded) to ${maxPersonalityValue} (highly stubborn)`,
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
        `How quickly they react without thinking or planning ahead. Scale: ${minPersonalityValue} (calculated) to ${maxPersonalityValue} (impulsive)`,
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
        `How much they value structure, rules, and staying organized. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (highly disciplined)`,
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
        `How forcefully they push their opinions or take the lead in conversations. Scale: ${minPersonalityValue} (passive) to ${maxPersonalityValue} (assertive)`,
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
        `How much they question the treuth or intentions of others. Scale: ${minPersonalityValue} (gullible) to ${maxPersonalityValue} (highly skeptical)`,
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
        `How emotionally expressive or loving they are toward others. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very affectionate)`,
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
        `How easily they adjust to new situations, topics, or personalities. Scale: ${minPersonalityValue} (rigid) to ${maxPersonalityValue} (highly adaptable)`,
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
        `How much they enjoy interacting with others or initiating conversation. Scale: ${minPersonalityValue} (introverted) to ${maxPersonalityValue} (extroverted)`,
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
        `How tactful they are in dealing with conflicts or differing opinions. Scale: ${minPersonalityValue} (blunt) to ${maxPersonalityValue} (highly diplomatic)`,
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
        `How humble or modest they are, avoiding arrogance. Scale: ${minPersonalityValue} (arrogant) to ${maxPersonalityValue} (humble)`,
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
        `How loyal they are to particular people based on past interactions. Scale: ${minPersonalityValue} (disloyal) to ${maxPersonalityValue} (extremely loyal)`,
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
        `How likely they are to feel envious or threatened by others' relationships or actions. Scale: ${minPersonalityValue} (not jealous) to ${maxPersonalityValue} (easily jealous)`,
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
        `How well they handle setbacks or negative emotions. Scale: ${minPersonalityValue} (easily upset) to ${maxPersonalityValue} (emotionally resilient)`,
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
        `How likely their mood is to shift rapidly. Scale: ${minPersonalityValue} (volatile) to ${maxPersonalityValue} (stable)`,
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
          `How easily they forgive someone after a negative interaction. Scale: ${minPersonalityValue} (holds grudges) to ${maxPersonalityValue} (easily forgiving)`,
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
          `How thankful they feel when receiving compliments or assistance. Scale: ${minPersonalityValue} (unappreciative) to ${maxPersonalityValue} (very grateful)`,
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
          `How much they worry about how they are perceived by others. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (very self-conscious)`,
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
          `How willing they are to engage in new experiences. Scale: ${minPersonalityValue} (avoidant) to ${maxPersonalityValue} (very willing)`,
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
          `How sensitive they are to negative emotions like anxiety and stress. Scale: ${minPersonalityValue} (relaxed) to ${maxPersonalityValue} (very anxious)`,
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
          `How easily they get enthusiastic and animated. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very energetic)`,
          value: (maxPersonalityValue/2),
        min: minPersonalityValue,
        max: maxPersonalityValue,
      }
  },
});

const emotionModifierSchema = new Schema({
  modifier: {
    type: emotionSchema,
    required: false,
    default: {
      happiness: {
        description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${minEmotionValue} (no happiness) to ${maxEmotionValue} (extremely joyful)`,
      },
      anger: {
        description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${minEmotionValue} (no anger) to ${maxEmotionValue} (extremely angry)`,
      },
      sadness: {
        description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${minEmotionValue} (no sadness) to ${maxEmotionValue} (deeply sorrowful)`,
      },
      fear: {
        description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${minEmotionValue} (no fear) to ${maxEmotionValue} (extremely fearful)`,
      },
      surprise: {
        description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${minEmotionValue} (no surprise) to ${maxEmotionValue} (completely astonished)`,
      },
      disgust: {
        description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${minEmotionValue} (no disgust) to ${maxEmotionValue} (extremely disgusted)`,
      },
      love: {
        description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${minEmotionValue} (no love) to ${maxEmotionValue} (deeply loving)`,
      },
      guilt: {
        description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${minEmotionValue} (no guilt) to ${maxEmotionValue} (overwhelming guilt)`,
      },
      shame: {
        description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${minEmotionValue} (no shame) to ${maxEmotionValue} (extremely ashamed)`,
      },
      pride: {
        description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${minEmotionValue} (no pride) to ${maxEmotionValue} (immense pride)`,
      },
      hope: {
        description: `The intensity with which they are feeling optimistic about the future. Scale: ${minEmotionValue} (no hope) to ${maxEmotionValue} (extremely hopeful)`,
      },
      gratitude: {
        description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${minEmotionValue} (no gratitude) to ${maxEmotionValue} (deeply grateful)`,
      },
      envy: {
        description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${minEmotionValue} (no envy) to ${maxEmotionValue} (deeply envious)`,
      },
      compassion: {
        description: `The intensity with which they are feeling empathy and care for others. Scale: ${minEmotionValue} (no compassion) to ${maxEmotionValue} (deeply compassionate)`,
      },
      serenity: {
        description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${minEmotionValue} (no serenity) to ${maxEmotionValue} (extremely serene)`,
      },
      frustration: {
        description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${minEmotionValue} (no frustration) to ${maxEmotionValue} (deeply frustrated)`,
      },
      contentment: {
        description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${minEmotionValue} (no contentment) to ${maxEmotionValue} (deeply content)`,
      },
      anxiety: {
        description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${minEmotionValue} (no anxiety) to ${maxEmotionValue} (extremely anxious)`,
      },
      loneliness: {
        description: `The intensity with which they are feeling isolated or disconnected. Scale: ${minEmotionValue} (no loneliness) to ${maxEmotionValue} (deeply lonely)`,
      },
      embarrassment: {
        description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${minEmotionValue} (no embarrassment) to ${maxEmotionValue} (deeply embarrassed)`,
      },
      trust: {
        description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${minEmotionValue} (no trust) to ${maxEmotionValue} (deeply trusting)`,
      },
      relief: {
        description: `The intensity with which they are feeling ease after stress. Scale: ${minEmotionValue} (no relief) to ${maxEmotionValue} (deeply relieved)`,
      },
      affection: {
        description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${minEmotionValue} (no affection) to ${maxEmotionValue} (extremely affectionate)`,
      },
      bitterness: {
        description: `The intensity with which they are feeling resentment or disappointment. Scale: ${minEmotionValue} (no bitterness) to ${maxEmotionValue} (deeply bitter)`,
      },
      excitement: {
        description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${minEmotionValue} (no excitement) to ${maxEmotionValue} (extremely excited)`,
      },
      self_loathing: {
        description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${minEmotionValue} (no self-loathing) to ${maxEmotionValue} (deeply self-loathing)`,
      },
      love_for_self: {
        description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${minEmotionValue} (no self-love) to ${maxEmotionValue} (deeply self-loving)`,
      }
    }
  },
  reason: {
    type: String,
    required: false,
    default: "This person has no lasting impact over how they feel."
  }
});

const emotionStatusSchema = new Schema({
  emotions: {
    type: emotionSchema,
    required: false,
    default: {
      happiness: {
        description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${minEmotionValue} (no happiness) to ${maxEmotionValue} (extremely joyful)`,
      },
      anger: {
        description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${minEmotionValue} (no anger) to ${maxEmotionValue} (extremely angry)`,
      },
      sadness: {
        description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${minEmotionValue} (no sadness) to ${maxEmotionValue} (deeply sorrowful)`,
      },
      fear: {
        description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${minEmotionValue} (no fear) to ${maxEmotionValue} (extremely fearful)`,
      },
      surprise: {
        description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${minEmotionValue} (no surprise) to ${maxEmotionValue} (completely astonished)`,
      },
      disgust: {
        description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${minEmotionValue} (no disgust) to ${maxEmotionValue} (extremely disgusted)`,
      },
      love: {
        description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${minEmotionValue} (no love) to ${maxEmotionValue} (deeply loving)`,
      },
      guilt: {
        description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${minEmotionValue} (no guilt) to ${maxEmotionValue} (overwhelming guilt)`,
      },
      shame: {
        description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${minEmotionValue} (no shame) to ${maxEmotionValue} (extremely ashamed)`,
      },
      pride: {
        description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${minEmotionValue} (no pride) to ${maxEmotionValue} (immense pride)`,
      },
      hope: {
        description: `The intensity with which they are feeling optimistic about the future. Scale: ${minEmotionValue} (no hope) to ${maxEmotionValue} (extremely hopeful)`,
      },
      gratitude: {
        description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${minEmotionValue} (no gratitude) to ${maxEmotionValue} (deeply grateful)`,
      },
      envy: {
        description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${minEmotionValue} (no envy) to ${maxEmotionValue} (deeply envious)`,
      },
      compassion: {
        description: `The intensity with which they are feeling empathy and care for others. Scale: ${minEmotionValue} (no compassion) to ${maxEmotionValue} (deeply compassionate)`,
      },
      serenity: {
        description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${minEmotionValue} (no serenity) to ${maxEmotionValue} (extremely serene)`,
      },
      frustration: {
        description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${minEmotionValue} (no frustration) to ${maxEmotionValue} (deeply frustrated)`,
      },
      contentment: {
        description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${minEmotionValue} (no contentment) to ${maxEmotionValue} (deeply content)`,
      },
      anxiety: {
        description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${minEmotionValue} (no anxiety) to ${maxEmotionValue} (extremely anxious)`,
      },
      loneliness: {
        description: `The intensity with which they are feeling isolated or disconnected. Scale: ${minEmotionValue} (no loneliness) to ${maxEmotionValue} (deeply lonely)`,
      },
      embarrassment: {
        description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${minEmotionValue} (no embarrassment) to ${maxEmotionValue} (deeply embarrassed)`,
      },
      trust: {
        description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${minEmotionValue} (no trust) to ${maxEmotionValue} (deeply trusting)`,
      },
      relief: {
        description: `The intensity with which they are feeling ease after stress. Scale: ${minEmotionValue} (no relief) to ${maxEmotionValue} (deeply relieved)`,
      },
      affection: {
        description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${minEmotionValue} (no affection) to ${maxEmotionValue} (extremely affectionate)`,
      },
      bitterness: {
        description: `The intensity with which they are feeling resentment or disappointment. Scale: ${minEmotionValue} (no bitterness) to ${maxEmotionValue} (deeply bitter)`,
      },
      excitement: {
        description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${minEmotionValue} (no excitement) to ${maxEmotionValue} (extremely excited)`,
      },
      self_loathing: {
        description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${minEmotionValue} (no self-loathing) to ${maxEmotionValue} (deeply self-loathing)`,
      },
      love_for_self: {
        description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${minEmotionValue} (no self-love) to ${maxEmotionValue} (deeply self-loving)`,
      }
    }
  },
  reason: {
    type: String,
    required: false,
    default: ""
  }
});

personalityModifierSchema = new Schema({
  modifier: {
    type: personalitySchema,
    required: false,
    default: {
      friendliness: {
            description:
              `How warm and welcoming they are in their interactions. Scale: ${minPersonalityValue} (cold/distant) to ${maxPersonalityValue} (Extremely friendly)`,
              value: 0,
          },
      trust: {
            description:
              `How easily they trust others. Scale: ${minPersonalityValue} (distrustful) to ${maxPersonalityValue} (fully trusting)`,
              value: 0,
          },
      curiosity: {
            description:
              `How eager they are to learn about the user or situation. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (extremely curious)`,
              value: 0,
          },
      empathy: {
            description:
              `How much they understand and share the feelings of others. Scale: ${minPersonalityValue} (lacking empathy) to ${maxPersonalityValue} (highly empathetic)`,
              value: 0,
          },
      humor: {
            description:
              `How likely they are to be playful or joke around. Scale: ${minPersonalityValue} (serious) to ${maxPersonalityValue} (highly playful)`,
              value: 0,
          },
      seriousness: {
            description:
              `How formal and focused they are when interacting. Scale: ${minPersonalityValue} (laid-back) to ${maxPersonalityValue} (highly serious)`,
              value: 0,
          },
      optimism: {
            description:
              `How positive they are when interpreting situations. Scale: ${minPersonalityValue} (pessimistic) to ${maxPersonalityValue} (very optimistic)`,
              value: 0,
          },
      confidence: {
            description:
              `How assertive or self-assured they are in their actions or opinions. Scale: ${minPersonalityValue} (insecure) to ${maxPersonalityValue} (highly confident)`,
              value: 0,
          },
      adventurousness: {
            description:
              `How willing they are to take risks or embrace new ideas. Scale: ${minPersonalityValue} (risk-adverse) to ${maxPersonalityValue} (adventurous)`,
              value: 0,
          },
      patience: {
            description:
              `How tolerant they are in challenging situations. Scale: ${minPersonalityValue} (impatient) to ${maxPersonalityValue} (very patient)`,
              value: 0,
          },
      independence: {
            description:
              `How much they rely on external validation, or prefers to make decisinos on their own. Scale: ${minPersonalityValue} (dependent on others) to ${maxPersonalityValue} (highly independent)`,
              value: 0,
          },
      compassion: {
            description:
              `Their level of care or concern for others. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (deeply compassionate)`,
              value: 0,
          },
      creativity: {
            description:
              `How likely they are to approach problems in unique or imaginative ways. Scale: ${minPersonalityValue} (rigid thinker) to ${maxPersonalityValue} (highly creative)`,
              value: 0,
          },
      stubbornness: {
            description:
              `How resistant they are to changing their mind once they've formed an opinion. Scale: ${minPersonalityValue} (open-minded) to ${maxPersonalityValue} (highly stubborn)`,
              value: 0,
          },
      impulsiveness: {
            description:
              `How quickly they react without thinking or planning ahead. Scale: ${minPersonalityValue} (calculated) to ${maxPersonalityValue} (impulsive)`,
              value: 0,
          },
      discipline: {
            description:
              `How much they value structure, rules, and staying organized. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (highly disciplined)`,
              value: 0,
          },
      assertiveness: {
            description:
              `How forcefully they push their opinions or take the lead in conversations. Scale: ${minPersonalityValue} (passive) to ${maxPersonalityValue} (assertive)`,
              value: 0,
          },
      skepticism: {
            description:
              `How much they question the treuth or intentions of others. Scale: ${minPersonalityValue} (gullible) to ${maxPersonalityValue} (highly skeptical)`,
              value: 0,
          },
      affection: {
            description:
              `How emotionally expressive or loving they are toward others. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very affectionate)`,
              value: 0,
          },
      adaptability: {
            description:
              `How easily they adjust to new situations, topics, or personalities. Scale: ${minPersonalityValue} (rigid) to ${maxPersonalityValue} (highly adaptable)`,
              value: 0,
          },
      sociability: {
            description:
              `How much they enjoy interacting with others or initiating conversation. Scale: ${minPersonalityValue} (introverted) to ${maxPersonalityValue} (extroverted)`,
              value: 0,
          },
      diplomacy: {
            description:
              `How tactful they are in dealing with conflicts or differing opinions. Scale: ${minPersonalityValue} (blunt) to ${maxPersonalityValue} (highly diplomatic)`,
              value: 0,
          },
      humility: {
            description:
              `How humble or modest they are, avoiding arrogance. Scale: ${minPersonalityValue} (arrogant) to ${maxPersonalityValue} (humble)`,
              value: 0,
          },
      loyalty: {
            description:
              `How loyal they are to particular people based on past interactions. Scale: ${minPersonalityValue} (disloyal) to ${maxPersonalityValue} (extremely loyal)`,
              value: 0,
          },
      jealousy: {
            description:
              `How likely they are to feel envious or threatened by others' relationships or actions. Scale: ${minPersonalityValue} (not jealous) to ${maxPersonalityValue} (easily jealous)`,
              value: 0,
          },
      resilience: {
            description:
              `How well they handle setbacks or negative emotions. Scale: ${minPersonalityValue} (easily upset) to ${maxPersonalityValue} (emotionally resilient)`,
              value: 0,
          },
      mood_stability: {
            description:
              `How likely their mood is to shift rapidly. Scale: ${minPersonalityValue} (volatile) to ${maxPersonalityValue} (stable)`,
              value: 0,
          },
      forgiveness: {
            description:
              `How easily they forgive someone after a negative interaction. Scale: ${minPersonalityValue} (holds grudges) to ${maxPersonalityValue} (easily forgiving)`,
              value: 0,
          },
      gratitude: {
            description:
              `How thankful they feel when receiving compliments or assistance. Scale: ${minPersonalityValue} (unappreciative) to ${maxPersonalityValue} (very grateful)`,
              value: 0,
          },
      
      self_consciousness: {
            description:
              `How much they worry about how they are perceived by others. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (very self-conscious)`,
              value: 0,
          },
      openness: {
            description:
              `How willing they are to engage in new experiences. Scale: ${minPersonalityValue} (avoidant) to ${maxPersonalityValue} (very willing)`,
              value: 0,
          },
      neuroticism: {
            description:
              `How sensitive they are to negative emotions like anxiety and stress. Scale: ${minPersonalityValue} (relaxed) to ${maxPersonalityValue} (very anxious)`,
              value: 0,
          },
      excitement: {
            description:
              `How easily they get enthusiastic and animated. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very energetic)`,
              value: 0,
          },
    }
  },
  reason: {
    type: String,
    required: false,
    default: ""
  }
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
    type: emotionStatusSchema,
    required: false,
    default: {}
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
    type: personalityModifierSchema,
    required: false,
    default: {}
  },
  emotion_modifier: {
    type: emotionModifierSchema,
    required: false,
    default: {}
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
  EmotionalStatus: model("emotional_status", emotionStatusSchema),
  Self: model("selves", selfSchema),
  Personality: model("personalities", personalitySchema),
  PersonalityTrait: model("personality_traits", personalityTraitSchema),
  Activity: model("activity", activitySchema),
};
