import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "Authorization"],
  })
);

app.use(cookieParser());
// use public folder to store the image uploaded by the user locally

app.use(express.static('public'));

// routes import
import userRouter from "./routes/user.routes.js";

app.use(express.json());
app.use("/api", userRouter);

// http://localhost:5000/api/v1/users/register

export { app };
