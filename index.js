const express = require("express");
const connectDB = require("./config/db");
const setupSwagger = require("./config/swagger");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

require("dotenv").config();

const app = express();

connectDB();
setupSwagger(app);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/settings", authMiddleware, settingsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FlowTrack API listening on port ${PORT}`);
});
