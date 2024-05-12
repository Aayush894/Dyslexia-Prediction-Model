import { Router } from "express";
import { imagePrediction } from "../controllers/prediction.controller.js";

const router = Router();

router.post("/imagePrediction", imagePrediction) ;

export default router ;