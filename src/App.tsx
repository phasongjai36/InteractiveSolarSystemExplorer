import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Flame,
  Globe2,
  Headphones,
  Languages,
  LockKeyhole,
  LogOut,
  MessageSquareMore,
  Mic2,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserRound,
  Users,
} from 'lucide-react';

const translations = {
  en: {
    appName: 'LingoVerse Academy',
    tagline: 'Immersive multilingual learning journeys for English, Japanese, Korean, and more.',
    authTitle: 'Launch your language mission',
    authSubtitle: 'Create an account or sign in to unlock adaptive lessons, shadowing labs, listening rooms, and a social learning circle.',
    register: 'Create account',
    login: 'Sign in',
    fullName: 'Full name',
    email: 'Email address',
    password: 'Password',
    dashboard: 'Dashboard',
    courses: 'Courses',
    practice: 'Practice',
    community: 'Community',
    recommendations: 'Recommended path',
    progress: 'Learning progress',
    streak: 'Day streak',
    points: 'XP points',
    lessons: 'Lessons completed',
    weeklyGoal: 'Weekly goal',
    supportedLanguages: 'Supported languages',
    immersiveLearning: 'Immersive learning modules',
    courseSystem: 'Leveled course system',
    tracking: 'Progress tracking',
    communityRewards: 'Community and rewards',
    personalized: 'Personalized recommendations',
    logout: 'Log out',
    continueLearning: 'Continue learning',
    chooseUiLanguage: 'UI language',
    chooseStudyLanguage: 'Study language',
    selectGoal: 'Learning goal',
    conversation: 'Conversation',
    career: 'Career',
    exam: 'Exam',
    travel: 'Travel',
    vocabModule: 'Vocabulary memorization',
    grammarModule: 'Grammar exercise',
    shadowingModule: 'Oral shadowing',
    listeningModule: 'Listening training',
    reveal: 'Reveal answer',
    mastered: 'Mark mastered',
    nextCard: 'Next card',
    submitAnswer: 'Submit answer',
    playAudio: 'Play audio',
    shadowed: 'I shadowed this',
    confidence: 'Confidence',
    leaderboard: 'Leaderboard',
    achievements: 'Achievements',
    challenge: 'Daily challenge',
    joinChallenge: 'Join challenge',
    claimed: 'Claimed',
    welcome: 'Welcome back',
    skillFocus: 'Skill focus',
    strengthBuilder: 'Strength builder',
    adaptiveJourney: 'Adaptive journey',
    signOutHint: 'The current authentication flow is stored locally for this prototype.',
  },
  ja: {
    appName: 'LingoVerse Academy',
    tagline: '英語、日本語、韓国語などに対応した没入型の多言語学習プラットフォーム。',
    authTitle: '語学学習ミッションを始めましょう',
    authSubtitle: 'アカウントを作成またはサインインして、適応型レッスン、シャドーイング、リスニング、学習コミュニティを利用できます。',
    register: 'アカウント作成',
    login: 'サインイン',
    fullName: '氏名',
    email: 'メールアドレス',
    password: 'パスワード',
    dashboard: 'ダッシュボード',
    courses: 'コース',
    practice: '実践',
    community: 'コミュニティ',
    recommendations: 'おすすめ学習パス',
    progress: '学習進捗',
    streak: '連続学習日数',
    points: 'XPポイント',
    lessons: '完了レッスン',
    weeklyGoal: '週間目標',
    supportedLanguages: '対応言語',
    immersiveLearning: '没入型モジュール',
    courseSystem: 'レベル別コース',
    tracking: '進捗トラッキング',
    communityRewards: 'コミュニティと報酬',
    personalized: 'パーソナライズ推薦',
    logout: 'ログアウト',
    continueLearning: '学習を続ける',
    chooseUiLanguage: 'UI言語',
    chooseStudyLanguage: '学習言語',
    selectGoal: '学習目標',
    conversation: '会話',
    career: 'キャリア',
    exam: '試験',
    travel: '旅行',
    vocabModule: '語彙暗記',
    grammarModule: '文法演習',
    shadowingModule: 'シャドーイング',
    listeningModule: 'リスニング',
    reveal: '答えを見る',
    mastered: '習得済みにする',
    nextCard: '次のカード',
    submitAnswer: '回答する',
    playAudio: '音声を再生',
    shadowed: 'シャドーイング完了',
    confidence: '自信度',
    leaderboard: 'ランキング',
    achievements: '実績',
    challenge: 'デイリーチャレンジ',
    joinChallenge: '参加する',
    claimed: '取得済み',
    welcome: 'おかえりなさい',
    skillFocus: '重点スキル',
    strengthBuilder: '強化ポイント',
    adaptiveJourney: '適応型ジャーニー',
    signOutHint: 'このプロトタイプの認証フローはローカル状態で保持されます。',
  },
  ko: {
    appName: 'LingoVerse Academy',
    tagline: '영어, 일본어, 한국어 등 주요 언어를 지원하는 몰입형 다국어 학습 플랫폼입니다.',
    authTitle: '언어 학습 미션을 시작하세요',
    authSubtitle: '계정을 만들거나 로그인하여 적응형 수업, 섀도잉, 듣기 훈련, 학습 커뮤니티를 이용하세요.',
    register: '계정 만들기',
    login: '로그인',
    fullName: '이름',
    email: '이메일',
    password: '비밀번호',
    dashboard: '대시보드',
    courses: '코스',
    practice: '연습',
    community: '커뮤니티',
    recommendations: '추천 학습 경로',
    progress: '학습 진행도',
    streak: '연속 학습일',
    points: 'XP 포인트',
    lessons: '완료한 레슨',
    weeklyGoal: '주간 목표',
    supportedLanguages: '지원 언어',
    immersiveLearning: '몰입형 학습 모듈',
    courseSystem: '레벨별 코스',
    tracking: '진행 추적',
    communityRewards: '커뮤니티와 보상',
    personalized: '개인화 추천',
    logout: '로그아웃',
    continueLearning: '학습 계속하기',
    chooseUiLanguage: 'UI 언어',
    chooseStudyLanguage: '학습 언어',
    selectGoal: '학습 목표',
    conversation: '회화',
    career: '커리어',
    exam: '시험',
    travel: '여행',
    vocabModule: '어휘 암기',
    grammarModule: '문법 연습',
    shadowingModule: '구술 섀도잉',
    listeningModule: '듣기 훈련',
    reveal: '정답 보기',
    mastered: '학습 완료',
    nextCard: '다음 카드',
    submitAnswer: '정답 제출',
    playAudio: '오디오 재생',
    shadowed: '섀도잉 완료',
    confidence: '자신감',
    leaderboard: '리더보드',
    achievements: '업적',
    challenge: '오늘의 챌린지',
    joinChallenge: '참여하기',
    claimed: '획득 완료',
    welcome: '다시 오신 것을 환영합니다',
    skillFocus: '집중 스킬',
    strengthBuilder: '강화 포인트',
    adaptiveJourney: '적응형 여정',
    signOutHint: '현재 인증 흐름은 이 프로토타입에서 로컬 상태로 저장됩니다.',
  },
} as const;

