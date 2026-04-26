import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "FaBook" },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
