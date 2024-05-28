import { Router } from "express";
import {
  imagePrediction,
  quizPrediction,
  deleteImageControler, 
  wakeUpCall
} from "../controllers/prediction.controller.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/imagePrediction", imagePrediction);

router.post("/quizPrediction", quizPrediction);

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    if (result.result === "ok") {
      console.log('Image deleted successfully:', result);
      return true;
    } else {
      console.error('Failed to delete image:', result);
      return false;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

router.post("/deleteImage", async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: "Invalid publicId" });
  }

  try {
    const isDeleted = await deleteImage(publicId);

    if (isDeleted) {
      return res.json({ ok: "true" });
    } else {
      return res.status(500).json({ error: "Failed to delete image" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/wakeupcall", wakeUpCall);

router.post("/getCloudinaryConfigurations", (req, res) => {
  res.json({
    ok: "true",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  });
});

export default router;