type Locale = keyof typeof translations;
type TranslationKey = keyof typeof translations.en;
type Goal = 'conversation' | 'career' | 'exam' | 'travel';
type Tab = 'dashboard' | 'courses' | 'practice' | 'community';
type StudyLanguageCode = 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'zh';
type SkillKey = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

interface AuthUser {
  name: string;
  email: string;
}

interface VocabCard {
  term: string;
  transliteration: string;
  meaning: string;
  example: string;
}

interface GrammarChallenge {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface ShadowingPrompt {
  text: string;
  meaning: string;
  coachTip: string;
}

interface ListeningChallenge {
  prompt: string;
  options: string[];
  answer: string;
}

interface LanguageTrack {
  code: StudyLanguageCode;
  label: Record<Locale, string>;
  bcp47: string;
  description: string;
  heroPhrase: string;
  heroTranslation: string;
  vocab: VocabCard[];
  grammar: GrammarChallenge[];
  shadowing: ShadowingPrompt[];
  listening: ListeningChallenge[];
  communityTopic: string;
}

const levelBlueprints = [
  {
    level: 'A1',
    accent: 'from-cyan-400 to-sky-500',
    modules: 12,
    pace: '2 weeks',
    title: 'Foundation Sprint',
    focus: 'Survival expressions, sound system, and recognition training.',
  },
  {
    level: 'A2',
    accent: 'from-violet-400 to-fuchsia-500',
    modules: 18,
    pace: '4 weeks',
    title: 'Everyday Momentum',
    focus: 'Practical grammar, daily routines, and simple conversations.',
  },
  {
    level: 'B1',
    accent: 'from-amber-400 to-orange-500',
    modules: 24,
    pace: '6 weeks',
    title: 'Confidence Builder',
    focus: 'Speaking fluency, longer listening passages, and active recall.',
  },
  {
    level: 'B2',
    accent: 'from-emerald-400 to-teal-500',
    modules: 28,
    pace: '8 weeks',
    title: 'Advanced Communicator',
    focus: 'Debates, nuanced grammar, and scenario-based mastery checks.',
  },
] as const;

const languageTracks: Record<StudyLanguageCode, LanguageTrack> = {
  en: {
    code: 'en',
    label: { en: 'English', ja: '英語', ko: '영어' },
    bcp47: 'en-US',
    description: 'Build confidence for meetings, travel, and social conversation in English.',
    heroPhrase: 'Could you help me find the right platform?',
    heroTranslation: 'Polite request and listening comprehension starter.',
    vocab: [
      { term: 'schedule', transliteration: 'schedule', meaning: 'a plan of time and activities', example: 'My study schedule starts at 7 PM.' },
      { term: 'improve', transliteration: 'improve', meaning: 'to become better', example: 'I want to improve my speaking this month.' },
      { term: 'confident', transliteration: 'confident', meaning: 'feeling sure about yourself', example: 'She sounds confident in meetings.' },
    ],
    grammar: [
      {
        prompt: 'Choose the best sentence for a future plan.',
        options: ['I study tomorrow morning.', 'I am going to study tomorrow morning.', 'I studying tomorrow morning.', 'I studied tomorrow morning.'],
        answer: 'I am going to study tomorrow morning.',
        explanation: 'Use "be going to" to describe a planned future action.',
      },
    ],
    shadowing: [
      {
        text: 'I would like to introduce myself and share my learning goals.',
        meaning: 'A useful sentence for classrooms and networking.',
        coachTip: 'Match the rhythm of "would like to" and pause slightly before the second clause.',
      },
    ],
    listening: [
      {
        prompt: 'Please submit your assignment before Friday evening.',
        options: ['The assignment was canceled.', 'The assignment is due before Friday evening.', 'The assignment starts on Friday evening.', 'The assignment needs a group partner.'],
        answer: 'The assignment is due before Friday evening.',
      },
    ],
    communityTopic: 'Share one tip for sounding natural in an English introduction.',
  },
  ja: {
    code: 'ja',
    label: { en: 'Japanese', ja: '日本語', ko: '일본어' },
    bcp47: 'ja-JP',
    description: 'Learn travel, workplace, and pop-culture Japanese with pronunciation support.',
    heroPhrase: '駅までどのくらいかかりますか。',
    heroTranslation: 'How long does it take to get to the station?',
    vocab: [
      { term: 'ありがとう', transliteration: 'arigatou', meaning: 'thank you', example: 'てつだってくれて、ありがとう。' },
      { term: 'べんきょう', transliteration: 'benkyou', meaning: 'study', example: '毎日 thirty 分べんきょうします。' },
      { term: 'やくそく', transliteration: 'yakusoku', meaning: 'appointment or promise', example: '午後にやくそくがあります。' },
    ],
    grammar: [
      {
        prompt: 'Choose the particle for destination: "学校___ 行きます".',
        options: ['に', 'を', 'が', 'で'],
        answer: 'に',
        explanation: 'Use "に" to mark a destination with movement verbs like 行きます.',
      },
    ],
    shadowing: [
      {
        text: '今日は新しい表現を使って、自己紹介をしてみます。',
        meaning: 'Today I will introduce myself using new expressions.',
        coachTip: 'Keep the pitch smooth and pause after "使って".',
      },
    ],
    listening: [
      {
        prompt: '会議は十時から始まりますので、少し早めに来てください。',
        options: ['The meeting starts at ten, so please come a little early.', 'The meeting was moved to tomorrow.', 'Please leave early because the meeting ended.', 'The meeting room is closed.'],
        answer: 'The meeting starts at ten, so please come a little early.',
      },
    ],
    communityTopic: 'Recommend one Japanese phrase that feels especially useful in daily life.',
  },
  ko: {
    code: 'ko',
    label: { en: 'Korean', ja: '韓国語', ko: '한국어' },
    bcp47: 'ko-KR',
    description: 'Practice Korean for travel, media, and modern workplace communication.',
    heroPhrase: '오늘 학습 계획을 같이 세워 볼까요?',
    heroTranslation: 'Shall we build today’s study plan together?',
    vocab: [
      { term: '도전', transliteration: 'dojeon', meaning: 'challenge', example: '새로운 단어에 도전해 봅시다.' },
      { term: '이해하다', transliteration: 'ihaehada', meaning: 'to understand', example: '문법을 더 잘 이해하고 싶어요.' },
      { term: '습관', transliteration: 'seupgwan', meaning: 'habit', example: '매일 복습하는 습관이 중요해요.' },
    ],
    grammar: [
      {
        prompt: 'Choose the correct ending for polite present tense: "저는 한국어를 공부___".',
        options: ['해요', '했다', '할까', '하세요'],
        answer: '해요',
        explanation: '해요 is the natural polite present ending for everyday statements.',
      },
    ],
    shadowing: [
      {
        text: '저는 새로운 표현을 배운 뒤 바로 말해 보면서 기억합니다.',
        meaning: 'I remember new expressions by speaking them right away.',
        coachTip: 'Keep "배운 뒤" short and let the sentence flow into "바로 말해 보면서".',
      },
    ],
    listening: [
      {
        prompt: '수업이 끝난 후에 같이 복습할 사람을 찾고 있어요.',
        options: ['I am looking for someone to review with after class.', 'The class was canceled after review.', 'I need to leave before class ends.', 'I am searching for a new classroom.'],
        answer: 'I am looking for someone to review with after class.',
      },
    ],
    communityTopic: 'Share your favorite Korean sentence pattern for daily conversation.',
  },
  es: {
    code: 'es',
    label: { en: 'Spanish', ja: 'スペイン語', ko: '스페인어' },
    bcp47: 'es-ES',
    description: 'Develop practical Spanish for travel, conversation, and customer interactions.',
    heroPhrase: 'Quiero practicar conversaciones reales todos los dias.',
    heroTranslation: 'I want to practice real conversations every day.',
    vocab: [
      { term: 'meta', transliteration: 'meta', meaning: 'goal', example: 'Mi meta es hablar con mas fluidez.' },
      { term: 'escuchar', transliteration: 'escuchar', meaning: 'to listen', example: 'Necesito escuchar con mas atencion.' },
      { term: 'viaje', transliteration: 'viaje', meaning: 'trip', example: 'Estoy preparando un viaje a Madrid.' },
    ],
    grammar: [
      {
        prompt: 'Choose the correct verb form: "Yo ___ estudiar ahora".',
        options: ['quiero', 'quiere', 'queremos', 'queria'],
        answer: 'quiero',
        explanation: 'Use "quiero" for the first-person singular in the present tense.',
      },
    ],
    shadowing: [
      {
        text: 'Estoy aprendiendo poco a poco, pero practico todos los dias.',
        meaning: 'I am learning little by little, but I practice every day.',
        coachTip: 'Keep a light rhythm and emphasize "todos los dias".',
      },
    ],
    listening: [
      {
        prompt: 'La profesora dijo que repasemos el vocabulario antes del examen.',
        options: ['The teacher said to review the vocabulary before the exam.', 'The teacher canceled the exam.', 'The vocabulary list is optional.', 'The class starts after the exam.'],
        answer: 'The teacher said to review the vocabulary before the exam.',
      },
    ],
    communityTopic: 'Post one Spanish phrase that always helps you start a conversation.',
  },
  fr: {
    code: 'fr',
    label: { en: 'French', ja: 'フランス語', ko: '프랑스어' },
    bcp47: 'fr-FR',
    description: 'Train for elegant, practical French used in travel, study, and daily routines.',
    heroPhrase: 'Je veux parler avec plus de confiance au quotidien.',
    heroTranslation: 'I want to speak with more confidence every day.',
    vocab: [
      { term: 'objectif', transliteration: 'objectif', meaning: 'goal', example: 'Mon objectif est de parler plus naturellement.' },
      { term: 'ecouter', transliteration: 'ecouter', meaning: 'to listen', example: 'J aime ecouter des dialogues courts.' },
      { term: 'progres', transliteration: 'progres', meaning: 'progress', example: 'Je vois des progres chaque semaine.' },
    ],
    grammar: [
      {
        prompt: 'Choose the correct article: "___ ami arrive bientot."',
        options: ['Un', 'Une', 'Des', 'Le'],
        answer: 'Un',
        explanation: 'Use "un" before a masculine singular noun like "ami".',
      },
    ],
    shadowing: [
      {
        text: 'Je revise mes expressions preferees avant chaque conversation.',
        meaning: 'I review my favorite expressions before each conversation.',
        coachTip: 'Link "mes expressions" smoothly and keep the sentence musical.',
      },
    ],
    listening: [
      {
        prompt: 'Le cours commence a neuf heures, alors arrivez un peu en avance.',
        options: ['The course starts at nine, so arrive a little early.', 'The course was postponed.', 'Please leave before nine.', 'The course is online only.'],
        answer: 'The course starts at nine, so arrive a little early.',
      },
    ],
    communityTopic: 'Write one French sentence that sounds natural in a cafe or classroom.',
  },
  de: {
    code: 'de',
    label: { en: 'German', ja: 'ドイツ語', ko: '독일어' },
    bcp47: 'de-DE',
    description: 'Strengthen German for travel, work, and precise everyday communication.',
    heroPhrase: 'Ich mochte heute besonders mein Horverstehen verbessern.',
    heroTranslation: 'I especially want to improve my listening comprehension today.',
    vocab: [
      { term: 'Ziel', transliteration: 'Ziel', meaning: 'goal', example: 'Mein Ziel ist flussiger zu sprechen.' },
      { term: 'wiederholen', transliteration: 'wiederholen', meaning: 'to review', example: 'Ich wiederhole neue Satze jeden Abend.' },
      { term: 'fortschritt', transliteration: 'Fortschritt', meaning: 'progress', example: 'Der Fortschritt ist diese Woche sichtbar.' },
    ],
    grammar: [
      {
        prompt: 'Choose the correct verb placement: "Heute ___ ich viel Deutsch."',
        options: ['lerne', 'lernen', 'gelernt', 'lernst'],
        answer: 'lerne',
        explanation: 'In a simple present sentence with "ich", the conjugated verb is "lerne".',
      },
    ],
    shadowing: [
      {
        text: 'Ich spreche langsam nach und achte dabei auf die Aussprache.',
        meaning: 'I repeat slowly and pay attention to pronunciation.',
        coachTip: 'Stress "langsam" and "Aussprache" clearly.',
      },
    ],
    listening: [
      {
        prompt: 'Bitte schicken Sie die Aufgabe bis morgen Nachmittag ab.',
        options: ['Please submit the assignment by tomorrow afternoon.', 'The assignment starts tomorrow afternoon.', 'Please cancel the assignment.', 'The assignment needs a new title.'],
        answer: 'Please submit the assignment by tomorrow afternoon.',
      },
    ],
    communityTopic: 'Share one German phrase that helps you sound organized and clear.',
  },
  zh: {
    code: 'zh',
    label: { en: 'Chinese', ja: '中国語', ko: '중국어' },
    bcp47: 'zh-CN',
    description: 'Practice modern Mandarin with targeted listening, tones, and real-life scenarios.',
    heroPhrase: '我想每天用十分钟复习今天学过的内容。',
    heroTranslation: 'I want to spend ten minutes each day reviewing what I learned today.',
    vocab: [
      { term: '目标', transliteration: 'mubiao', meaning: 'goal', example: '我的目标是开口更自然。' },
      { term: '练习', transliteration: 'lianxi', meaning: 'practice', example: '每天练习一点点很重要。' },
      { term: '进步', transliteration: 'jinbu', meaning: 'progress', example: '你最近进步很快。' },
    ],
    grammar: [
      {
        prompt: 'Choose the correct measure word: "一___课".',
        options: ['节', '本', '位', '张'],
        answer: '节',
        explanation: '节 is the natural measure word for lessons or classes.',
      },
    ],
    shadowing: [
      {
        text: '我会先听一遍，然后跟着老师一起读。',
        meaning: 'I will listen once first, then read along with the teacher.',
        coachTip: 'Keep the tones clear and pause after "一遍".',
      },
    ],
    listening: [
      {
        prompt: '老师说明天要先复习，再开始新的内容。',
        options: ['The teacher said to review first tomorrow, then begin new content.', 'The teacher canceled tomorrow’s lesson.', 'Tomorrow is only for new vocabulary.', 'The teacher wants homework today.'],
        answer: 'The teacher said to review first tomorrow, then begin new content.',
      },
    ],
    communityTopic: 'Share one Mandarin sentence that becomes easier after repeated shadowing.',
  },
};

const goalConfig: Record<Goal, { labelKey: TranslationKey; theme: string }> = {
  conversation: { labelKey: 'conversation', theme: 'Daily speaking confidence and reactive listening.' },
  career: { labelKey: 'career', theme: 'Presentation language, meetings, and structured writing.' },
  exam: { labelKey: 'exam', theme: 'Accuracy, timed practice, and recall strength.' },
  travel: { labelKey: 'travel', theme: 'Navigation, hospitality, and real-world interactions.' },
};

const tabs: { id: Tab; labelKey: TranslationKey; icon: typeof BookOpen }[] = [
  { id: 'dashboard', labelKey: 'dashboard', icon: Sparkles },
  { id: 'courses', labelKey: 'courses', icon: BookOpen },
  { id: 'practice', labelKey: 'practice', icon: Brain },
  { id: 'community', labelKey: 'community', icon: Users },
];

const communityBoard = [
  { name: 'Mina', language: 'Japanese', xp: 3120, streak: 23 },
  { name: 'Daniel', language: 'English', xp: 2950, streak: 19 },
  { name: 'Sora', language: 'Korean', xp: 2740, streak: 15 },
];

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [studyLanguage, setStudyLanguage] = useState<StudyLanguageCode>('ja');
  const [goal, setGoal] = useState<Goal>('conversation');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState('A2');
  const [authForm, setAuthForm] = useState({
    name: 'Avery Kim',
    email: 'avery@example.com',
    password: 'language123',
  });
  const [skillScores, setSkillScores] = useState<Record<SkillKey, number>>({
    vocabulary: 76,
    grammar: 67,
    speaking: 58,
    listening: 63,
  });
  const [points, setPoints] = useState(1840);
  const [streak, setStreak] = useState(17);
  const [completedLessons, setCompletedLessons] = useState(24);
  const [weeklyMinutes, setWeeklyMinutes] = useState(168);
  const [weeklyGoalMinutes] = useState(210);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [vocabRevealed, setVocabRevealed] = useState(false);
  const [masteredTerms, setMasteredTerms] = useState<string[]>([]);
  const [grammarChoice, setGrammarChoice] = useState('');
  const [grammarSolved, setGrammarSolved] = useState(false);
  const [shadowCompleted, setShadowCompleted] = useState(false);
  const [shadowConfidence, setShadowConfidence] = useState(3);
  const [listeningChoice, setListeningChoice] = useState('');
  const [listeningSolved, setListeningSolved] = useState(false);
  const [challengeClaimed, setChallengeClaimed] = useState(false);

