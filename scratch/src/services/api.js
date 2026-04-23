import axios from "axios";

const api = axios.create({
  baseURL: "https://api.neuronest.local",
  timeout: 1500,
});

const STORAGE_KEYS = {
  users: "nn_users",
  session: "nn_session",
  moodHistory: "nn_mood_history",
  gamification: "nn_gamification",
  theme: "nn_theme",
};

const storyPool = [
  {
    title: "Luna and the Listening Stars",
    body: "Luna noticed that stars twinkled faster when she shared kind words. She whispered one brave thought, and the night sky sparkled back with calm light.",
  },
  {
    title: "Milo Builds a Focus Fort",
    body: "Milo stacked soft pillows into a fort. Inside, he solved one tiny puzzle at a time. Every small win made the fort glow brighter.",
  },
  {
    title: "Nia and the Rainbow Clock",
    body: "Nia followed a rainbow clock that counted in colorful breaths. Each color helped her finish a task and rest before starting the next one.",
  },
  {
    title: "The Calm Cloud Club",
    body: "Three friends made a calm cloud club. When someone felt overwhelmed, they paused, breathed, and picked one gentle step forward together.",
  },
];

const quizPool = [
  {
    question: "Which shape has three sides?",
    options: ["Circle", "Square", "Triangle", "Rectangle"],
    answer: "Triangle",
  },
  {
    question: "What sound does the letter B make?",
    options: ["sss", "mmm", "buh", "tuh"],
    answer: "buh",
  },
  {
    question: "5 + 3 equals?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    question: "Which one is a fruit?",
    options: ["Carrot", "Apple", "Potato", "Cucumber"],
    answer: "Apple",
  },
  {
    question: "Which activity helps your body calm down?",
    options: ["Breathing slowly", "Shouting loudly", "Running in circles", "Skipping sleep"],
    answer: "Breathing slowly",
  },
];

const calmingMessages = [
  "You are safe. Breathe in slowly.",
  "Breathe out. Let your shoulders relax.",
  "Small steps are enough for today.",
  "Your feelings matter. You are doing well.",
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAdapter = (responseData, status = 200, delay = 300) =>
  async (config) => {
    await wait(delay);
    return {
      data: responseData,
      status,
      statusText: "OK",
      headers: {},
      config,
    };
  };

const parse = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getUsers = () => parse(STORAGE_KEYS.users, []);
const saveUsers = (users) => write(STORAGE_KEYS.users, users);

export function getSessionUser() {
  return parse(STORAGE_KEYS.session, null);
}

const setSessionUser = (user) => write(STORAGE_KEYS.session, user);

export function clearSessionUser() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

export function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || "pastel";
}

export function saveStoredTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

const getMoodHistoryMap = () => parse(STORAGE_KEYS.moodHistory, {});

const getGamificationMap = () => parse(STORAGE_KEYS.gamification, {});

const defaultGamification = {
  points: 120,
  badges: ["Welcome Explorer"],
  rewards: ["Starter Sticker Pack"],
};

export async function signupUser({ name, email, password, role }) {
  const users = getUsers();

  if (!name || !email || !password || !role) {
    throw new Error("Please fill in all signup fields.");
  }

  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }

  const createdUser = {
    id: Date.now(),
    name,
    email,
    password,
    role,
  };

  users.push(createdUser);
  saveUsers(users);

  const request = await api.request({
    url: "/auth/signup",
    method: "post",
    data: createdUser,
    adapter: mockAdapter(createdUser),
  });

  return request.data;
}

export async function loginUser({ email, password, role }) {
  const users = getUsers();
  const found = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password &&
      user.role === role
  );

  if (!found) {
    throw new Error("Invalid credentials or role.");
  }

  setSessionUser(found);

  const request = await api.request({
    url: "/auth/login",
    method: "post",
    data: { email, role },
    adapter: mockAdapter(found),
  });

  return request.data;
}

