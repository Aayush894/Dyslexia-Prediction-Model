import path from "path";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config();

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
