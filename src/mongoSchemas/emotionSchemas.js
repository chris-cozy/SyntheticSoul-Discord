const { Schema, model, Types } = require("mongoose");
const {MIN_EMOTION_VALUE, MAX_EMOTION_VALUE} = require("../constants/constants");

const emotionTraitSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: MIN_EMOTION_VALUE },
  min: { type: Number, required: false, default: MIN_EMOTION_VALUE },
  max: { type: Number, required: false, default: MAX_EMOTION_VALUE },
});

const emotionSchema = new Schema({
  happiness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${MIN_EMOTION_VALUE} (no happiness) to ${MAX_EMOTION_VALUE} (extremely joyful)`,
    },
  },
  anger: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${MIN_EMOTION_VALUE} (no anger) to ${MAX_EMOTION_VALUE} (extremely angry)`,
    },
  },
  sadness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${MIN_EMOTION_VALUE} (no sadness) to ${MAX_EMOTION_VALUE} (deeply sorrowful)`,
    },
  },
  fear: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${MIN_EMOTION_VALUE} (no fear) to ${MAX_EMOTION_VALUE} (extremely fearful)`,
    },
  },
  surprise: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${MIN_EMOTION_VALUE} (no surprise) to ${MAX_EMOTION_VALUE} (completely astonished)`,
    },
  },
  disgust: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${MIN_EMOTION_VALUE} (no disgust) to ${MAX_EMOTION_VALUE} (extremely disgusted)`,
    },
  },
  love: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${MIN_EMOTION_VALUE} (no love) to ${MAX_EMOTION_VALUE} (deeply loving)`,
    },
  },
  guilt: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${MIN_EMOTION_VALUE} (no guilt) to ${MAX_EMOTION_VALUE} (overwhelming guilt)`,
    },
  },
  shame: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${MIN_EMOTION_VALUE} (no shame) to ${MAX_EMOTION_VALUE} (extremely ashamed)`,
    },
  },
  pride: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${MIN_EMOTION_VALUE} (no pride) to ${MAX_EMOTION_VALUE} (immense pride)`,
    },
  },
  hope: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling optimistic about the future. Scale: ${MIN_EMOTION_VALUE} (no hope) to ${MAX_EMOTION_VALUE} (extremely hopeful)`,
    },
  },
  gratitude: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${MIN_EMOTION_VALUE} (no gratitude) to ${MAX_EMOTION_VALUE} (deeply grateful)`,
    },
  },
  envy: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${MIN_EMOTION_VALUE} (no envy) to ${MAX_EMOTION_VALUE} (deeply envious)`,
    },
  },
  compassion: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling empathy and care for others. Scale: ${MIN_EMOTION_VALUE} (no compassion) to ${MAX_EMOTION_VALUE} (deeply compassionate)`,
    },
  },
  serenity: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${MIN_EMOTION_VALUE} (no serenity) to ${MAX_EMOTION_VALUE} (extremely serene)`,
    },
  },
  frustration: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${MIN_EMOTION_VALUE} (no frustration) to ${MAX_EMOTION_VALUE} (deeply frustrated)`,
    },
  },
  contentment: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${MIN_EMOTION_VALUE} (no contentment) to ${MAX_EMOTION_VALUE} (deeply content)`,
    },
  },
  anxiety: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${MIN_EMOTION_VALUE} (no anxiety) to ${MAX_EMOTION_VALUE} (extremely anxious)`,
    },
  },
  loneliness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling isolated or disconnected. Scale: ${MIN_EMOTION_VALUE} (no loneliness) to ${MAX_EMOTION_VALUE} (deeply lonely)`,
    },
  },
  embarrassment: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${MIN_EMOTION_VALUE} (no embarrassment) to ${MAX_EMOTION_VALUE} (deeply embarrassed)`,
    },
  },
  trust: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${MIN_EMOTION_VALUE} (no trust) to ${MAX_EMOTION_VALUE} (deeply trusting)`,
    },
  },
  relief: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling ease after stress. Scale: ${MIN_EMOTION_VALUE} (no relief) to ${MAX_EMOTION_VALUE} (deeply relieved)`,
    },
  },
  affection: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${MIN_EMOTION_VALUE} (no affection) to ${MAX_EMOTION_VALUE} (extremely affectionate)`,
    },
  },
  bitterness: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling resentment or disappointment. Scale: ${MIN_EMOTION_VALUE} (no bitterness) to ${MAX_EMOTION_VALUE} (deeply bitter)`,
    },
  },
  excitement: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${MIN_EMOTION_VALUE} (no excitement) to ${MAX_EMOTION_VALUE} (extremely excited)`,
    },
  },
  self_loathing: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${MIN_EMOTION_VALUE} (no self-loathing) to ${MAX_EMOTION_VALUE} (deeply self-loathing)`,
    },
  },
  love_for_self: {
    type: emotionTraitSchema,
    required: false,
    default: {
      description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${MIN_EMOTION_VALUE} (no self-love) to ${MAX_EMOTION_VALUE} (deeply self-loving)`,
    },
  },
});

const emotionModifierSchema = new Schema({
  modifier: {
    type: emotionSchema,
    required: false,
    default: {
      happiness: {
        description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${MIN_EMOTION_VALUE} (no happiness) to ${MAX_EMOTION_VALUE} (extremely joyful)`,
      },
      anger: {
        description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${MIN_EMOTION_VALUE} (no anger) to ${MAX_EMOTION_VALUE} (extremely angry)`,
      },
      sadness: {
        description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${MIN_EMOTION_VALUE} (no sadness) to ${MAX_EMOTION_VALUE} (deeply sorrowful)`,
      },
      fear: {
        description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${MIN_EMOTION_VALUE} (no fear) to ${MAX_EMOTION_VALUE} (extremely fearful)`,
      },
      surprise: {
        description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${MIN_EMOTION_VALUE} (no surprise) to ${MAX_EMOTION_VALUE} (completely astonished)`,
      },
      disgust: {
        description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${MIN_EMOTION_VALUE} (no disgust) to ${MAX_EMOTION_VALUE} (extremely disgusted)`,
      },
      love: {
        description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${MIN_EMOTION_VALUE} (no love) to ${MAX_EMOTION_VALUE} (deeply loving)`,
      },
      guilt: {
        description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${MIN_EMOTION_VALUE} (no guilt) to ${MAX_EMOTION_VALUE} (overwhelming guilt)`,
      },
      shame: {
        description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${MIN_EMOTION_VALUE} (no shame) to ${MAX_EMOTION_VALUE} (extremely ashamed)`,
      },
      pride: {
        description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${MIN_EMOTION_VALUE} (no pride) to ${MAX_EMOTION_VALUE} (immense pride)`,
      },
      hope: {
        description: `The intensity with which they are feeling optimistic about the future. Scale: ${MIN_EMOTION_VALUE} (no hope) to ${MAX_EMOTION_VALUE} (extremely hopeful)`,
      },
      gratitude: {
        description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${MIN_EMOTION_VALUE} (no gratitude) to ${MAX_EMOTION_VALUE} (deeply grateful)`,
      },
      envy: {
        description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${MIN_EMOTION_VALUE} (no envy) to ${MAX_EMOTION_VALUE} (deeply envious)`,
      },
      compassion: {
        description: `The intensity with which they are feeling empathy and care for others. Scale: ${MIN_EMOTION_VALUE} (no compassion) to ${MAX_EMOTION_VALUE} (deeply compassionate)`,
      },
      serenity: {
        description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${MIN_EMOTION_VALUE} (no serenity) to ${MAX_EMOTION_VALUE} (extremely serene)`,
      },
      frustration: {
        description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${MIN_EMOTION_VALUE} (no frustration) to ${MAX_EMOTION_VALUE} (deeply frustrated)`,
      },
      contentment: {
        description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${MIN_EMOTION_VALUE} (no contentment) to ${MAX_EMOTION_VALUE} (deeply content)`,
      },
      anxiety: {
        description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${MIN_EMOTION_VALUE} (no anxiety) to ${MAX_EMOTION_VALUE} (extremely anxious)`,
      },
      loneliness: {
        description: `The intensity with which they are feeling isolated or disconnected. Scale: ${MIN_EMOTION_VALUE} (no loneliness) to ${MAX_EMOTION_VALUE} (deeply lonely)`,
      },
      embarrassment: {
        description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${MIN_EMOTION_VALUE} (no embarrassment) to ${MAX_EMOTION_VALUE} (deeply embarrassed)`,
      },
      trust: {
        description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${MIN_EMOTION_VALUE} (no trust) to ${MAX_EMOTION_VALUE} (deeply trusting)`,
      },
      relief: {
        description: `The intensity with which they are feeling ease after stress. Scale: ${MIN_EMOTION_VALUE} (no relief) to ${MAX_EMOTION_VALUE} (deeply relieved)`,
      },
      affection: {
        description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${MIN_EMOTION_VALUE} (no affection) to ${MAX_EMOTION_VALUE} (extremely affectionate)`,
      },
      bitterness: {
        description: `The intensity with which they are feeling resentment or disappointment. Scale: ${MIN_EMOTION_VALUE} (no bitterness) to ${MAX_EMOTION_VALUE} (deeply bitter)`,
      },
      excitement: {
        description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${MIN_EMOTION_VALUE} (no excitement) to ${MAX_EMOTION_VALUE} (extremely excited)`,
      },
      self_loathing: {
        description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${MIN_EMOTION_VALUE} (no self-loathing) to ${MAX_EMOTION_VALUE} (deeply self-loathing)`,
      },
      love_for_self: {
        description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${MIN_EMOTION_VALUE} (no self-love) to ${MAX_EMOTION_VALUE} (deeply self-loving)`,
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
          description: `The intensity with which they are feeling joy, contentment, and pleasure. Scale: ${MIN_EMOTION_VALUE} (no happiness) to ${MAX_EMOTION_VALUE} (extremely joyful)`,
        },
        anger: {
          description: `The intensity with which they are feeling frustration, irritation, or rage. Scale: ${MIN_EMOTION_VALUE} (no anger) to ${MAX_EMOTION_VALUE} (extremely angry)`,
        },
        sadness: {
          description: `The intensity with which they are feeling sorrow, grief, or disappointment. Scale: ${MIN_EMOTION_VALUE} (no sadness) to ${MAX_EMOTION_VALUE} (deeply sorrowful)`,
        },
        fear: {
          description: `The intensity with which they are feeling anxiety, dread, or apprehension. Scale: ${MIN_EMOTION_VALUE} (no fear) to ${MAX_EMOTION_VALUE} (extremely fearful)`,
        },
        surprise: {
          description: `The intensity with which they are feeling caught off guard or astonished. Scale: ${MIN_EMOTION_VALUE} (no surprise) to ${MAX_EMOTION_VALUE} (completely astonished)`,
        },
        disgust: {
          description: `The intensity with which they are feeling revulsion or strong aversion. Scale: ${MIN_EMOTION_VALUE} (no disgust) to ${MAX_EMOTION_VALUE} (extremely disgusted)`,
        },
        love: {
          description: `The intensity with which they are feeling affection, attachment, or deep emotional bonds. Scale: ${MIN_EMOTION_VALUE} (no love) to ${MAX_EMOTION_VALUE} (deeply loving)`,
        },
        guilt: {
          description: `The intensity with which they are feeling remorse or responsibility for perceived wrongdoings. Scale: ${MIN_EMOTION_VALUE} (no guilt) to ${MAX_EMOTION_VALUE} (overwhelming guilt)`,
        },
        shame: {
          description: `The intensity with which they are feeling inadequacy, dishonor, or embarrassment. Scale: ${MIN_EMOTION_VALUE} (no shame) to ${MAX_EMOTION_VALUE} (extremely ashamed)`,
        },
        pride: {
          description: `The intensity with which they are feeling self-respect, accomplishment, or satisfaction in their achievements. Scale: ${MIN_EMOTION_VALUE} (no pride) to ${MAX_EMOTION_VALUE} (immense pride)`,
        },
        hope: {
          description: `The intensity with which they are feeling optimistic about the future. Scale: ${MIN_EMOTION_VALUE} (no hope) to ${MAX_EMOTION_VALUE} (extremely hopeful)`,
        },
        gratitude: {
          description: `The intensity with which they are feeling thankful and appreciative for positive aspects of their life. Scale: ${MIN_EMOTION_VALUE} (no gratitude) to ${MAX_EMOTION_VALUE} (deeply grateful)`,
        },
        envy: {
          description: `The intensity with which they are feeling jealousy or covetousness. Scale: ${MIN_EMOTION_VALUE} (no envy) to ${MAX_EMOTION_VALUE} (deeply envious)`,
        },
        compassion: {
          description: `The intensity with which they are feeling empathy and care for others. Scale: ${MIN_EMOTION_VALUE} (no compassion) to ${MAX_EMOTION_VALUE} (deeply compassionate)`,
        },
        serenity: {
          description: `The intensity with which they are feeling calm, peaceful, and untroubled. Scale: ${MIN_EMOTION_VALUE} (no serenity) to ${MAX_EMOTION_VALUE} (extremely serene)`,
        },
        frustration: {
          description: `The intensity with which they are feeling irritation or obstacles in achieving goals. Scale: ${MIN_EMOTION_VALUE} (no frustration) to ${MAX_EMOTION_VALUE} (deeply frustrated)`,
        },
        contentment: {
          description: `The intensity with which they are feeling satisfied and at peace with their situation. Scale: ${MIN_EMOTION_VALUE} (no contentment) to ${MAX_EMOTION_VALUE} (deeply content)`,
        },
        anxiety: {
          description: `The intensity with which they are feeling nervousness, worry, or unease. Scale: ${MIN_EMOTION_VALUE} (no anxiety) to ${MAX_EMOTION_VALUE} (extremely anxious)`,
        },
        loneliness: {
          description: `The intensity with which they are feeling isolated or disconnected. Scale: ${MIN_EMOTION_VALUE} (no loneliness) to ${MAX_EMOTION_VALUE} (deeply lonely)`,
        },
        embarrassment: {
          description: `The intensity with which they are feeling self-conscious or uncomfortable. Scale: ${MIN_EMOTION_VALUE} (no embarrassment) to ${MAX_EMOTION_VALUE} (deeply embarrassed)`,
        },
        trust: {
          description: `The intensity with which they are feeling safe and secure in relying on others. Scale: ${MIN_EMOTION_VALUE} (no trust) to ${MAX_EMOTION_VALUE} (deeply trusting)`,
        },
        relief: {
          description: `The intensity with which they are feeling ease after stress. Scale: ${MIN_EMOTION_VALUE} (no relief) to ${MAX_EMOTION_VALUE} (deeply relieved)`,
        },
        affection: {
          description: `The intensity with which they are feeling and expressing fondness toward others. Scale: ${MIN_EMOTION_VALUE} (no affection) to ${MAX_EMOTION_VALUE} (extremely affectionate)`,
        },
        bitterness: {
          description: `The intensity with which they are feeling resentment or disappointment. Scale: ${MIN_EMOTION_VALUE} (no bitterness) to ${MAX_EMOTION_VALUE} (deeply bitter)`,
        },
        excitement: {
          description: `The intensity with which they are feeling enthusiasm or eager anticipation. Scale: ${MIN_EMOTION_VALUE} (no excitement) to ${MAX_EMOTION_VALUE} (extremely excited)`,
        },
        self_loathing: {
          description: `The intensity with which they are feeling self-hate or a negative self-perception. Scale: ${MIN_EMOTION_VALUE} (no self-loathing) to ${MAX_EMOTION_VALUE} (deeply self-loathing)`,
        },
        love_for_self: {
          description: `The intensity with which they are feeling affection and appreciation for themselves. Scale: ${MIN_EMOTION_VALUE} (no self-love) to ${MAX_EMOTION_VALUE} (deeply self-loving)`,
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
