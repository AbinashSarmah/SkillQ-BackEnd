import { asyncHandler } from "../middleware/asyncHandler.js";
import { toUserDTO } from "../utils/serializers.js";

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: toUserDTO(req.user),
  });
});

export const updateMe = asyncHandler(async (req, res) => {
  const { username, avatar } = req.body;

  if (username) {
    req.user.username = username;
  }

  if (avatar) {
    req.user.avatar = {
      ...req.user.avatar,
      ...avatar,
    };
  }

  await req.user.save();

  res.json({
    success: true,
    data: toUserDTO(req.user),
  });
});

export const getMyStats = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      ...req.user.stats.toObject(),
      followers: req.user.followers,
      following: req.user.following,
    },
  });
});

export const getMySettings = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user.preferences,
  });
});

export const updateMySettings = asyncHandler(async (req, res) => {
  req.user.preferences = {
    ...req.user.preferences.toObject(),
    ...req.body,
  };
  await req.user.save();

  res.json({
    success: true,
    data: req.user.preferences,
  });
});
