import express from "express";
import {
  getMe,
  getMySettings,
  getMyStats,
  updateMe,
  updateMySettings,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", getMe);
router.patch("/me", updateMe);
router.get("/me/stats", getMyStats);
router.get("/me/settings", getMySettings);
router.patch("/me/settings", updateMySettings);

export default router;
