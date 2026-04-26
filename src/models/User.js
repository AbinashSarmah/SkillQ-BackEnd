import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    unlockedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const AvatarSchema = new mongoose.Schema(
  {
    baseCharacter: { type: String, default: "default" },
    accessories: { type: [String], default: [] },
    colors: { type: Map, of: String, default: {} },
    unlocks: { type: [String], default: [] },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    avatar: { type: AvatarSchema, default: () => ({}) },
    stats: {
      totalScore: { type: Number, default: 0 },
      quizzesTaken: { type: Number, default: 0 },
      winRate: { type: Number, default: 0 },
      categoryScores: { type: Map, of: Number, default: {} },
      streakDays: { type: Number, default: 0 },
      achievements: { type: [AchievementSchema], default: [] },
    },
    inventory: { type: Array, default: [] },
    friends: { type: [String], default: [] },
    followers: { type: Number, default: 128 },
    following: { type: Number, default: 64 },
    preferences: {
      backgroundMusic: { type: Boolean, default: true },
      soundEffects: { type: Boolean, default: true },
      quizReminders: { type: Boolean, default: true },
      achievementAlerts: { type: Boolean, default: true },
      theme: { type: String, enum: ["light", "dark"], default: "light" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
