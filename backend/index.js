import path from "path";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
import express from "express";

dotenv.config();

const __dirname = path.resolve();

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*",(req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
