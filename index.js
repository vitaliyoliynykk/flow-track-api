const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const setupSwagger = require("./config/swagger");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const userRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");

require("dotenv").config();

const app = express();

connectDB();
setupSwagger(app);

const allowedOrigins = [process.env.WEB_APP_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/settings", authMiddleware, settingsRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/tasks", authMiddleware, tasksRoutes);
app.use("/sessions", authMiddleware, sessionsRoutes);
app.use("/statistics", authMiddleware, statisticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FlowTrack API listening on port ${PORT}`);
});
