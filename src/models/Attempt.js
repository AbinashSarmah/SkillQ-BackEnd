import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: { type: [mongoose.Schema.Types.Mixed], default: [] },
    clientScore: { type: Number, default: 0 },
    serverScore: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

AttemptSchema.index({ quiz: 1, serverScore: -1 });

export default mongoose.model("Attempt", AttemptSchema);
