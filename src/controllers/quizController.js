import Quiz from "../models/Quiz.js";
import Attempt from "../models/Attempt.js";
import User from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { toQuizDTO } from "../utils/serializers.js";

const computeServerScore = (quiz, answers) => {
  if (!Array.isArray(answers)) {
    return 0;
  }

  return quiz.questions.reduce((acc, question, index) => {
    const entry = answers[index];
    if (!entry) {
      return acc;
    }

    const isCorrect = entry.selectedAnswer === question.correctAnswer;
    if (!isCorrect) {
      return acc;
    }

    const timeLeft = Number(entry.timeLeft ?? question.timeLimit ?? 30);
    const safeTime = Math.max(0, Math.min(timeLeft, question.timeLimit || 30));
    return acc + Math.round((safeTime / (question.timeLimit || 30)) * 100);
  }, 0);
};

export const getQuizzes = asyncHandler(async (req, res) => {
  const { search, category, difficulty } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    query.category = category;
  }

  if (difficulty) {
    query.difficulty = difficulty;
  }

  const quizzes = await Quiz.find(query).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: quizzes.map(toQuizDTO),
  });
});

export const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  res.json({
    success: true,
    data: toQuizDTO(quiz),
  });
});

export const createQuiz = asyncHandler(async (req, res) => {
  const payload = req.body;

  if (!payload.title || !payload.description || !payload.category) {
    res.status(400);
    throw new Error("title, description and category are required");
  }

  const quiz = await Quiz.create({
    ...payload,
    creatorId: req.user._id.toString(),
    author: req.user.username,
    likes: 0,
    plays: 0,
    rating: payload.rating || 0,
    createdAt: payload.createdAt ? new Date(payload.createdAt) : new Date(),
  });

  res.status(201).json({
    success: true,
    data: toQuizDTO(quiz),
  });
});

export const submitAttempt = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  const { answers = [], clientScore = 0 } = req.body;
  const serverScore = computeServerScore(quiz, answers);

  const attempt = await Attempt.create({
    user: req.user._id,
    quiz: quiz._id,
    answers,
    clientScore,
    serverScore,
  });

  quiz.plays += 1;
  await quiz.save();

  req.user.stats.totalScore += serverScore;
  req.user.stats.quizzesTaken += 1;
  const old = req.user.stats.categoryScores.get(quiz.category) || 0;
  req.user.stats.categoryScores.set(quiz.category, old + serverScore);
  await req.user.save();

  res.status(201).json({
    success: true,
    data: {
      id: attempt._id.toString(),
      clientScore,
      serverScore,
    },
  });
});

export const getQuizLeaderboard = asyncHandler(async (req, res) => {
  const attempts = await Attempt.find({ quiz: req.params.id })
    .sort({ serverScore: -1, createdAt: 1 })
    .limit(20)
    .populate("user", "username");

  const data = attempts.map((attempt, index) => ({
    id: attempt.user?._id?.toString() || `attempt-${attempt._id}`,
    username: attempt.user?.username || "Player",
    score: attempt.serverScore,
    rank: index + 1,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      attempt.user?.username || "Player"
    )}`,
  }));

  res.json({
    success: true,
    data,
  });
});

export const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ "stats.totalScore": -1 }).limit(100);
  const data = users.map((user, index) => ({
    id: user._id.toString(),
    username: user.username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      user.username
    )}`,
    score: user.stats.totalScore,
    rank: index + 1,
    quizzesCompleted: user.stats.quizzesTaken,
  }));

  res.json({
    success: true,
    data,
  });
});
