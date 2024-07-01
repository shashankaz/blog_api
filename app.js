import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", userRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Blog API",
  });
});
