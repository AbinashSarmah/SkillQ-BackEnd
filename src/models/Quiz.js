import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    options: { type: [String], default: [] },
    correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
    timeLimit: { type: Number, default: 30 },
    points: { type: Number, default: 100 },
    explanation: { type: String },
    hint: { type: String },
    matchingPairs: { type: Array, default: undefined },
    scaleRange: { type: Object, default: undefined },
    gridOptions: { type: Object, default: undefined },
    dateRange: { type: Object, default: undefined },
    timeRange: { type: Object, default: undefined },
    fileTypes: { type: [String], default: undefined },
    maxFileSize: { type: Number, default: undefined },
    required: { type: Boolean, default: false },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    questions: { type: [QuestionSchema], default: [] },
    creatorId: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    plays: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", QuizSchema);
