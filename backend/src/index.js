import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./config/Db.js";
import cors from "cors";
import inerestRouter from "./routes/interestRoutes.js";
import questionRouter from "./routes/questionRoutes.js";
import answerRouter from "./routes/answerRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/interests", inerestRouter);
app.use('/api/question',questionRouter);
app.use('/api/answer',answerRouter);

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});