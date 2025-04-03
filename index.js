const express = require("express");
const connectDB = require("./config/db");
const setupSwagger = require("./config/swagger");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const userRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes");

require("dotenv").config();

const app = express();

connectDB();
setupSwagger(app);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/settings", authMiddleware, settingsRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/tasks", authMiddleware, tasksRoutes);
app.use("/sessions", authMiddleware, sessionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FlowTrack API listening on port ${PORT}`);
});
