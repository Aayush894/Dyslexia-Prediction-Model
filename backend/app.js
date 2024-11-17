import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {rateLimit} from 'express-rate-limit'; 

const app = express();

// configure the rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 2000, // Limit each IP to 100 requests per window (15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(
  cors({
    origin: "https://dyslexia-prediction-model-ia3w.onrender.com",
    // credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "Authorization"],
  })
);

app.use(limiter); 
app.use(cookieParser());
// use public folder to store the image uploaded by the user locally

app.use(express.static('public'));

// routes import
import userRouter from "./routes/user.routes.js";
import predictionRouter from './routes/prediction.routes.js'; 

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", predictionRouter); 

app.get("/", (req, res) => {
  res.send("API is running....");
});

export { app };
