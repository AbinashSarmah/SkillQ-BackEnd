import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profileRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { attachDefaultUser } from "./middleware/defaultUser.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { getGlobalLeaderboard } from "./controllers/quizController.js";

const app = express();

const configuredOrigins = (
  process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no Origin header) and configured web origins.
      if (!origin || configuredOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

app.use("/api", attachDefaultUser, profileRoutes);
app.use("/api/categories", attachDefaultUser, categoryRoutes);
app.use("/api/quizzes", attachDefaultUser, quizRoutes);
app.get("/api/leaderboard", attachDefaultUser, getGlobalLeaderboard);
app.use("/api/notifications", attachDefaultUser, notificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;