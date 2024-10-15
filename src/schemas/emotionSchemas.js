const { Schema, model, Types } = require("mongoose");

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
    },
  },
  anger: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${minEmotionValue} (no anger) to ${maxEmotionValue} (extremely angry)`,
    },
  },
  sadness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${minEmotionValue} (no sadness) to ${maxEmotionValue} (deeply sorrowful)`,
    },
  },
  fear: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${minEmotionValue} (no fear) to ${maxEmotionValue} (extremely fearful)`,
    },
  },
  surprise: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${minEmotionValue} (no surprise) to ${maxEmotionValue} (completely astonished)`,
    },
  },
  disgust: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${minEmotionValue} (no disgust) to ${maxEmotionValue} (extremely disgusted)`,
    },
  },
  love: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${minEmotionValue} (no love) to ${maxEmotionValue} (deeply loving)`,
    },
  },
  guilt: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${minEmotionValue} (no guilt) to ${maxEmotionValue} (overwhelming guilt)`,
    },
  },
  shame: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${minEmotionValue} (no shame) to ${maxEmotionValue} (extremely ashamed)`,
    },
  },
  pride: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${minEmotionValue} (no pride) to ${maxEmotionValue} (immense pride)`,
    },
  },
  hope: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling optimistic about the future. Scale: ${minEmotionValue} (no hope) to ${maxEmotionValue} (extremely hopeful)`,
    },
  },
  gratitude: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${minEmotionValue} (no gratitude) to ${maxEmotionValue} (deeply grateful)`,
    },
  },
  envy: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${minEmotionValue} (no envy) to ${maxEmotionValue} (deeply envious)`,
    },
  },
  compassion: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling empathy and care for others. Scale: ${minEmotionValue} (no compassion) to ${maxEmotionValue} (deeply compassionate)`,
    },
  },
  serenity: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${minEmotionValue} (no serenity) to ${maxEmotionValue} (extremely serene)`,
    },
  },
  frustration: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${minEmotionValue} (no frustration) to ${maxEmotionValue} (deeply frustrated)`,
    },
  },
  contentment: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${minEmotionValue} (no contentment) to ${maxEmotionValue} (deeply content)`,
    },
  },
  anxiety: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${minEmotionValue} (no anxiety) to ${maxEmotionValue} (extremely anxious)`,
    },
  },
  loneliness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling isolated or disconnected. Scale: ${minEmotionValue} (no loneliness) to ${maxEmotionValue} (deeply lonely)`,
    },
  },
  embarrassment: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${minEmotionValue} (no embarrassment) to ${maxEmotionValue} (deeply embarrassed)`,
    },
  },
  trust: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${minEmotionValue} (no trust) to ${maxEmotionValue} (deeply trusting)`,
    },
  },
  relief: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling ease after stress. Scale: ${minEmotionValue} (no relief) to ${maxEmotionValue} (deeply relieved)`,
    },
  },
  affection: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${minEmotionValue} (no affection) to ${maxEmotionValue} (extremely affectionate)`,
    },
  },
  bitterness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling resentment or disappointment. Scale: ${minEmotionValue} (no bitterness) to ${maxEmotionValue} (deeply bitter)`,
    },
  },
  excitement: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${minEmotionValue} (no excitement) to ${maxEmotionValue} (extremely excited)`,
    },
  },
  self_loathing: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${minEmotionValue} (no self-loathing) to ${maxEmotionValue} (deeply self-loathing)`,
    },
  },
  love_for_self: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${minEmotionValue} (no self-love) to ${maxEmotionValue} (deeply self-loving)`,
    },
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
      },
    },
  },
  reason: {
    type: String,
    required: false,
    default: "This person has no lasting impact over how they feel.",
  },
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
    Emotions: emotionSchema,
    EmotionTrait: emotionTraitSchema,
    EmotionModifier: emotionModifierSchema,
    EmotionStatusSchema: emotionStatusSchema,
    EmotionStatus: model("emotional_status", emotionStatusSchema),
};