  const copy = translations[locale];
  const track = languageTracks[studyLanguage];
  const vocabCard = track.vocab[vocabIndex % track.vocab.length];
  const grammarCard = track.grammar[0];
  const shadowCard = track.shadowing[0];
  const listeningCard = track.listening[0];

  const goalOptions = useMemo(
    () =>
      (Object.keys(goalConfig) as Goal[]).map((item) => ({
        id: item,
        label: copy[goalConfig[item].labelKey],
        theme: goalConfig[item].theme,
      })),
    [copy]
  );

  const skillMeta: Record<SkillKey, { label: string; color: string }> = {
    vocabulary: { label: copy.vocabModule, color: '#38bdf8' },
    grammar: { label: copy.grammarModule, color: '#a78bfa' },
    speaking: { label: copy.shadowingModule, color: '#34d399' },
    listening: { label: copy.listeningModule, color: '#f59e0b' },
  };

  const weakestSkill = (Object.entries(skillScores) as [SkillKey, number][])
    .sort((a, b) => a[1] - b[1])[0][0];

  const weeklySeries = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const base = [22, 26, 18, 30, 27, 21, 24];
    const lessonBase = [2, 3, 1, 3, 2, 2, 2];
    const variance = Math.round((weeklyMinutes - 140) / 14);

