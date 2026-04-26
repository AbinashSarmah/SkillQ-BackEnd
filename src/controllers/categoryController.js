import Category from "../models/Category.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { toCategoryDTO } from "../utils/serializers.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({
    success: true,
    data: categories.map(toCategoryDTO),
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("name and description are required");
  }

  const key = name.toLowerCase().trim().replace(/\s+/g, "-");
  const exists = await Category.findOne({ key });

  if (exists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    key,
    name,
    description,
    icon: icon || "FaBook",
  });

  res.status(201).json({
    success: true,
    data: toCategoryDTO(category),
  });
});
