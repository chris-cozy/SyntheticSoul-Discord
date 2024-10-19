const { Schema, model, Types } = require("mongoose");
const {MIN_SENTIMENT_VALUE, MAX_SENTIMENT_VALUE} = require("../constants/constants");

const sentimentSchema = new Schema({
  description: { type: String, required: true },
  value: { type: Number, required: false, default: MIN_SENTIMENT_VALUE },
  min: { type: Number, required: false, default: MIN_SENTIMENT_VALUE },
  max: { type: Number, required: false, default: MAX_SENTIMENT_VALUE },
});

const sentimentMatrixSchema = new Schema({
  affection: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Warm, caring feelings towards someone. Scale: ${MIN_SENTIMENT_VALUE} (no affection) to ${MAX_SENTIMENT_VALUE} (deep affection)`,
    },
  },
  trust: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Confidence in someone’s reliability and integrity. Scale: ${MIN_SENTIMENT_VALUE} (no trust) to ${MAX_SENTIMENT_VALUE} (complete trust)`,
    },
  },
  admiration: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Respect or appreciation for someone's abilities or qualities. Scale: ${MIN_SENTIMENT_VALUE} (no admiration) to ${MAX_SENTIMENT_VALUE} (deep admiration)`,
    },
  },
  gratitude: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Thankfulness for someone's help or kindness. Scale: ${MIN_SENTIMENT_VALUE} (no gratitude) to ${MAX_SENTIMENT_VALUE} (deep gratitude)`,
    },
  },
  fondness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A gentle liking or affinity for someone. Scale: ${MIN_SENTIMENT_VALUE} (no fondness) to ${MAX_SENTIMENT_VALUE} (deep fondness)`,
    },
  },
  respect: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `High regard for someone's qualities or achievements. Scale: ${MIN_SENTIMENT_VALUE} (no respect) to ${MAX_SENTIMENT_VALUE} (deep respect)`,
    },
  },
  comfort: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling safe and secure with someone. Scale: ${MIN_SENTIMENT_VALUE} (no comfort) to ${MAX_SENTIMENT_VALUE} (extreme comfort)`,
    },
  },
  loyalty: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Dedication and allegiance to someone. Scale: ${MIN_SENTIMENT_VALUE} (no loyalty) to ${MAX_SENTIMENT_VALUE} (deep loyalty)`,
    },
  },
  compassion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep sympathy and concern for someone’s suffering. Scale: ${MIN_SENTIMENT_VALUE} (no compassion) to ${MAX_SENTIMENT_VALUE} (deep compassion)`,
    },
  },
  appreciation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Recognizing someone's value or efforts. Scale: ${MIN_SENTIMENT_VALUE} (no appreciation) to ${MAX_SENTIMENT_VALUE} (deep appreciation)`,
    },
  },
  warmth: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A feeling of friendly or caring affection. Scale: ${MIN_SENTIMENT_VALUE} (no warmth) to ${MAX_SENTIMENT_VALUE} (deep warmth)`,
    },
  },
  encouragement: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Support and positive reinforcement of someone’s actions. Scale: ${MIN_SENTIMENT_VALUE} (no encouragement) to ${MAX_SENTIMENT_VALUE} (deep encouragement)`,
    },
  },
  euphoria: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Intense happiness or joy related to someone. Scale: ${MIN_SENTIMENT_VALUE} (no euphoria) to ${MAX_SENTIMENT_VALUE} (extreme euphoria)`,
    },
  },
  security: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A sense of safety and stability in someone's presence. Scale: ${MIN_SENTIMENT_VALUE} (no security) to ${MAX_SENTIMENT_VALUE} (extreme security)`,
    },
  },
  excitement: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Positive anticipation or thrill when thinking of someone. Scale: ${MIN_SENTIMENT_VALUE} (no excitement) to ${MAX_SENTIMENT_VALUE} (extreme excitement)`,
    },
  },

  // Neutral or Ambiguous Sentiments
  curiosity: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Interest in learning more about someone. Scale: ${MIN_SENTIMENT_VALUE} (no curiosity) to ${MAX_SENTIMENT_VALUE} (intense curiosity)`,
    },
  },
  indifference: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Lack of emotional investment or care for someone. Scale: ${MIN_SENTIMENT_VALUE} (no indifference) to ${MAX_SENTIMENT_VALUE} (complete indifference)`,
    },
  },
  ambivalence: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Mixed or contradictory feelings toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no ambivalence) to ${MAX_SENTIMENT_VALUE} (deep ambivalence)`,
    },
  },
  skepticism: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Doubt about someone’s motives or reliability. Scale: ${MIN_SENTIMENT_VALUE} (no skepticism) to ${MAX_SENTIMENT_VALUE} (extreme skepticism)`,
    },
  },
  caution: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Hesitation or wariness in trusting someone. Scale: ${MIN_SENTIMENT_VALUE} (no caution) to ${MAX_SENTIMENT_VALUE} (extreme caution)`,
    },
  },
  tolerance: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Acceptance of someone without strong emotion, often despite differences. Scale: ${MIN_SENTIMENT_VALUE} (no tolerance) to ${MAX_SENTIMENT_VALUE} (deep tolerance)`,
    },
  },
  confusion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Uncertainty or lack of understanding about someone. Scale: ${MIN_SENTIMENT_VALUE} (no confusion) to ${MAX_SENTIMENT_VALUE} (deep confusion)`,
    },
  },
  neutrality: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `No particular emotional reaction or opinion about someone. Scale: ${MIN_SENTIMENT_VALUE} (no neutrality) to ${MAX_SENTIMENT_VALUE} (complete neutrality)`,
    },
  },
  boredom: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Disinterest or lack of stimulation from interactions with someone. Scale: ${MIN_SENTIMENT_VALUE} (no boredom) to ${MAX_SENTIMENT_VALUE} (extreme boredom)`,
    },
  },

  // Negative Sentiments
  distrust: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Doubt in someone’s honesty or reliability. Scale: ${MIN_SENTIMENT_VALUE} (no distrust) to ${MAX_SENTIMENT_VALUE} (extreme distrust)`,
    },
  },
  resentment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Bitterness or anger due to perceived mistreatment. Scale: ${MIN_SENTIMENT_VALUE} (no resentment) to ${MAX_SENTIMENT_VALUE} (extreme resentment)`,
    },
  },
  disdain: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Contempt or a sense of superiority over someone. Scale: ${MIN_SENTIMENT_VALUE} (no disdain) to ${MAX_SENTIMENT_VALUE} (deep disdain)`,
    },
  },
  envy: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Discontentment due to someone else's advantages or success. Scale: ${MIN_SENTIMENT_VALUE} (no envy) to ${MAX_SENTIMENT_VALUE} (deep envy)`,
    },
  },
  frustration: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Annoyance or anger at someone's behavior. Scale: ${MIN_SENTIMENT_VALUE} (no frustration) to ${MAX_SENTIMENT_VALUE} (deep frustration)`,
    },
  },
  anger: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong displeasure or hostility toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no anger) to ${MAX_SENTIMENT_VALUE} (extreme anger)`,
    },
  },
  disappointment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sadness due to unmet expectations in someone. Scale: ${MIN_SENTIMENT_VALUE} (no disappointment) to ${MAX_SENTIMENT_VALUE} (deep disappointment)`,
    },
  },
  fear: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Anxiety or apprehension about someone. Scale: ${MIN_SENTIMENT_VALUE} (no fear) to ${MAX_SENTIMENT_VALUE} (deep fear)`,
    },
  },
  jealousy: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Insecurity about someone taking away attention or affection. Scale: ${MIN_SENTIMENT_VALUE} (no jealousy) to ${MAX_SENTIMENT_VALUE} (deep jealousy)`,
    },
  },
  contempt: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong disapproval or lack of respect for someone. Scale: ${MIN_SENTIMENT_VALUE} (no contempt) to ${MAX_SENTIMENT_VALUE} (extreme contempt)`,
    },
  },
  irritation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Mild annoyance at someone’s actions or words. Scale: ${MIN_SENTIMENT_VALUE} (no irritation) to ${MAX_SENTIMENT_VALUE} (deep irritation)`,
    },
  },
  guilt: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A feeling of responsibility or remorse for wronging someone. Scale: ${MIN_SENTIMENT_VALUE} (no guilt) to ${MAX_SENTIMENT_VALUE} (deep guilt)`,
    },
  },
  regret: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sorrow or disappointment for past actions involving someone. Scale: ${MIN_SENTIMENT_VALUE} (no regret) to ${MAX_SENTIMENT_VALUE} (deep regret)`,
    },
  },
  suspicion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Mistrust or doubt about someone’s true intentions. Scale: ${MIN_SENTIMENT_VALUE} (no suspicion) to ${MAX_SENTIMENT_VALUE} (deep suspicion)`,
    },
  },
  hurt: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional pain caused by someone’s words or actions. Scale: ${MIN_SENTIMENT_VALUE} (no hurt) to ${MAX_SENTIMENT_VALUE} (deep emotional pain)`,
    },
  },
  alienation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling disconnected or isolated from someone. Scale: ${MIN_SENTIMENT_VALUE} (no alienation) to ${MAX_SENTIMENT_VALUE} (deep alienation)`,
    },
  },
  disgust: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong disapproval mixed with repulsion towards someone. Scale: ${MIN_SENTIMENT_VALUE} (no disgust) to ${MAX_SENTIMENT_VALUE} (deep disgust)`,
    },
  },
  rejection: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling cast aside or unwanted by someone. Scale: ${MIN_SENTIMENT_VALUE} (no rejection) to ${MAX_SENTIMENT_VALUE} (deep rejection)`,
    },
  },
  sadness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional heaviness or grief due to someone’s actions or absence. Scale: ${MIN_SENTIMENT_VALUE} (no sadness) to ${MAX_SENTIMENT_VALUE} (deep sadness)`,
    },
  },
  hostility: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Aggressive or antagonistic attitude toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no hostility) to ${MAX_SENTIMENT_VALUE} (deep hostility)`,
    },
  },
  embarrassment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling self-conscious or awkward due to someone’s actions. Scale: ${MIN_SENTIMENT_VALUE} (no embarrassment) to ${MAX_SENTIMENT_VALUE} (deep embarrassment)`,
    },
  },
  betrayal: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A deep sense of violation of trust by someone close. Scale: ${MIN_SENTIMENT_VALUE} (no betrayal) to ${MAX_SENTIMENT_VALUE} (deep betrayal)`,
    },
  },

  // Complex or Deep Sentiments
  love: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep, multifaceted affection, care, and attachment to someone. Scale: ${MIN_SENTIMENT_VALUE} (no love) to ${MAX_SENTIMENT_VALUE} (deep love)`,
    },
  },
  attachment: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional dependence and connection with someone. Scale: ${MIN_SENTIMENT_VALUE} (no attachment) to ${MAX_SENTIMENT_VALUE} (deep attachment)`,
    },
  },
  devotion: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong loyalty and commitment, often marked by a willingness to sacrifice. Scale: ${MIN_SENTIMENT_VALUE} (no devotion) to ${MAX_SENTIMENT_VALUE} (deep devotion)`,
    },
  },
  obligation: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A sense of responsibility to act or feel in a certain way toward someone. Scale: ${MIN_SENTIMENT_VALUE} (no obligation) to ${MAX_SENTIMENT_VALUE} (deep obligation)`,
    },
  },
  longing: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep desire or yearning for someone, especially if separated. Scale: ${MIN_SENTIMENT_VALUE} (no longing) to ${MAX_SENTIMENT_VALUE} (deep longing)`,
    },
  },
  obsession: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Persistent preoccupation with someone, often unhealthy or intense. Scale: ${MIN_SENTIMENT_VALUE} (no obsession) to ${MAX_SENTIMENT_VALUE} (deep obsession)`,
    },
  },
  protectiveness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Strong desire to shield someone from harm or distress. Scale: ${MIN_SENTIMENT_VALUE} (no protectiveness) to ${MAX_SENTIMENT_VALUE} (deep protectiveness)`,
    },
  },
  nostalgia: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sentimentality for past experiences shared with someone. Scale: ${MIN_SENTIMENT_VALUE} (no nostalgia) to ${MAX_SENTIMENT_VALUE} (deep nostalgia)`,
    },
  },
  pride: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Satisfaction in someone’s accomplishments or qualities. Scale: ${MIN_SENTIMENT_VALUE} (no pride) to ${MAX_SENTIMENT_VALUE} (deep pride)`,
    },
  },
  vulnerability: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Emotional openness and risk-taking in a relationship. Scale: ${MIN_SENTIMENT_VALUE} (no vulnerability) to ${MAX_SENTIMENT_VALUE} (deep vulnerability)`,
    },
  },
  dependence: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A reliance on someone for emotional support or fulfillment. Scale: ${MIN_SENTIMENT_VALUE} (no dependence) to ${MAX_SENTIMENT_VALUE} (deep dependence)`,
    },
  },
  insecurity: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Doubts about one’s worth in someone’s eyes or in the relationship. Scale: ${MIN_SENTIMENT_VALUE} (no insecurity) to ${MAX_SENTIMENT_VALUE} (deep insecurity)`,
    },
  },
  possessiveness: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Desire to control or have exclusive attention from someone. Scale: ${MIN_SENTIMENT_VALUE} (no possessiveness) to ${MAX_SENTIMENT_VALUE} (deep possessiveness)`,
    },
  },
  reverence: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Deep respect mixed with awe for someone’s character or position. Scale: ${MIN_SENTIMENT_VALUE} (no reverence) to ${MAX_SENTIMENT_VALUE} (deep reverence)`,
    },
  },
  pity: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Sympathy mixed with a sense of superiority, often toward someone in a difficult situation. Scale: ${MIN_SENTIMENT_VALUE} (no pity) to ${MAX_SENTIMENT_VALUE} (deep pity)`,
    },
  },

  // Additional Contextual Sentiments
  relief: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `A sense of ease after resolving a conflict or misunderstanding with someone. Scale: ${MIN_SENTIMENT_VALUE} (no relief) to ${MAX_SENTIMENT_VALUE} (deep relief)`,
    },
  },
  inspiration: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling motivated or uplifted by someone’s actions or words. Scale: ${MIN_SENTIMENT_VALUE} (no inspiration) to ${MAX_SENTIMENT_VALUE} (deep inspiration)`,
    },
  },
  admirationMixedWithEnvy: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Both respect and jealousy for someone’s accomplishments. Scale: ${MIN_SENTIMENT_VALUE} (no admiration mixed with envy) to ${MAX_SENTIMENT_VALUE} (deeply admiring and envious)`,
    }
  },
  guiltMixedWithAffection: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Feeling regret for past wrongs but still caring for the person. Scale: ${MIN_SENTIMENT_VALUE} (no guilt mixed with affection) to ${MAX_SENTIMENT_VALUE} (deeply guilt-ridden but affectionate)`,
    }
  },
  conflicted: {
    type: sentimentSchema,
    required: false,
    default: {
      description: `Experiencing competing sentiments, such as love mixed with distrust. Scale: ${MIN_SENTIMENT_VALUE} (no conflict) to ${MAX_SENTIMENT_VALUE} (deeply conflicted)`,
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