export function getMoodProfile(mood) {
  const map = {
    happy: {
      welcomeMessage: "You seem happy. Let us keep the momentum with fun challenges.",
      storyTip: "Enjoy full-length adventures with playful details.",
    },
    sad: {
      welcomeMessage: "It is okay to feel sad. We will keep learning steps short and kind.",
      storyTip: "Try gentle, short stories with warm encouragement.",
    },
    angry: {
      welcomeMessage: "You might feel frustrated. Let us choose calm activities first.",
      storyTip: "Short stories with breathing pauses can help settle your mind.",
    },
    calm: {
      welcomeMessage: "You look calm and ready. Let us balance focus and fun.",
      storyTip: "Balanced story length with reflection moments.",
    },
  };

  return map[mood] || map.calm;
}

export async function getChildDashboardData(mood = "calm") {
  const reducedForSad = mood === "sad";

  const activities = [
    {
      title: "Story Mode",
      description: reducedForSad
        ? "Read gentle short stories with positive messages."
        : "Explore AI-style stories tailored to your interests.",
      emoji: "📚",
      to: "/child/story",
    },
    {
      title: "Quiz/Game Mode",
      description: reducedForSad
        ? "Try easy questions with encouraging hints."
        : "Play interactive quizzes and earn points.",
      emoji: "🎮",
      to: "/child/quiz",
    },
    {
      title: "Voice Chat",
      description: "Speak with the tutor and see your words instantly.",
      emoji: "🎙️",
      to: "/child/voice",
    },
    {
      title: "Relax Mode",
      description: "Use breathing animations and calming messages.",
      emoji: "🌈",
      to: "/child/relax",
    },
  ];

  const request = await api.request({
    url: "/child/dashboard",
    method: "get",
    adapter: mockAdapter({ activities }),
  });

  return request.data;
}

export async function getNextStory(userId) {
  const historyKey = `nn_story_index_${userId}`;
  const current = Number(localStorage.getItem(historyKey) || 0);
  const nextIndex = (current + 1) % storyPool.length;
  localStorage.setItem(historyKey, String(nextIndex));

  const moods = getMoodHistoryMap();
  const currentMood = moods[userId]?.at(-1)?.mood || "calm";

  const payload = {
    story: storyPool[current],
    moodProfile: getMoodProfile(currentMood),
  };

  const request = await api.request({
    url: "/story/next",
    method: "get",
    adapter: mockAdapter(payload),
  });

  return request.data;
}

export async function getQuizQuestions() {
  const request = await api.request({
    url: "/quiz/questions",
    method: "get",
    adapter: mockAdapter(quizPool),
  });

  return request.data;
}

export async function updateMoodCheckIn(userId, mood) {
  const moods = getMoodHistoryMap();
  const existing = moods[userId] || [];
  const updated = [...existing, { mood, timestamp: new Date().toISOString() }].slice(-20);
  moods[userId] = updated;
  write(STORAGE_KEYS.moodHistory, moods);

  const request = await api.request({
    url: "/mood/checkin",
    method: "post",
    data: { mood },
    adapter: mockAdapter({ status: "ok", mood }),
  });

  return request.data;
}

export async function sendTutorMessage(text) {
  const lower = text.toLowerCase();

  const readingReplies = [
    "Great reading question. Let us sound out the tricky words together.",
    "Nice try. Read it slowly with me, one word at a time.",
    "You are doing well. Let us find the main idea in this sentence.",
  ];

  const mathReplies = [
    "Awesome math brain. Let us solve this using small easy steps.",
    "Great work asking for help. First, what numbers do you see?",
    "Let us do this together. We can count with fingers or dots.",
  ];

  const emotionReplies = [
    "Thank you for sharing your feeling. You are safe here.",
    "I hear you. Let us take one calm breath and then continue.",
    "You are brave for saying that. We can go at your pace.",
  ];

  const genericReplies = [
    "That is a smart question. Let us learn it together.",
    "I love your curiosity. Try one tiny step and I will guide you.",
    "You are improving every day. Let us keep going with confidence.",
  ];

  const pick = (items) => items[Math.floor(Math.random() * items.length)];

  let baseReply = pick(genericReplies);
  if (/(read|story|word|letter|spell|book)/.test(lower)) baseReply = pick(readingReplies);
  if (/(math|add|subtract|number|count|multiply|divide|sum)/.test(lower)) baseReply = pick(mathReplies);
  if (/(sad|angry|upset|worried|scared|tired|frustrated)/.test(lower)) baseReply = pick(emotionReplies);

  const followUp = [
    "Would you like an easy example?",
    "Should we try a mini challenge next?",
    "Want me to explain it with a fun story?",
  ];

  const responseText = `${baseReply} ${pick(followUp)}`;

  const request = await api.request({
    url: "/ai/tutor",
    method: "post",
    data: { text },
    adapter: mockAdapter({
      id: Date.now() + 1,
      sender: "ai",
      text: responseText,
    }),
  });

  return request.data;
}

