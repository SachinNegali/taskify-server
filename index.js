import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cavedigital")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/test", (req, res) => {
  console.log(`test this...`);
  res.send({ message: "hellooo..." });
});
