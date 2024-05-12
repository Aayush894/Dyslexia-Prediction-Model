import { Router } from "express";
import {
  loginUser,
  registerUser,
  sendEmail,
  UserProfile,
  uploadImage,
  GoogleloginUser,
  convertImageToText,
} from "../controllers/user.controller.js";
import path from 'path'; 
import fs from 'fs'; 

import multer from "multer"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/public/temp'); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.trim(); 
    cb(null, fileName); // Use the sanitized file name
  }
});

const upload = multer({ storage: storage });

const tempDir = path.join('backend', 'public', 'temp');

const deleteFilesInDir = (dirPath) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    fs.unlinkSync(filePath); 
    console.log(`Deleted file: ${filePath}`);
  });
};

const clearTempDirectory = (req, res, next) => {
  if (fs.existsSync(tempDir)) {
    console.log(`Clearing temporary directory: ${tempDir}`);
    deleteFilesInDir(tempDir);
  }

  next();
};

const router = Router();

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/googlelogin").post(GoogleloginUser);

router.route("/sendemail").post(sendEmail) ;

router.route("/profile").get(UserProfile) ; 

router.post('/upload', clearTempDirectory, upload.single('image'), uploadImage);

router.post('/uploadOnCloudinary', uploadOnCloudinary); 

router.post('/convertText', convertImageToText) ; 

export default router;