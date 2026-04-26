import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["success", "error", "info"], default: "info" },
    read: { type: Boolean, default: false },
    timeLabel: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
