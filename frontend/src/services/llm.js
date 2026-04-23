import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCRigL1c9fc5ZIhCtLCtab1gX6-PZyFX0Y';

const genAI = new GoogleGenerativeAI(API_KEY, {
  baseUrl: "https://generativelanguage.googleapis.com/v1",
});

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// 📚 Robust Library of 10 Manual Lessons (Offline Fallback)
const MANUAL_LESSONS = [
  {
    topic: "Space Rockets 🚀",
    lesson: "Rockets use powerful engines to zoom into space! They move so fast that they can leave Earth's gravity. When a rocket is high enough, it releases a satellite or a spaceship to explore the stars.",
    quiz: {
      question: "What do rockets use to travel into space?",
      options: ["Giant Balloons", "Powerful Engines", "Magic Wings"],
      answer: "Powerful Engines"
    }
  },
  {
    topic: "Dinosaurs 🦖",
    lesson: "Did you know some dinosaurs were as big as a house, while others were as small as a chicken? Dinosaurs lived a long long time ago. Some ate green leaves, and others were fast runners!",
    quiz: {
      question: "True or False: All dinosaurs were the same size?",
      options: ["True", "False"],
      answer: "False"
    }
  },
  {
    topic: "Ocean Life 🌊",
    lesson: "The ocean is home to beautiful coral reefs and amazing fish like Nemo! Dolphins love to jump and play in the waves. Deep down, it is very quiet and dark where giant squids live.",
    quiz: {
      question: "Who loves to jump and play in the ocean waves?",
      options: ["Cats", "Dolphins", "Elephants"],
      answer: "Dolphins"
    }
  },
  {
    topic: "Human Body 💪",
    lesson: "Your heart is like a little pump that never stops! It pushes blood to your toes and your brain. When you exercise, your heart beats faster to give you more energy.",
    quiz: {
      question: "What does your heart pump through your body?",
      options: ["Air", "Water", "Blood"],
      answer: "Blood"
    }
  },
  {
    topic: "Plants Hunt 🌿",
    lesson: "Plants eat sunlight to grow! They take in water from their roots and use the sun to stay healthy. Leaves are like tiny solar panels that make food for the plant.",
    quiz: {
      question: "What do plants use to make their food?",
      options: ["Sunlight", "Sandwich", "Ice Cream"],
      answer: "Sunlight"
    }
  },
  {
    topic: "Weather Magic ☁️",
    lesson: "Clouds are made of tiny water drops. When the drops get too heavy, they fall as rain! Rain helps the flowers grow and gives animals water to drink.",
    quiz: {
      question: "What falls from the sky when clouds get too heavy?",
      options: ["Snow", "Rain", "Marshmallows"],
      answer: "Rain"
    }
  },
  {
    topic: "Music World 🎵",
    lesson: "Music is made of vibrations. When you pluck a guitar string, it wiggles back and forth very fast to make a sound. Drums make sound when you tap them with sticks!",
    quiz: {
      question: "How does a guitar string make sound?",
      options: ["By wiggling fast", "By sleeping", "By changing color"],
      answer: "By wiggling fast"
    }
  },
  {
    topic: "Color Mix 🎨",
    lesson: "Blue and Yellow make Green! Red and Yellow make Orange! Mixing colors is like magic. In art, you can use your imagination to draw anything you want.",
    quiz: {
      question: "What color do you get if you mix Blue and Yellow?",
      options: ["Purple", "Green", "Pink"],
      answer: "Green"
    }
  },
  {
    topic: "Inventors 💡",
    lesson: "Inventions are new tools that help people. The wheel was invented long ago to help move heavy targets. Today, computers help us learn and talk to friends far away!",
    quiz: {
      question: "What was invented to help move heavy targets?",
      options: ["The Wheel", "The Spoon", "The Pillow"],
      answer: "The Wheel"
    }
  },
  {
    topic: "Numbers Fun 🔢",
    lesson: "Math is everywhere! If you have 3 apples and find 2 more, you have 5 apples. Counting helps us share things fairly and build tall towers.",
    quiz: {
      question: "If you have 3 apples and get 2 more, how many do you have?",
      options: ["4", "5", "6"],
      answer: "5"
    }
  }
];

export const generateLearningContent = async (topic, mood, profile) => {
  console.log("Manual Fallback System Check: Topic Input was:", topic);
  
  try {
    console.log("🚀 Attempting Gemini v1 (2.0 flash)...");
    
    const systemPrompt = `
      You are an AI tutor for neurodivergent children.
      Topic: "${topic}"
      Mood: "${mood}"
      Format: JSON { "lesson": "...", "quiz": { "question": "...", "options": [...], "answer": "..." } }
    `;

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();
    const jsonString = text.replace(/```json\n?/, '').replace(/```\n?/, '');
    return JSON.parse(jsonString);
    
  } catch (error) {
    console.warn("❌ Gemini API 429/Error. Activating Strict Topic Matcher...");
    
    const lowerTopic = topic.toLowerCase();
    
    // Strict Matcher Logic
    let selectedLesson = null;
    
    // 1. Try exact or start match
    selectedLesson = MANUAL_LESSONS.find(l => 
       lowerTopic.includes(l.topic.split(' ')[0].toLowerCase()) ||
       l.topic.toLowerCase().includes(lowerTopic.split(' ')[0].toLowerCase())
    );

    // 2. Fallback to first word fuzzy match if still nothing
    if (!selectedLesson) {
       console.log("Fuzzy matching first word...");
       const firstWord = lowerTopic.split(' ')[0];
       selectedLesson = MANUAL_LESSONS.find(l => l.topic.toLowerCase().indexOf(firstWord) !== -1);
    }

    // 3. Absolute fallback
    if (!selectedLesson) {
       console.log("No match found, using Space as default fallback.");
       selectedLesson = MANUAL_LESSONS[0];
    }
    
    console.log("✅ Matched Lesson Title:", selectedLesson.topic);

    return {
      lesson: `[Manual Mode] ${selectedLesson.lesson}`,
      quiz: selectedLesson.quiz,
      isManual: true,
      manualTopic: selectedLesson.topic
    };
  }
};
