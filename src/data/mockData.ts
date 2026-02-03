// Slow Love Club - Event Data

export interface GameQuestion {
  id: string;
  question: string;
  category: 'icebreaker' | 'intimacy' | 'sensory' | 'creative';
}

export interface TimelineHour {
  id: number;
  title: string;
  phase: string;
  description: string;
  activities: string[];
  games: GameInfo[];
  icon: 'ice' | 'heart' | 'flame';
}

export interface GameInfo {
  id: string;
  name: string;
  tagline: string;
  questions: GameQuestion[];
  icon: 'cards' | 'cup' | 'sketch' | 'dessert';
}

// Game Questions Data
export const howWellDoYouKnowMeQuestions: GameQuestion[] = [
  { id: '1', question: "What's my comfort food?", category: 'icebreaker' },
  { id: '2', question: "What habit of mine do you find cute?", category: 'icebreaker' },
  { id: '3', question: "What's my go-to song when I'm happy?", category: 'icebreaker' },
  { id: '4', question: "What's my biggest pet peeve?", category: 'icebreaker' },
  { id: '5', question: "What's my dream vacation destination?", category: 'icebreaker' },
  { id: '6', question: "What's the one thing I can't start my day without?", category: 'icebreaker' },
];

export const slowQuestionsQuestions: GameQuestion[] = [
  { id: '7', question: "When did you first realize you loved me?", category: 'intimacy' },
  { id: '8', question: "What's a moment with me you'd relive forever?", category: 'intimacy' },
  { id: '9', question: "What's something you've never told me but always wanted to?", category: 'intimacy' },
  { id: '10', question: "How have I changed your life?", category: 'intimacy' },
  { id: '11', question: "What's your favorite thing about us?", category: 'intimacy' },
  { id: '12', question: "Where do you see us in 10 years?", category: 'intimacy' },
];

export const sipAndGuessQuestions: GameQuestion[] = [
  { id: '13', question: "Guess the coffee origin by its aroma", category: 'sensory' },
  { id: '14', question: "Identify the secret ingredient in this dessert", category: 'sensory' },
  { id: '15', question: "Match the drink to your partner's mood", category: 'sensory' },
  { id: '16', question: "Describe this taste using only emotions", category: 'sensory' },
];

export const loveIllustratedQuestions: GameQuestion[] = [
  { id: '17', question: "Draw your favorite memory together", category: 'creative' },
  { id: '18', question: "Illustrate where you first met", category: 'creative' },
  { id: '19', question: "Sketch your partner's best feature", category: 'creative' },
  { id: '20', question: "Draw your dream home together", category: 'creative' },
];

// Games Data
export const games: Record<string, GameInfo> = {
  howWellDoYouKnowMe: {
    id: 'how-well-do-you-know-me',
    name: 'How Well Do You Know Me?',
    tagline: 'Emotion-forward questions that reveal how deeply you know each other',
    questions: howWellDoYouKnowMeQuestions,
    icon: 'cards',
  },
  slowQuestions: {
    id: 'slow-questions',
    name: 'The Slow Questions',
    tagline: 'Intimacy deck for the conversations that matter',
    questions: slowQuestionsQuestions,
    icon: 'cards',
  },
  sipAndGuess: {
    id: 'sip-and-guess',
    name: 'Sip & Guess',
    tagline: 'Blindfolded tasting that heightens your senses',
    questions: sipAndGuessQuestions,
    icon: 'cup',
  },
  loveIllustrated: {
    id: 'love-illustrated',
    name: 'Love, Illustrated',
    tagline: 'Draw your memories, no artistic skills required',
    questions: loveIllustratedQuestions,
    icon: 'sketch',
  },
};

// Timeline Data
export const timelineHours: TimelineHour[] = [
  {
    id: 1,
    title: 'Breaking the Ice',
    phase: 'Strangers → Friends',
    description: 'Arrive at your sanctuary. Let the ambiance melt your walls as you reconnect through playful games designed to spark joy.',
    activities: ['Welcome drinks & arrival', 'Icebreaker games', 'First course tasting'],
    games: [games.howWellDoYouKnowMe, games.slowQuestions],
    icon: 'ice',
  },
  {
    id: 2,
    title: 'The Deep Dive',
    phase: 'Friends → Lovers',
    description: 'Engage your senses. Blindfolded tastings and creative play bring you closer as you explore each other in new ways.',
    activities: ['Sensory experiences', 'Creative expression', 'Curated pairings'],
    games: [games.sipAndGuess, games.loveIllustrated],
    icon: 'heart',
  },
  {
    id: 3,
    title: 'The Seal',
    phase: 'Lovers → Partners',
    description: 'Share the last bite. A ritual dessert, a whispered promise, and a Polaroid moment to take home forever.',
    activities: ['"The Last Bite" ritual', 'Love Affair Corner', 'Polaroid goodbye'],
    games: [],
    icon: 'flame',
  },
];

// Event Details
export const eventDetails = {
  name: 'The Slow Love Club',
  tagline: 'Love, but at an unhurried pace',
  venue: 'Grano - Coffee Affairs',
  date: "Valentine's Day 2024",
  time: '7:00 PM - 10:00 PM',
  duration: '3 Hours',
  price: 5000,
  currency: '₹',
  includes: [
    'Welcome drinks',
    'Curated games & activities',
    'Multi-course tasting experience',
    'Signature dessert ritual',
    'Polaroid takeaway',
    'Exclusive couple\'s sanctuary seating',
  ],
};
