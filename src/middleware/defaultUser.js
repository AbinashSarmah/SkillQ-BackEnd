import User from "../models/User.js";

export const attachDefaultUser = async (req, res, next) => {
  try {
    const username = process.env.DEFAULT_USER_USERNAME || "testuser";
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({
        username,
        avatar: {
          baseCharacter: "default",
          accessories: [],
          colors: {},
          unlocks: [],
        },
        stats: {
          totalScore: 0,
          quizzesTaken: 0,
          winRate: 0,
          categoryScores: {},
          streakDays: 0,
          achievements: [],
        },
        inventory: [],
        friends: [],
        preferences: {
          backgroundMusic: true,
          soundEffects: true,
          quizReminders: true,
          achievementAlerts: true,
          theme: "light",
        },
        followers: 128,
        following: 64,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
