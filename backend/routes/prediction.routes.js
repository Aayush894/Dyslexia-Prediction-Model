import { Router } from "express";
import { imagePrediction, quizPrediction } from "../controllers/prediction.controller.js";

const router = Router();

router.post("/imagePrediction", imagePrediction) ;
router.post("/quizPrediction", quizPrediction) ;

router.post("/getCloudinaryConfigurations", (req, res) => {
    res.json({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
}) ; 

export default router ;