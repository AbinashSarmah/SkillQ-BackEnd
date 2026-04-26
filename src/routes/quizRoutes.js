import express from "express";
import {
  createQuiz,
  getGlobalLeaderboard,
  getQuizById,
  getQuizLeaderboard,
  getQuizzes,
  submitAttempt,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getQuizzes);
router.post("/", createQuiz);
router.get("/leaderboard", getGlobalLeaderboard);
router.get("/:id", getQuizById);
router.post("/:id/attempts", submitAttempt);
router.get("/:id/leaderboard", getQuizLeaderboard);

export default router;
