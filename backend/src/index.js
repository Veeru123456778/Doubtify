import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./config/Db.js";
import cors from "cors";
import inerestRouter from "./routes/interestRoutes.js";
import questionRouter from "./routes/questionRoutes.js";
import answerRouter from "./routes/answerRoutes.js";
import bookmarkRouter from "./routes/bookmarkRoutes.js";
import draftRouter from "./routes/draftsRoutes.js";
import searchrouter from "./routes/searchRoutes.js";
import resetPasswordRouter from "./routes/resetPasswordRoutes.js";
import categoryRouter from './routes/categoryRoutes.js'; // Import the new router
import router from "./routes/categoryRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

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
app.use('/api/bookmark',bookmarkRouter);
app.use('/api/draft',draftRouter);
app.use('/api/search',searchrouter);
app.use('/api/category',router);
app.use('/api/comments', commentRoutes);

// app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

// app.listen(port, (req, res) => {
//   console.log(`Listening on port ${port}`);
// });

export const handler = serverless(app);

