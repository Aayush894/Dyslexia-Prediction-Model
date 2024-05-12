import { Router } from "express";
import { imagePrediction, quizPrediction } from "../controllers/prediction.controller.js";

const router = Router();

router.post("/imagePrediction", imagePrediction) ;
router.post("/quizPrediction", quizPrediction) ;

export default router ;