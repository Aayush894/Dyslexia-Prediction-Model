import { Router } from "express";
import {
  imagePrediction,
  quizPrediction,
} from "../controllers/prediction.controller.js";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/imagePrediction", imagePrediction);
router.post("/quizPrediction", quizPrediction);

router.post("/getCloudinaryConfigurations", (req, res) => {
  res.json({
    ok: "true",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  });
});

router.post("/deleteImage", async (req, res) => {
  const { publicIds } = req.body; // Expecting an array of publicIds

  if (!publicIds || !Array.isArray(publicIds)) {
    return res
      .status(400)
      .json({ error: "No publicIds provided or publicIds is not an array" });
  }

  try {
    const result = await cloudinary.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "image",
    });
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