    return days.map((day, index) => ({
      day,
      minutes: Math.max(12, base[index] + variance + (index % 2 === 0 ? 2 : -1)),
      lessons: lessonBase[index] + (index % 3 === 0 ? 1 : 0),
    }));
  }, [weeklyMinutes]);

  const skillSeries = useMemo(
    () =>
      (Object.entries(skillScores) as [SkillKey, number][]).map(([key, value]) => ({
        skill: skillMeta[key].label,
        value,
      })),
    [skillMeta, skillScores]
  );

  const recommendations = useMemo(() => {
    const goalSuggestion: Record<Goal, string> = {
      conversation: `Prioritize ${track.label[locale]} shadowing labs and live dialogue drills for natural turn-taking.`,
      career: `Focus on structured vocabulary packs and presentation-style listening tasks in ${track.label[locale]}.`,
      exam: `Cycle timed grammar checks and spaced recall reviews to raise accuracy under pressure.`,
      travel: `Unlock scenario lessons for transport, hotels, and restaurant interactions in ${track.label[locale]}.`,
    };

    const skillSuggestion: Record<SkillKey, string> = {
      vocabulary: 'Increase flashcard repetitions and tag difficult terms for spaced review tomorrow.',
      grammar: 'Schedule short grammar bursts after each lesson so new sentence patterns stay active.',
      speaking: 'Add one extra oral shadowing round at 85% speed, then repeat at natural speed.',
      listening: 'Replay short prompts with transcript delay to sharpen comprehension before reading support.',
    };

    return [
      goalSuggestion[goal],
      skillSuggestion[weakestSkill],
      `Join today’s community challenge about ${track.communityTopic.toLowerCase()}`,
    ];
  }, [goal, locale, track, weakestSkill]);

  const unlockedAchievements = [
    { title: 'Seven-Day Flame', unlocked: streak >= 7, detail: 'Maintain a seven-day study streak.' },
    { title: 'Shadowing Starter', unlocked: shadowCompleted, detail: 'Complete your first oral shadowing session.' },
    { title: 'Vocabulary Collector', unlocked: masteredTerms.length >= 2, detail: 'Master at least two vocabulary cards.' },
    { title: 'Community Spark', unlocked: challengeClaimed, detail: 'Claim the community daily challenge.' },
  ];

  const completionByLevel = useMemo(
    () => ({
      A1: 94,
      A2: Math.min(100, 60 + Math.round(masteredTerms.length * 8)),
      B1: Math.min(100, 42 + Math.round((points - 1600) / 12)),
      B2: Math.min(100, 18 + Math.round((skillScores.listening + skillScores.speaking) / 10)),
    }),
    [masteredTerms.length, points, skillScores.listening, skillScores.speaking]
  );

  const weeklyGoalPercent = Math.min(100, Math.round((weeklyMinutes / weeklyGoalMinutes) * 100));

  function t(key: TranslationKey) {
    return copy[key];
  }

  function awardProgress(skill: SkillKey, scoreBoost: number, xpBoost: number, minuteBoost: number) {
    setSkillScores((current) => ({
      ...current,
      [skill]: Math.min(100, current[skill] + scoreBoost),
    }));
    setPoints((current) => current + xpBoost);
    setWeeklyMinutes((current) => current + minuteBoost);
    setCompletedLessons((current) => current + 1);
  }

  function speakText(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = track.bcp47;
    utterance.rate = track.code === 'ko' || track.code === 'ja' || track.code === 'zh' ? 0.86 : 0.92;
    window.speechSynthesis.speak(utterance);
  }

  function resetModuleStates(nextLanguage: StudyLanguageCode) {
    setStudyLanguage(nextLanguage);
    setVocabIndex(0);
    setVocabRevealed(false);
    setMasteredTerms([]);
    setGrammarChoice('');
    setGrammarSolved(false);
    setShadowCompleted(false);
    setShadowConfidence(3);
    setListeningChoice('');
    setListeningSolved(false);
  }

  function handleAuthSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUser({
      name: authForm.name.trim() || 'Learner',
      email: authForm.email.trim(),
    });
  }

  function handleMasterWord() {
    if (masteredTerms.includes(vocabCard.term)) {
      return;
    }

    setMasteredTerms((current) => [...current, vocabCard.term]);
    awardProgress('vocabulary', 5, 45, 8);
  }

  function handleGrammarSubmit() {
    if (grammarSolved || grammarChoice !== grammarCard.answer) {
      return;
    }

    setGrammarSolved(true);
    awardProgress('grammar', 6, 60, 12);
  }

  function handleShadowingComplete() {
    if (shadowCompleted) {
      return;
    }

    setShadowCompleted(true);
    awardProgress('speaking', shadowConfidence + 3, 70, 15);
    setStreak((current) => current + 1);
  }

  function handleListeningSubmit() {
    if (listeningSolved || listeningChoice !== listeningCard.answer) {
      return;
    }

    setListeningSolved(true);
    awardProgress('listening', 7, 55, 10);
  }

  function handleClaimChallenge() {
    if (challengeClaimed) {
      return;
    }

    setChallengeClaimed(true);
    setPoints((current) => current + 120);
    setWeeklyMinutes((current) => current + 20);
  }

  if (!user) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#07111f] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.24),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.15),_transparent_30%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-8 lg:flex-row lg:items-center lg:px-10">
          <section className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-white/6 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
              <Languages size={16} />
              {t('appName')}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              {t('authTitle')}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">{t('tagline')}</p>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">{t('authSubtitle')}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<BookOpen size={20} />}
                title={t('courseSystem')}
                description="A1 to B2 pathways with lesson pacing, module counts, and completion milestones."
              />
              <FeatureCard
                icon={<Brain size={20} />}
                title={t('immersiveLearning')}
                description="Vocabulary, grammar, shadowing, and listening tasks designed for active recall."
              />
              <FeatureCard
                icon={<Target size={20} />}
                title={t('personalized')}
                description="Adaptive recommendations based on your goal, weak skills, and activity pattern."
              />
              <FeatureCard
                icon={<Trophy size={20} />}
                title={t('communityRewards')}
                description="Leaderboards, streaks, badges, and daily challenges to sustain momentum."
              />
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-400">
                <Globe2 size={16} />
                {t('supportedLanguages')}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {(Object.values(languageTracks) as LanguageTrack[]).map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => resetModuleStates(language.code)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      studyLanguage === language.code
                        ? 'border-cyan-300/50 bg-cyan-400/15 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {language.label[locale]}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm text-slate-400">{track.description}</p>
                <p className="mt-4 text-2xl font-medium text-white">{track.heroPhrase}</p>
                <p className="mt-2 text-sm text-cyan-200">{track.heroTranslation}</p>
              </div>
            </div>
          </section>

          <section className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/55 p-7 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t('chooseUiLanguage')}</p>
                <div className="mt-3 flex gap-2">
                  {(['en', 'ja', 'ko'] as Locale[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setLocale(item)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        locale === item
                          ? 'bg-white text-slate-900'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  {t('adaptiveJourney')}
                </div>
                <div className="mt-1 text-xs text-emerald-200/80">{goalConfig[goal].theme}</div>
              </div>
            </div>

            <div className="mt-8 flex gap-2 rounded-full bg-white/5 p-1">
              {(['register', 'login'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAuthMode(mode)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
                    authMode === mode ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/6'
                  }`}
                >
                  {mode === 'register' ? t('register') : t('login')}
                </button>
              ))}
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleAuthSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">{t('fullName')}</span>
                <input
                  value={authForm.name}
                  onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/45 focus:bg-white/8"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">{t('email')}</span>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/45 focus:bg-white/8"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">{t('password')}</span>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/45 focus:bg-white/8"
                />
              </label>

              <div className="grid gap-3 pt-2 md:grid-cols-2">
                <SelectPanel title={t('chooseStudyLanguage')}>
                  {(Object.values(languageTracks) as LanguageTrack[]).map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => resetModuleStates(language.code)}
                      className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                        studyLanguage === language.code
                          ? 'bg-cyan-400/15 text-white ring-1 ring-cyan-300/35'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {language.label[locale]}
                    </button>
                  ))}
                </SelectPanel>
                <SelectPanel title={t('selectGoal')}>
                  {goalOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id)}
                      className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                        goal === item.id
                          ? 'bg-fuchsia-400/15 text-white ring-1 ring-fuchsia-300/35'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div>{item.label}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.theme}</div>
                    </button>
                  ))}
                </SelectPanel>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 font-medium text-slate-950 transition hover:brightness-110"
              >
                <LockKeyhole size={18} />
                {authMode === 'register' ? t('register') : t('login')}
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b16] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(217,70,239,0.14),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),_transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-8 lg:px-10">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-cyan-100">
                <Languages size={16} />
                {t('appName')}
              </div>
              <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
                {t('welcome')}, {user.name}
              </h1>
              <p className="mt-3 max-w-3xl text-slate-300">{track.description}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <CompactPanel label={t('chooseUiLanguage')}>
                <div className="flex gap-2">
                  {(['en', 'ja', 'ko'] as Locale[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setLocale(item)}
                      className={`rounded-full px-3 py-1.5 text-xs transition ${
                        locale === item ? 'bg-white text-slate-900' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              </CompactPanel>
              <CompactPanel label={t('chooseStudyLanguage')}>
                <div className="flex flex-wrap gap-2">
                  {(Object.values(languageTracks) as LanguageTrack[]).map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => resetModuleStates(language.code)}
                      className={`rounded-full px-3 py-1.5 text-xs transition ${
                        studyLanguage === language.code
                          ? 'bg-cyan-400/15 text-white ring-1 ring-cyan-300/30'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {language.label[locale]}
                    </button>
                  ))}
                </div>
              </CompactPanel>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={<Flame size={18} />} label={t('streak')} value={`${streak}`} detail="Momentum bonus active" />
          <MetricCard icon={<Star size={18} />} label={t('points')} value={points.toLocaleString()} detail="Gamified mastery score" />
          <MetricCard icon={<CheckCircle2 size={18} />} label={t('lessons')} value={`${completedLessons}`} detail="Completed across current pathway" />
          <MetricCard icon={<Target size={18} />} label={t('weeklyGoal')} value={`${weeklyGoalPercent}%`} detail={`${weeklyMinutes}/${weeklyGoalMinutes} minutes`} />
        </section>

        <section className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition ${
                  active ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/8'
                }`}
              >
                <Icon size={16} />
                {t(tab.labelKey)}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setUser(null)}
            className="ml-auto inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/8"
          >
            <LogOut size={16} />
            {t('logout')}
          </button>
        </section>

        {activeTab === 'dashboard' && (
          <main className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <section className="space-y-6">
              <Card
                title={t('continueLearning')}
                description={`${track.label[locale]} ${selectedLevel} - ${track.heroPhrase}`}
                action={
                  <button
                    type="button"
                    onClick={() => setActiveTab('practice')}
                    className="rounded-full bg-cyan-400/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20"
                  >
                    {t('continueLearning')}
                  </button>
                }
              >
                <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-3xl border border-cyan-300/15 bg-slate-950/60 p-6">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-200">
                      <Mic2 size={16} />
                      {t('adaptiveJourney')}
                    </div>
                    <p className="mt-4 text-2xl font-medium">{track.heroPhrase}</p>
                    <p className="mt-2 text-sm text-slate-400">{track.heroTranslation}</p>
                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <InsightRow label={t('skillFocus')} value={skillMeta[weakestSkill].label} />
                      <InsightRow label={t('selectGoal')} value={copy[goalConfig[goal].labelKey]} />
                      <InsightRow label={t('strengthBuilder')} value={`${masteredTerms.length} vocabulary cards mastered`} />
                      <InsightRow label="Speech lab" value="Browser speech synthesis enabled" />
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-slate-400">
                      <Sparkles size={16} />
                      {t('recommendations')}
                    </div>
                    <div className="mt-4 space-y-3">
                      {recommendations.map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card title={t('progress')} description="Minutes and lesson consistency across the week.">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklySeries}>
                        <defs>
                          <linearGradient id="studyFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.65} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                        <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={28} />
                        <Tooltip
                          contentStyle={{
                            background: '#020617',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                          }}
                        />
                        <Area type="monotone" dataKey="minutes" stroke="#22d3ee" strokeWidth={3} fill="url(#studyFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                <Card title="Skill heatmap" description="Adaptive score by language-learning competency.">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillSeries}>
                        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                        <XAxis dataKey="skill" stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={28} />
                        <Tooltip
                          contentStyle={{
                            background: '#020617',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                          }}
                        />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#a78bfa" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <Card title={t('supportedLanguages')} description="English, Japanese, Korean, and other mainstream tracks.">
                <div className="space-y-3">
                  {(Object.values(languageTracks) as LanguageTrack[]).map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => resetModuleStates(language.code)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        studyLanguage === language.code
                          ? 'border-cyan-300/30 bg-cyan-400/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/8'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-medium text-white">{language.label[locale]}</div>
                          <div className="mt-1 text-sm text-slate-400">{language.description}</div>
                        </div>
                        <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{language.code.toUpperCase()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
              <Card title={t('tracking')} description="Live indicators for the current study week.">
                <div className="space-y-4">
                  {([
                    { label: t('vocabModule'), value: skillScores.vocabulary },
                    { label: t('grammarModule'), value: skillScores.grammar },
                    { label: t('shadowingModule'), value: skillScores.speaking },
                    { label: t('listeningModule'), value: skillScores.listening },
                  ] as { label: string; value: number }[]).map((item) => (
                    <ProgressRow key={item.label} label={item.label} value={item.value} />
                  ))}
                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
                    {copy.signOutHint}
                  </div>
                </div>
              </Card>
            </section>
          </main>
        )}

        {activeTab === 'courses' && (
          <main className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="grid gap-4 md:grid-cols-2">
              {levelBlueprints.map((level) => {
                const completion = completionByLevel[level.level as keyof typeof completionByLevel];
                const active = selectedLevel === level.level;
                return (
                  <button
                    key={level.level}
                    type="button"
                    onClick={() => setSelectedLevel(level.level)}
                    className={`rounded-[1.75rem] border p-6 text-left transition ${
                      active
                        ? 'border-white/20 bg-white/10 shadow-xl shadow-cyan-950/15'
                        : 'border-white/10 bg-white/5 hover:bg-white/8'
                    }`}
                  >
                    <div className={`inline-flex rounded-full bg-gradient-to-r ${level.accent} px-3 py-1 text-sm font-medium text-slate-950`}>
                      {track.label[locale]} {level.level}
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold">{level.title}</h3>
                    <p className="mt-3 text-sm text-slate-400">{level.focus}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <MiniStat label="Modules" value={`${level.modules}`} />
                      <MiniStat label="Pace" value={level.pace} />
                    </div>
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                        <span>Completion</span>
                        <span>{completion}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${completion}%` }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </section>

            <section className="space-y-6">
              <Card title={`${track.label[locale]} ${selectedLevel}`} description="Course architecture for the selected level.">
                <div className="space-y-3">
                  {[
                    `${t('vocabModule')} - frequency lists, semantic clusters, and spaced review.`,
                    `${t('grammarModule')} - short focused drills with instant explanations.`,
                    `${t('shadowingModule')} - mimic natural rhythm with speed-controlled audio.`,
                    `${t('listeningModule')} - transcript-aware comprehension tasks.`,
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>

              <Card title={t('recommendations')} description="How the platform sequences the next step.">
                <div className="space-y-4">
                  <InsightRow label="Current level" value={selectedLevel} />
                  <InsightRow label="Primary goal" value={copy[goalConfig[goal].labelKey]} />
                  <InsightRow label="Weakest skill" value={skillMeta[weakestSkill].label} />
                  <InsightRow label="Next milestone" value="Unlock conversation checkpoint and peer feedback review." />
                </div>
              </Card>
            </section>
          </main>
        )}

        {activeTab === 'practice' && (
          <main className="mt-6 grid gap-6 xl:grid-cols-2">
            <Card title={t('vocabModule')} description="Interactive recall cards with fast mastery logging.">
              <div className="rounded-3xl border border-cyan-300/15 bg-slate-950/55 p-6">
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-200">{track.label[locale]}</div>
                <div className="mt-4 text-4xl font-semibold">{vocabCard.term}</div>
                <div className="mt-2 text-sm text-slate-400">{vocabCard.transliteration}</div>
                <p className="mt-4 text-sm text-slate-300">
                  {vocabRevealed ? `${vocabCard.meaning} - ${vocabCard.example}` : 'Try recalling the meaning before revealing it.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setVocabRevealed(true)} className="rounded-full bg-cyan-400/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20">
                    {t('reveal')}
                  </button>
                  <button type="button" onClick={handleMasterWord} className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/20">
                    {t('mastered')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVocabIndex((current) => (current + 1) % track.vocab.length);
                      setVocabRevealed(false);
                    }}
                    className="rounded-full bg-white/8 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/12"
                  >
                    {t('nextCard')}
                  </button>
                </div>
                <div className="mt-6 text-sm text-slate-400">{masteredTerms.length} cards mastered in this session.</div>
              </div>
            </Card>

            <Card title={t('grammarModule')} description="Short adaptive drills with immediate feedback.">
              <div className="rounded-3xl border border-violet-300/15 bg-slate-950/55 p-6">
                <p className="text-lg font-medium text-white">{grammarCard.prompt}</p>
                <div className="mt-5 grid gap-3">
                  {grammarCard.options.map((option) => {
                    const selected = grammarChoice === option;
                    const correct = grammarSolved && option === grammarCard.answer;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setGrammarChoice(option)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          correct
                            ? 'border-emerald-400/40 bg-emerald-400/12 text-white'
                            : selected
                              ? 'border-violet-300/35 bg-violet-400/12 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/8'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={handleGrammarSubmit} className="rounded-full bg-violet-400/15 px-4 py-2 text-sm text-violet-100 transition hover:bg-violet-400/20">
                    {t('submitAnswer')}
                  </button>
                  <div className="rounded-full bg-white/6 px-4 py-2 text-sm text-slate-300">
                    {grammarChoice ? `Selected: ${grammarChoice}` : 'Select an answer to continue.'}
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-400">
                  {grammarSolved
                    ? grammarCard.explanation
                    : grammarChoice && grammarChoice !== grammarCard.answer
                      ? 'Not quite. Try comparing the sentence pattern one more time.'
                      : 'Correct answers unlock grammar XP and raise the adaptive difficulty gradually.'}
                </p>
              </div>
            </Card>

            <Card title={t('shadowingModule')} description="Browser-powered pronunciation rehearsal with self-rating.">
              <div className="rounded-3xl border border-emerald-300/15 bg-slate-950/55 p-6">
                <p className="text-xl font-medium text-white">{shadowCard.text}</p>
                <p className="mt-3 text-sm text-slate-400">{shadowCard.meaning}</p>
                <p className="mt-2 text-sm text-emerald-200">{shadowCard.coachTip}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => speakText(shadowCard.text)} className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/20">
                    {t('playAudio')}
                  </button>
                  <button type="button" onClick={handleShadowingComplete} className="rounded-full bg-white/8 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/12">
                    {t('shadowed')}
                  </button>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                    <span>{t('confidence')}</span>
                    <span>{shadowConfidence}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={shadowConfidence}
                    onChange={(event) => setShadowConfidence(Number(event.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            <Card title={t('listeningModule')} description="Listen first, then commit to meaning.">
              <div className="rounded-3xl border border-amber-300/15 bg-slate-950/55 p-6">
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => speakText(listeningCard.prompt)} className="rounded-full bg-amber-400/15 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-400/20">
                    <Headphones size={16} className="mr-2 inline-flex" />
                    {t('playAudio')}
                  </button>
                  <div className="rounded-full bg-white/6 px-4 py-2 text-sm text-slate-300">{track.label[locale]} listening cue</div>
                </div>
                <div className="mt-5 grid gap-3">
                  {listeningCard.options.map((option) => {
                    const selected = listeningChoice === option;
                    const correct = listeningSolved && option === listeningCard.answer;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setListeningChoice(option)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          correct
                            ? 'border-emerald-400/40 bg-emerald-400/12 text-white'
                            : selected
                              ? 'border-amber-300/35 bg-amber-400/12 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/8'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={handleListeningSubmit} className="rounded-full bg-amber-400/15 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-400/20">
                    {t('submitAnswer')}
                  </button>
                  <div className="rounded-full bg-white/6 px-4 py-2 text-sm text-slate-300">
                    {listeningChoice ? `Selected meaning: ${listeningChoice}` : 'Choose the best meaning after listening.'}
                  </div>
                </div>
              </div>
            </Card>
          </main>
        )}

        {activeTab === 'community' && (
          <main className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card title={t('leaderboard')} description="Friendly competition to support consistent practice.">
              <div className="space-y-3">
                {[{ name: user.name, language: track.label.en, xp: points, streak }, ...communityBoard].map((member, index) => (
                  <div key={`${member.name}-${index}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-sm font-semibold text-cyan-100">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-sm text-slate-400">{member.language}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">{member.xp.toLocaleString()} XP</div>
                      <div className="text-sm text-slate-400">{member.streak} day streak</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <section className="space-y-6">
              <Card title={t('challenge')} description={track.communityTopic}>
                <div className="rounded-3xl border border-fuchsia-300/15 bg-slate-950/55 p-6">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-fuchsia-200">
                    <MessageSquareMore size={16} />
                    Community prompt
                  </div>
                  <p className="mt-4 text-lg text-white">{track.communityTopic}</p>
                  <p className="mt-3 text-sm text-slate-400">
                    Publish your answer, respond to two peers, and claim a bonus for collaborative learning.
                  </p>
                  <button
                    type="button"
                    onClick={handleClaimChallenge}
                    className="mt-5 rounded-full bg-fuchsia-400/15 px-4 py-2 text-sm text-fuchsia-100 transition hover:bg-fuchsia-400/20"
                  >
                    {challengeClaimed ? t('claimed') : t('joinChallenge')}
                  </button>
                </div>
              </Card>

              <Card title={t('achievements')} description="Incentives that celebrate steady progress.">
                <div className="space-y-3">
                  {unlockedAchievements.map((achievement) => (
                    <div
                      key={achievement.title}
                      className={`rounded-2xl border px-4 py-4 ${
                        achievement.unlocked
                          ? 'border-emerald-400/25 bg-emerald-400/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-medium text-white">{achievement.title}</div>
                          <div className="mt-1 text-sm text-slate-400">{achievement.detail}</div>
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs ${achievement.unlocked ? 'bg-emerald-400/20 text-emerald-100' : 'bg-white/8 text-slate-300'}`}>
                          {achievement.unlocked ? 'Unlocked' : 'Locked'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="inline-flex rounded-2xl bg-white/8 p-3 text-cyan-100">{icon}</div>
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function SelectPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/4 p-4">
      <div className="mb-3 text-sm text-slate-300">{title}</div>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}

function CompactPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-2xl bg-white/8 p-3 text-cyan-100">{icon}</div>
        <div className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs text-emerald-100">Live</div>
      </div>
      <div className="mt-5 text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{detail}</div>
    </div>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm text-white">{value}</div>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/8">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-medium text-white">{value}</div>
    </div>
  );
}
