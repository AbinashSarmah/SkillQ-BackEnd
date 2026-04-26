import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Quiz from "../models/Quiz.js";
import Notification from "../models/Notification.js";

dotenv.config();

const categories = [
  { key: "technology", name: "Technology", description: "Questions about computers, software, and digital innovation", icon: "FaLaptopCode" },
  { key: "science", name: "Science", description: "Questions about physics, chemistry, biology, and more", icon: "FaFlask" },
  { key: "mathematics", name: "Mathematics", description: "Questions about algebra, geometry, and calculus", icon: "FaCalculator" },
  { key: "history", name: "History", description: "Questions about world history and historical events", icon: "FaLandmark" },
  { key: "geography", name: "Geography", description: "Questions about countries and places", icon: "FaGlobe" },
  { key: "movies-tv", name: "Movies & TV", description: "Questions about films and TV shows", icon: "FaFilm" },
];

const quizzes = [
  {
    title: "Space Exploration",
    description: "Test your knowledge about space, planets, and cosmic phenomena.",
    category: "Science",
    difficulty: "medium",
    questions: [
      { id: "1", text: "Which planet is known as the Red Planet?", type: "multiple", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1, timeLimit: 30, points: 100 },
      { id: "2", text: "What is the largest planet in our solar system?", type: "multiple", options: ["Earth", "Saturn", "Jupiter", "Neptune"], correctAnswer: 2, timeLimit: 30, points: 100 },
      { id: "3", text: "Which galaxy do we live in?", type: "multiple", options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"], correctAnswer: 1, timeLimit: 30, points: 100 },
    ],
    tags: ["space", "science", "planets"],
    author: "CosmicExplorer",
    creatorId: "seed",
    likes: 120,
    plays: 1500,
    rating: 4.8,
  },
  {
    title: "World Capitals",
    description: "Challenge yourself with questions about world capitals and countries.",
    category: "Geography",
    difficulty: "easy",
    questions: [
      { id: "1", text: "What is the capital of Japan?", type: "multiple", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: 2, timeLimit: 30, points: 100 },
      { id: "2", text: "Which country has Canberra as its capital?", type: "multiple", options: ["New Zealand", "Australia", "Canada", "South Africa"], correctAnswer: 1, timeLimit: 30, points: 100 },
      { id: "3", text: "What is the capital of Brazil?", type: "multiple", options: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"], correctAnswer: 2, timeLimit: 30, points: 100 },
    ],
    tags: ["geography", "capitals", "countries"],
    author: "GeoMaster",
    creatorId: "seed",
    likes: 85,
    plays: 2500,
    rating: 4.5,
  },
  {
    title: "Movie Trivia",
    description: "Test your knowledge of famous movies, actors, and directors.",
    category: "Entertainment",
    difficulty: "hard",
    questions: [
      { id: "1", text: "Who directed the movie Inception?", type: "multiple", options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Quentin Tarantino"], correctAnswer: 1, timeLimit: 30, points: 100 },
      { id: "2", text: "Which movie won the Best Picture Oscar in 2020?", type: "multiple", options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"], correctAnswer: 0, timeLimit: 30, points: 100 },
      { id: "3", text: "Who played the lead role in The Dark Knight?", type: "multiple", options: ["Christian Bale", "Robert Downey Jr.", "Leonardo DiCaprio", "Brad Pitt"], correctAnswer: 0, timeLimit: 30, points: 100 },
    ],
    tags: ["movies", "entertainment", "trivia"],
    author: "FilmBuff",
    creatorId: "seed",
    likes: 200,
    plays: 3000,
    rating: 4.7,
  },
];

const run = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Quiz.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  const user = await User.create({
    username: process.env.DEFAULT_USER_USERNAME || "testuser",
    avatar: { baseCharacter: "default", accessories: [], colors: {}, unlocks: [] },
    stats: { totalScore: 1250, quizzesTaken: 42, winRate: 71, categoryScores: {}, streakDays: 5, achievements: [] },
    inventory: [],
    friends: [],
    followers: 128,
    following: 64,
    preferences: { backgroundMusic: true, soundEffects: true, quizReminders: true, achievementAlerts: true, theme: "light" },
  });

  await Category.insertMany(categories);
  await Quiz.insertMany(quizzes);

  await Notification.insertMany([
    { user: user._id, message: "New quiz available: Space Exploration", timeLabel: "2 hours ago", type: "info" },
    { user: user._id, message: "Your friend completed a quiz", timeLabel: "5 hours ago", type: "success" },
    { user: user._id, message: "Weekly leaderboard updated", timeLabel: "1 day ago", type: "info" },
  ]);

  console.log("Seed complete");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
