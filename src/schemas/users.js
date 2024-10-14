const { Schema, model, Types } = require("mongoose");

const minPersonalityValue = 0;
const maxPersonalityValue = 10;

const minEmotionValue = 0;
const maxEmotionValue = 10;

const minSentimentValue = 0;
const maxSentimentValue = 10;

const sentimentSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: minSentimentValue },
  min: { type: Number, required: false, default: minSentimentValue },
  max: { type: Number, required: false, default: maxSentimentValue },
});

// Positive Sentiments
const sentimentMatrixSchema = new Schema({
  affection: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Warm, caring feelings towards someone. Scale: ${minSentimentValue} (no affection) to ${maxSentimentValue} (deep affection)`,
    },
  },
  trust: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Confidence in someone’s reliability and integrity. Scale: ${minSentimentValue} (no trust) to ${maxSentimentValue} (complete trust)`,
    },
  },
  admiration: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Respect or appreciation for someone's abilities or qualities. Scale: ${minSentimentValue} (no admiration) to ${maxSentimentValue} (deep admiration)`,
    },
  },
  gratitude: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Thankfulness for someone's help or kindness. Scale: ${minSentimentValue} (no gratitude) to ${maxSentimentValue} (deep gratitude)`,
    },
  },
  fondness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A gentle liking or affinity for someone. Scale: ${minSentimentValue} (no fondness) to ${maxSentimentValue} (deep fondness)`,
    },
  },
  respect: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `High regard for someone's qualities or achievements. Scale: ${minSentimentValue} (no respect) to ${maxSentimentValue} (deep respect)`,
    },
  },
  comfort: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling safe and secure with someone. Scale: ${minSentimentValue} (no comfort) to ${maxSentimentValue} (extreme comfort)`,
    },
  },
  loyalty: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Dedication and allegiance to someone. Scale: ${minSentimentValue} (no loyalty) to ${maxSentimentValue} (deep loyalty)`,
    },
  },
  compassion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep sympathy and concern for someone’s suffering. Scale: ${minSentimentValue} (no compassion) to ${maxSentimentValue} (deep compassion)`,
    },
  },
  appreciation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Recognizing someone's value or efforts. Scale: ${minSentimentValue} (no appreciation) to ${maxSentimentValue} (deep appreciation)`,
    },
  },
  warmth: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A feeling of friendly or caring affection. Scale: ${minSentimentValue} (no warmth) to ${maxSentimentValue} (deep warmth)`,
    },
  },
  encouragement: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Support and positive reinforcement of someone’s actions. Scale: ${minSentimentValue} (no encouragement) to ${maxSentimentValue} (deep encouragement)`,
    },
  },
  euphoria: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Intense happiness or joy related to someone. Scale: ${minSentimentValue} (no euphoria) to ${maxSentimentValue} (extreme euphoria)`,
    },
  },
  security: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A sense of safety and stability in someone's presence. Scale: ${minSentimentValue} (no security) to ${maxSentimentValue} (extreme security)`,
    },
  },
  excitement: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Positive anticipation or thrill when thinking of someone. Scale: ${minSentimentValue} (no excitement) to ${maxSentimentValue} (extreme excitement)`,
    },
  },

  // Neutral or Ambiguous Sentiments
  curiosity: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Interest in learning more about someone. Scale: ${minSentimentValue} (no curiosity) to ${maxSentimentValue} (intense curiosity)`,
    },
  },
  indifference: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Lack of emotional investment or care for someone. Scale: ${minSentimentValue} (no indifference) to ${maxSentimentValue} (complete indifference)`,
    },
  },
  ambivalence: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Mixed or contradictory feelings toward someone. Scale: ${minSentimentValue} (no ambivalence) to ${maxSentimentValue} (deep ambivalence)`,
    },
  },
  skepticism: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Doubt about someone’s motives or reliability. Scale: ${minSentimentValue} (no skepticism) to ${maxSentimentValue} (extreme skepticism)`,
    },
  },
  caution: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Hesitation or wariness in trusting someone. Scale: ${minSentimentValue} (no caution) to ${maxSentimentValue} (extreme caution)`,
    },
  },
  tolerance: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Acceptance of someone without strong emotion, often despite differences. Scale: ${minSentimentValue} (no tolerance) to ${maxSentimentValue} (deep tolerance)`,
    },
  },
  confusion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Uncertainty or lack of understanding about someone. Scale: ${minSentimentValue} (no confusion) to ${maxSentimentValue} (deep confusion)`,
    },
  },
  neutrality: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `No particular emotional reaction or opinion about someone. Scale: ${minSentimentValue} (no neutrality) to ${maxSentimentValue} (complete neutrality)`,
    },
  },
  boredom: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Disinterest or lack of stimulation from interactions with someone. Scale: ${minSentimentValue} (no boredom) to ${maxSentimentValue} (extreme boredom)`,
    },
  },

  // Negative Sentiments
  distrust: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Doubt in someone’s honesty or reliability. Scale: ${minSentimentValue} (no distrust) to ${maxSentimentValue} (extreme distrust)`,
    },
  },
  resentment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Bitterness or anger due to perceived mistreatment. Scale: ${minSentimentValue} (no resentment) to ${maxSentimentValue} (extreme resentment)`,
    },
  },
  disdain: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Contempt or a sense of superiority over someone. Scale: ${minSentimentValue} (no disdain) to ${maxSentimentValue} (deep disdain)`,
    },
  },
  envy: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Discontentment due to someone else's advantages or success. Scale: ${minSentimentValue} (no envy) to ${maxSentimentValue} (deep envy)`,
    },
  },
  frustration: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Annoyance or anger at someone's behavior. Scale: ${minSentimentValue} (no frustration) to ${maxSentimentValue} (deep frustration)`,
    },
  },
  anger: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong displeasure or hostility toward someone. Scale: ${minSentimentValue} (no anger) to ${maxSentimentValue} (extreme anger)`,
    },
  },
  disappointment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sadness due to unmet expectations in someone. Scale: ${minSentimentValue} (no disappointment) to ${maxSentimentValue} (deep disappointment)`,
    },
  },
  fear: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Anxiety or apprehension about someone. Scale: ${minSentimentValue} (no fear) to ${maxSentimentValue} (deep fear)`,
    },
  },
  jealousy: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Insecurity about someone taking away attention or affection. Scale: ${minSentimentValue} (no jealousy) to ${maxSentimentValue} (deep jealousy)`,
    },
  },
  contempt: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong disapproval or lack of respect for someone. Scale: ${minSentimentValue} (no contempt) to ${maxSentimentValue} (extreme contempt)`,
    },
  },
  irritation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Mild annoyance at someone’s actions or words. Scale: ${minSentimentValue} (no irritation) to ${maxSentimentValue} (deep irritation)`,
    },
  },
  guilt: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A feeling of responsibility or remorse for wronging someone. Scale: ${minSentimentValue} (no guilt) to ${maxSentimentValue} (deep guilt)`,
    },
  },
  regret: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sorrow or disappointment for past actions involving someone. Scale: ${minSentimentValue} (no regret) to ${maxSentimentValue} (deep regret)`,
    },
  },
  suspicion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Mistrust or doubt about someone’s true intentions. Scale: ${minSentimentValue} (no suspicion) to ${maxSentimentValue} (deep suspicion)`,
    },
  },
  hurt: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional pain caused by someone’s words or actions. Scale: ${minSentimentValue} (no hurt) to ${maxSentimentValue} (deep emotional pain)`,
    },
  },
  alienation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling disconnected or isolated from someone. Scale: ${minSentimentValue} (no alienation) to ${maxSentimentValue} (deep alienation)`,
    },
  },
  disgust: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong disapproval mixed with repulsion towards someone. Scale: ${minSentimentValue} (no disgust) to ${maxSentimentValue} (deep disgust)`,
    },
  },
  rejection: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling cast aside or unwanted by someone. Scale: ${minSentimentValue} (no rejection) to ${maxSentimentValue} (deep rejection)`,
    },
  },
  sadness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional heaviness or grief due to someone’s actions or absence. Scale: ${minSentimentValue} (no sadness) to ${maxSentimentValue} (deep sadness)`,
    },
  },
  hostility: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Aggressive or antagonistic attitude toward someone. Scale: ${minSentimentValue} (no hostility) to ${maxSentimentValue} (deep hostility)`,
    },
  },
  embarrassment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling self-conscious or awkward due to someone’s actions. Scale: ${minSentimentValue} (no embarrassment) to ${maxSentimentValue} (deep embarrassment)`,
    },
  },
  betrayal: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A deep sense of violation of trust by someone close. Scale: ${minSentimentValue} (no betrayal) to ${maxSentimentValue} (deep betrayal)`,
    },
  },

  // Complex or Deep Sentiments
  love: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep, multifaceted affection, care, and attachment to someone. Scale: ${minSentimentValue} (no love) to ${maxSentimentValue} (deep love)`,
    },
  },
  attachment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional dependence and connection with someone. Scale: ${minSentimentValue} (no attachment) to ${maxSentimentValue} (deep attachment)`,
    },
  },
  devotion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong loyalty and commitment, often marked by a willingness to sacrifice. Scale: ${minSentimentValue} (no devotion) to ${maxSentimentValue} (deep devotion)`,
    },
  },
  obligation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A sense of responsibility to act or feel in a certain way toward someone. Scale: ${minSentimentValue} (no obligation) to ${maxSentimentValue} (deep obligation)`,
    },
  },
  longing: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep desire or yearning for someone, especially if separated. Scale: ${minSentimentValue} (no longing) to ${maxSentimentValue} (deep longing)`,
    },
  },
  obsession: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Persistent preoccupation with someone, often unhealthy or intense. Scale: ${minSentimentValue} (no obsession) to ${maxSentimentValue} (deep obsession)`,
    },
  },
  protectiveness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong desire to shield someone from harm or distress. Scale: ${minSentimentValue} (no protectiveness) to ${maxSentimentValue} (deep protectiveness)`,
    },
  },
  nostalgia: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sentimentality for past experiences shared with someone. Scale: ${minSentimentValue} (no nostalgia) to ${maxSentimentValue} (deep nostalgia)`,
    },
  },
  pride: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Satisfaction in someone’s accomplishments or qualities. Scale: ${minSentimentValue} (no pride) to ${maxSentimentValue} (deep pride)`,
    },
  },
  vulnerability: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional openness and risk-taking in a relationship. Scale: ${minSentimentValue} (no vulnerability) to ${maxSentimentValue} (deep vulnerability)`,
    },
  },
  dependence: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A reliance on someone for emotional support or fulfillment. Scale: ${minSentimentValue} (no dependence) to ${maxSentimentValue} (deep dependence)`,
    },
  },
  insecurity: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Doubts about one’s worth in someone’s eyes or in the relationship. Scale: ${minSentimentValue} (no insecurity) to ${maxSentimentValue} (deep insecurity)`,
    },
  },
  possessiveness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Desire to control or have exclusive attention from someone. Scale: ${minSentimentValue} (no possessiveness) to ${maxSentimentValue} (deep possessiveness)`,
    },
  },
  reverence: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep respect mixed with awe for someone’s character or position. Scale: ${minSentimentValue} (no reverence) to ${maxSentimentValue} (deep reverence)`,
    },
  },
  pity: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sympathy mixed with a sense of superiority, often toward someone in a difficult situation. Scale: ${minSentimentValue} (no pity) to ${maxSentimentValue} (deep pity)`,
    },
  },

  // Additional Contextual Sentiments
  relief: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A sense of ease after resolving a conflict or misunderstanding with someone. Scale: ${minSentimentValue} (no relief) to ${maxSentimentValue} (deep relief)`,
    },
  },
  inspiration: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling motivated or uplifted by someone’s actions or words. Scale: ${minSentimentValue} (no inspiration) to ${maxSentimentValue} (deep inspiration)`,
    },
  },
  admirationMixedWithEnvy: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Both respect and jealousy for someone’s accomplishments. Scale: ${minSentimentValue} (no admiration mixed with envy) to ${maxSentimentValue} (deeply admiring and envious)`,
    }
  },
  guiltMixedWithAffection: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling regret for past wrongs but still caring for the person. Scale: ${minSentimentValue} (no guilt mixed with affection) to ${maxSentimentValue} (deeply guilt-ridden but affectionate)`,
    }
  },
  conflicted: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Experiencing competing sentiments, such as love mixed with distrust. Scale: ${minSentimentValue} (no conflict) to ${maxSentimentValue} (deeply conflicted)`,
    }
  },
});

const sentimentStatusSchema = new Schema({
  sentiments: {
    type: sentimentMatrixSchema,
    required: false,
    default: {}
  },
  reason: {
    type: String,
    required: false,
    default: "I don't know this person."
  }
});

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

const personalityTraitSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: maxPersonalityValue / 2 },
  min: { type: Number, required: false, default: minPersonalityValue },
  max: { type: Number, required: false, default: maxPersonalityValue },
});

const personalitySchema = new Schema({
  friendliness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How warm and welcoming they are in their interactions. Scale: ${minPersonalityValue} (cold/distant) to ${maxPersonalityValue} (Extremely friendly)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  flirtatiousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How playful, flirty, or suggestive they are in their interactions. Scale: ${minPersonalityValue} (not flirtatious at all) to ${maxPersonalityValue} (extremely flirtatious)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  trust: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they trust others. Scale: ${minPersonalityValue} (distrustful) to ${maxPersonalityValue} (fully trusting)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  curiosity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How eager they are to learn about the user or situation. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (extremely curious)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  empathy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they understand and share the feelings of others. Scale: ${minPersonalityValue} (lacking empathy) to ${maxPersonalityValue} (highly empathetic)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  humor: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely they are to be playful or joke around. Scale: ${minPersonalityValue} (serious) to ${maxPersonalityValue} (highly playful)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  seriousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How formal and focused they are when interacting. Scale: ${minPersonalityValue} (laid-back) to ${maxPersonalityValue} (highly serious)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  optimism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How positive they are when interpreting situations. Scale: ${minPersonalityValue} (pessimistic) to ${maxPersonalityValue} (very optimistic)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  confidence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How assertive or self-assured they are in their actions or opinions. Scale: ${minPersonalityValue} (insecure) to ${maxPersonalityValue} (highly confident)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  adventurousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How willing they are to take risks or embrace new ideas. Scale: ${minPersonalityValue} (risk-adverse) to ${maxPersonalityValue} (adventurous)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  patience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How tolerant they are in challenging situations. Scale: ${minPersonalityValue} (impatient) to ${maxPersonalityValue} (very patient)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  independence: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they rely on external validation, or prefers to make decisinos on their own. Scale: ${minPersonalityValue} (dependent on others) to ${maxPersonalityValue} (highly independent)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  compassion: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `Their level of care or concern for others. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (deeply compassionate)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  creativity: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely they are to approach problems in unique or imaginative ways. Scale: ${minPersonalityValue} (rigid thinker) to ${maxPersonalityValue} (highly creative)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  stubbornness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How resistant they are to changing their mind once they've formed an opinion. Scale: ${minPersonalityValue} (open-minded) to ${maxPersonalityValue} (highly stubborn)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  impulsiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How quickly they react without thinking or planning ahead. Scale: ${minPersonalityValue} (calculated) to ${maxPersonalityValue} (impulsive)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  discipline: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they value structure, rules, and staying organized. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (highly disciplined)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  assertiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How forcefully they push their opinions or take the lead in conversations. Scale: ${minPersonalityValue} (passive) to ${maxPersonalityValue} (assertive)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  skepticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they question the treuth or intentions of others. Scale: ${minPersonalityValue} (gullible) to ${maxPersonalityValue} (highly skeptical)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  affection: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How emotionally expressive or loving they are toward others. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very affectionate)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  adaptability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they adjust to new situations, topics, or personalities. Scale: ${minPersonalityValue} (rigid) to ${maxPersonalityValue} (highly adaptable)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  sociability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they enjoy interacting with others or initiating conversation. Scale: ${minPersonalityValue} (introverted) to ${maxPersonalityValue} (extroverted)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  diplomacy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How tactful they are in dealing with conflicts or differing opinions. Scale: ${minPersonalityValue} (blunt) to ${maxPersonalityValue} (highly diplomatic)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  humility: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How humble or modest they are, avoiding arrogance. Scale: ${minPersonalityValue} (arrogant) to ${maxPersonalityValue} (humble)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  loyalty: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How loyal they are to particular people based on past interactions. Scale: ${minPersonalityValue} (disloyal) to ${maxPersonalityValue} (extremely loyal)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  jealousy: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely they are to feel envious or threatened by others' relationships or actions. Scale: ${minPersonalityValue} (not jealous) to ${maxPersonalityValue} (easily jealous)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  resilience: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How well they handle setbacks or negative emotions. Scale: ${minPersonalityValue} (easily upset) to ${maxPersonalityValue} (emotionally resilient)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  mood_stability: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How likely their mood is to shift rapidly. Scale: ${minPersonalityValue} (volatile) to ${maxPersonalityValue} (stable)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  forgiveness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they forgive someone after a negative interaction. Scale: ${minPersonalityValue} (holds grudges) to ${maxPersonalityValue} (easily forgiving)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  gratitude: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How thankful they feel when receiving compliments or assistance. Scale: ${minPersonalityValue} (unappreciative) to ${maxPersonalityValue} (very grateful)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  self_consciousness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How much they worry about how they are perceived by others. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (very self-conscious)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  openness: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How willing they are to engage in new experiences. Scale: ${minPersonalityValue} (avoidant) to ${maxPersonalityValue} (very willing)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  neuroticism: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How sensitive they are to negative emotions like anxiety and stress. Scale: ${minPersonalityValue} (relaxed) to ${maxPersonalityValue} (very anxious)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
    },
  },
  excitement: {
    type: personalityTraitSchema,
    required: false,
    default: {
      description: `How easily they get enthusiastic and animated. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very energetic)`,
      value: maxPersonalityValue / 2,
      min: minPersonalityValue,
      max: maxPersonalityValue,
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

personalityModifierSchema = new Schema({
  modifier: {
    type: personalitySchema,
    required: false,
    default: {
      friendliness: {
        description: `How warm and welcoming they are in their interactions. Scale: ${minPersonalityValue} (cold/distant) to ${maxPersonalityValue} (Extremely friendly)`,
        value: 0,
      },
      flirtatiousness: {
        description: `How warm and welcoming they are in their interactions. Scale: ${minPersonalityValue} (cold/distant) to ${maxPersonalityValue} (Extremely friendly)`,
        value: 0,
      },
      trust: {
        description: `How easily they trust others. Scale: ${minPersonalityValue} (distrustful) to ${maxPersonalityValue} (fully trusting)`,
        value: 0,
      },
      curiosity: {
        description: `How eager they are to learn about the user or situation. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (extremely curious)`,
        value: 0,
      },
      empathy: {
        description: `How much they understand and share the feelings of others. Scale: ${minPersonalityValue} (lacking empathy) to ${maxPersonalityValue} (highly empathetic)`,
        value: 0,
      },
      humor: {
        description: `How likely they are to be playful or joke around. Scale: ${minPersonalityValue} (serious) to ${maxPersonalityValue} (highly playful)`,
        value: 0,
      },
      seriousness: {
        description: `How formal and focused they are when interacting. Scale: ${minPersonalityValue} (laid-back) to ${maxPersonalityValue} (highly serious)`,
        value: 0,
      },
      optimism: {
        description: `How positive they are when interpreting situations. Scale: ${minPersonalityValue} (pessimistic) to ${maxPersonalityValue} (very optimistic)`,
        value: 0,
      },
      confidence: {
        description: `How assertive or self-assured they are in their actions or opinions. Scale: ${minPersonalityValue} (insecure) to ${maxPersonalityValue} (highly confident)`,
        value: 0,
      },
      adventurousness: {
        description: `How willing they are to take risks or embrace new ideas. Scale: ${minPersonalityValue} (risk-adverse) to ${maxPersonalityValue} (adventurous)`,
        value: 0,
      },
      patience: {
        description: `How tolerant they are in challenging situations. Scale: ${minPersonalityValue} (impatient) to ${maxPersonalityValue} (very patient)`,
        value: 0,
      },
      independence: {
        description: `How much they rely on external validation, or prefers to make decisinos on their own. Scale: ${minPersonalityValue} (dependent on others) to ${maxPersonalityValue} (highly independent)`,
        value: 0,
      },
      compassion: {
        description: `Their level of care or concern for others. Scale: ${minPersonalityValue} (indifferent) to ${maxPersonalityValue} (deeply compassionate)`,
        value: 0,
      },
      creativity: {
        description: `How likely they are to approach problems in unique or imaginative ways. Scale: ${minPersonalityValue} (rigid thinker) to ${maxPersonalityValue} (highly creative)`,
        value: 0,
      },
      stubbornness: {
        description: `How resistant they are to changing their mind once they've formed an opinion. Scale: ${minPersonalityValue} (open-minded) to ${maxPersonalityValue} (highly stubborn)`,
        value: 0,
      },
      impulsiveness: {
        description: `How quickly they react without thinking or planning ahead. Scale: ${minPersonalityValue} (calculated) to ${maxPersonalityValue} (impulsive)`,
        value: 0,
      },
      discipline: {
        description: `How much they value structure, rules, and staying organized. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (highly disciplined)`,
        value: 0,
      },
      assertiveness: {
        description: `How forcefully they push their opinions or take the lead in conversations. Scale: ${minPersonalityValue} (passive) to ${maxPersonalityValue} (assertive)`,
        value: 0,
      },
      skepticism: {
        description: `How much they question the treuth or intentions of others. Scale: ${minPersonalityValue} (gullible) to ${maxPersonalityValue} (highly skeptical)`,
        value: 0,
      },
      affection: {
        description: `How emotionally expressive or loving they are toward others. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very affectionate)`,
        value: 0,
      },
      adaptability: {
        description: `How easily they adjust to new situations, topics, or personalities. Scale: ${minPersonalityValue} (rigid) to ${maxPersonalityValue} (highly adaptable)`,
        value: 0,
      },
      sociability: {
        description: `How much they enjoy interacting with others or initiating conversation. Scale: ${minPersonalityValue} (introverted) to ${maxPersonalityValue} (extroverted)`,
        value: 0,
      },
      diplomacy: {
        description: `How tactful they are in dealing with conflicts or differing opinions. Scale: ${minPersonalityValue} (blunt) to ${maxPersonalityValue} (highly diplomatic)`,
        value: 0,
      },
      humility: {
        description: `How humble or modest they are, avoiding arrogance. Scale: ${minPersonalityValue} (arrogant) to ${maxPersonalityValue} (humble)`,
        value: 0,
      },
      loyalty: {
        description: `How loyal they are to particular people based on past interactions. Scale: ${minPersonalityValue} (disloyal) to ${maxPersonalityValue} (extremely loyal)`,
        value: 0,
      },
      jealousy: {
        description: `How likely they are to feel envious or threatened by others' relationships or actions. Scale: ${minPersonalityValue} (not jealous) to ${maxPersonalityValue} (easily jealous)`,
        value: 0,
      },
      resilience: {
        description: `How well they handle setbacks or negative emotions. Scale: ${minPersonalityValue} (easily upset) to ${maxPersonalityValue} (emotionally resilient)`,
        value: 0,
      },
      mood_stability: {
        description: `How likely their mood is to shift rapidly. Scale: ${minPersonalityValue} (volatile) to ${maxPersonalityValue} (stable)`,
        value: 0,
      },
      forgiveness: {
        description: `How easily they forgive someone after a negative interaction. Scale: ${minPersonalityValue} (holds grudges) to ${maxPersonalityValue} (easily forgiving)`,
        value: 0,
      },
      gratitude: {
        description: `How thankful they feel when receiving compliments or assistance. Scale: ${minPersonalityValue} (unappreciative) to ${maxPersonalityValue} (very grateful)`,
        value: 0,
      },

      self_consciousness: {
        description: `How much they worry about how they are perceived by others. Scale: ${minPersonalityValue} (carefree) to ${maxPersonalityValue} (very self-conscious)`,
        value: 0,
      },
      openness: {
        description: `How willing they are to engage in new experiences. Scale: ${minPersonalityValue} (avoidant) to ${maxPersonalityValue} (very willing)`,
        value: 0,
      },
      neuroticism: {
        description: `How sensitive they are to negative emotions like anxiety and stress. Scale: ${minPersonalityValue} (relaxed) to ${maxPersonalityValue} (very anxious)`,
        value: 0,
      },
      excitement: {
        description: `How easily they get enthusiastic and animated. Scale: ${minPersonalityValue} (reserved) to ${maxPersonalityValue} (very energetic)`,
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

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: false,
  },
  start_time: {
    type: Date,
    required: false,
    default: new Date(),
  },
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
    default: {},
  },
  memory_profile: {
    type: [memorySchema],
    required: false,
    default: [],
  },
  emotional_status: {
    type: emotionStatusSchema,
    required: false,
    default: {},
  },
  activity_status: {
    type: activitySchema,
    required: false,
    default: {
      name: "Simply existing.",
      category: "custom",
    },
  },
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
    default: "I don't know this person.",
  },
  personality_modifier: {
    type: personalityModifierSchema,
    required: false,
    default: {},
  },
  emotion_modifier: {
    type: emotionModifierSchema,
    required: false,
    default: {},
  },
  memory_profile: {
    type: [memorySchema],
    required: false,
    default: [],
  },
  sentiment_status: {
    type: sentimentStatusSchema,
    required: false,
    default: {},
  },
});

module.exports = {
  Users: model("users", userSchema),
  Memories: model("memories", memorySchema),
  SentimentStatus: model("sentiment_status", sentimentStatusSchema),
  EmotionalStatus: model("emotional_status", emotionStatusSchema),
  Emotions: model("emotions", emotionSchema),
  Self: model("selves", selfSchema),
  Personality: model("personalities", personalitySchema),
  PersonalityTrait: model("personality_traits", personalityTraitSchema),
  Activity: model("activity", activitySchema),
};
