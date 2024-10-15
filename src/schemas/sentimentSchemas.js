const { Schema, model, Types } = require("mongoose");

const minSentimentValue = 0;
const maxSentimentValue = 10;

const sentimentSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: minSentimentValue },
  min: { type: Number, required: false, default: minSentimentValue },
  max: { type: Number, required: false, default: maxSentimentValue },
});

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

module.exports = {
    SentimentStatus: model("sentiment_status", sentimentStatusSchema),
    SentimentStatusSchema: sentimentStatusSchema,
    Sentiment: sentimentSchema,
    SentimentMatrix: sentimentMatrixSchema,
};