export async function getVoiceReply(text) {
  const request = await api.request({
    url: "/voice/reply",
    method: "post",
    data: { text },
    adapter: mockAdapter(`I heard you say: "${text}". That was clear and brave!`),
  });

  return request.data;
}

export function getCalmingMessages() {
  return calmingMessages;
}

export async function getGamification(userId) {
  const map = getGamificationMap();
  if (!map[userId]) {
    map[userId] = { ...defaultGamification };
    write(STORAGE_KEYS.gamification, map);
  }

  const request = await api.request({
    url: "/gamification/state",
    method: "get",
    adapter: mockAdapter(map[userId]),
  });

  return request.data;
}

export async function rewardQuizPoints(userId, earnedPoints) {
  const map = getGamificationMap();
  const current = map[userId] || { ...defaultGamification };
  const points = current.points + earnedPoints;
  const badges = [...current.badges];
  const rewards = [...current.rewards];

  if (points >= 200 && !badges.includes("Quiz Sprinter")) badges.push("Quiz Sprinter");
  if (points >= 350 && !badges.includes("Focus Hero")) badges.push("Focus Hero");
  if (points >= 500 && !rewards.includes("Choose a favorite activity bonus")) {
    rewards.push("Choose a favorite activity bonus");
  }

  map[userId] = { points, badges, rewards };
  write(STORAGE_KEYS.gamification, map);

  const request = await api.request({
    url: "/gamification/reward",
    method: "post",
    data: { earnedPoints },
    adapter: mockAdapter(map[userId]),
  });

  return request.data;
}

export async function getParentAnalytics(userId) {
  const moodMap = getMoodHistoryMap();
  const moodEntries = moodMap[userId] || [
    { mood: "happy" },
    { mood: "calm" },
    { mood: "happy" },
    { mood: "sad" },
    { mood: "calm" },
  ];
  const gamification = await getGamification(userId);

  const moodHistory = {
    happy: moodEntries.filter((entry) => entry.mood === "happy").length,
    calm: moodEntries.filter((entry) => entry.mood === "calm").length,
    sad: moodEntries.filter((entry) => entry.mood === "sad").length,
    angry: moodEntries.filter((entry) => entry.mood === "angry").length,
  };

  const request = await api.request({
    url: "/parent/analytics",
    method: "get",
    adapter: mockAdapter({
      summary: {
        learningProgress: 78,
        moodStability: 82,
        activityCompletion: 14,
        engagement: 88,
        pointsEarned: gamification.points,
      },
      progressData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [62, 66, 71, 73, 75, 79, 81],
      },
      moodHistory,
    }),
  });

  return request.data;
}

export async function getTeacherOverview() {
  const request = await api.request({
    url: "/teacher/overview",
    method: "get",
    adapter: mockAdapter({
    classroom: {
      totalStudents: 24,
      activeToday: 18,
      assignmentsThisWeek: 6,
    },
    performance: [
      {
        name: "Aarav",
        progress: 84,
        moodTrend: "Mostly Calm",
        completedActivities: 11,
      },
      {
        name: "Mira",
        progress: 76,
        moodTrend: "Happy",
        completedActivities: 9,
      },
      {
        name: "Kian",
        progress: 69,
        moodTrend: "Mixed",
        completedActivities: 7,
      },
      {
        name: "Sara",
        progress: 91,
        moodTrend: "Calm & Focused",
        completedActivities: 13,
      },
    ],
  }),
  });

  return request.data;
}

export async function assignTask(taskData) {
  const request = await api.request({
    url: "/teacher/assign-task",
    method: "post",
    data: taskData,
    adapter: mockAdapter({ status: "assigned", taskData }),
  });

  return request.data;
}