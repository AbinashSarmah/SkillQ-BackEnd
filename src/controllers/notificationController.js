import Notification from "../models/Notification.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const formatTime = (date) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    return "just now";
  }

  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
};

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  const data = notifications.map((item) => ({
    id: item._id.toString(),
    message: item.message,
    time: item.timeLabel || formatTime(item.createdAt),
    type: item.type,
    read: item.read,
  }));

  res.json({
    success: true,
    data,
  });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();

  res.json({
    success: true,
    data: { id: notification._id.toString(), read: true },
  });
});
