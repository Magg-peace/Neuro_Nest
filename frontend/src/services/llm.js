import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCRigL1c9fc5ZIhCtLCtab1gX6-PZyFX0Y';

const genAI = new GoogleGenerativeAI(API_KEY, {
  baseUrl: "https://generativelanguage.googleapis.com/v1",
});

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// 📚 USER DEFINED 10 MODULES (PREMIUM TEMPLATE)
// Structure: Learn -> See (Video) -> Do (Activity) -> Quiz
const MANUAL_LESSONS = [
  {
    topic: "Numbers Fun 🔢",
    learn: [
      "• Numbers help us count things in real life",
      "• We can add objects together",
      "• Example: 3 apples + 2 apples = 5 apples 🍎"
    ],
    activity: "Tap the apples to count them! 🍎 🍎 🍎 + 🍎 🍎",
    quiz: {
      question: "How many apples total are in 3 + 2?",
      options: ["4", "5", "6"],
      answer: "5"
    }
  },
  {
    topic: "Colors & Shapes 🌈",
    learn: [
      "• Everything around us has colors and shapes",
      "• Shapes help us identify objects",
      "• Example: Red circle 🔴, Blue square 🟦"
    ],
    activity: "Find the Blue Square 🟦 in the room!",
    quiz: {
      question: "Which color belongs to the 🔴 emoji?",
      options: ["Red", "Blue", "Green"],
      answer: "Red"
    }
  },
  {
    topic: "Pattern Play 🔁",
    learn: [
      "• Patterns repeat in order",
      "• We must observe and continue them",
      "• Example: ⭐ ⚪ ⭐ ⚪ ?"
    ],
    activity: "Can you guess what comes after ⭐?",
    quiz: {
      question: "Finish the pattern: ⭐ 🔵 ⭐ 🔵 ___",
      options: ["⭐", "🔴", "🟩"],
      answer: "⭐"
    }
  },
  {
    topic: "Sound & Listening 🎵",
    learn: [
      "• Sounds help us recognize things",
      "• Animals and objects have unique sounds",
      "• Example: Cow says 'Moo 🐄'"
    ],
    activity: "Close your eyes and listen to the 'Moo'!",
    quiz: {
      question: "Which animal says 'Moo'?",
      options: ["Dog", "Cow", "Cat"],
      answer: "Cow"
    }
  },
  {
    topic: "Story Time 🐰",
    learn: [
      "• Stories help us learn and imagine",
      "• We can count objects in stories",
      "• Example: Bunny has 4 carrots 🥕"
    ],
    activity: "Count the carrots as they appear! 🥕 🥕 🥕 🥕",
    quiz: {
      question: "If bunny has 2 carrots and gets 1 more, how many total?",
      options: ["2", "3", "4"],
      answer: "3"
    }
  },
  {
    topic: "Memory Boost 🧠",
    learn: [
      "• Memory helps us remember things",
      "• We must observe carefully",
      "• Example: 🍎 🍌 🍇 → which was middle?"
    ],
    activity: "Look closely at the fruits! They will hide soon!",
    quiz: {
      question: "If you saw 🍎 🍌 🍇, which one was in the middle?",
      options: ["🍎", "🍌", "🍇"],
      answer: "🍌"
    }
  },
  {
    topic: "Focus Game 🎮",
    learn: [
      "• Focus means spotting differences",
      "• We must find the odd one out",
      "• Example: Cars mixed with animals 🚗 🐶 🐱"
    ],
    activity: "Look for the thing that doesn't have legs! 🚗",
    quiz: {
      question: "Identify the odd one: 🐶 🐱 🐭 🚗",
      options: ["🐶", "🐱", "🚗"],
      answer: "🚗"
    }
  },
  {
    topic: "Drawing Fun 🚀",
    learn: [
      "• Shapes build real objects",
      "• Example: Rocket = rectangle + triangle 🚀"
    ],
    activity: "Imagine building a rocket with blocks!",
    quiz: {
      question: "What shape is usually the main rocket body?",
      options: ["Circle", "Rectangle", "Star"],
      answer: "Rectangle"
    }
  },
  {
    topic: "Real-Life Learning 🏡",
    learn: [
      "• We use math in daily life",
      "• Example: Sharing chocolate equally 🍫"
    ],
    activity: "If you share 2 chocolates with a friend, how many for you?",
    quiz: {
      question: "You have 1 chocolate and get 1 more, total is?",
      options: ["1", "2", "3"],
      answer: "2"
    }
  },
  {
    topic: "Emotions & Mood 💛",
    learn: [
      "• Emotions show how we feel",
      "• Faces help express feelings",
      "• Example: 😊 Happy, 😢 Sad"
    ],
    activity: "Can you make a Happy face right now? 😊",
    quiz: {
      question: "If someone is crying, how do they feel?",
      options: ["Happy", "Sad", "Excited"],
      answer: "Sad"
    }
  }
];

export const generateLearningContent = async (topic, mood, profile) => {
  try {
    const systemPrompt = `Topic: ${topic}, Mood: ${mood}. Reply JSON.`;
    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();
    return JSON.parse(text.replace(/```json\n?/, '').replace(/```\n?/, ''));
  } catch (error) {
    console.warn("❌ Fallback to User Modules...");
    
    let selectedLesson = MANUAL_LESSONS.find(l => 
       topic.toLowerCase().includes(l.topic.toLowerCase().split(' ')[0]) ||
       l.topic.toLowerCase().includes(topic.toLowerCase().split(' ')[0])
    );

    if (!selectedLesson) selectedLesson = MANUAL_LESSONS[0];

    return {
      lesson: selectedLesson.learn.join('\n'),
      learnLines: selectedLesson.learn,
      activity: selectedLesson.activity,
      quiz: selectedLesson.quiz,
      isManual: true,
      manualTopic: selectedLesson.topic
    };
  }
};
