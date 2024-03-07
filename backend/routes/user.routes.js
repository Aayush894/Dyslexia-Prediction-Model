import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  updatePass,
  sendEmail,
  UserProfile,
  uploadImage,
  GoogleloginUser,
} from "../controllers/user.controller.js";
import path from 'path'; 
import fs from 'fs'; 

import multer from "multer"; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/temp'); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.trim(); 
    cb(null, fileName); // Use the sanitized file name
  }
});

const upload = multer({ storage: storage });

const tempDir = path.join('public', 'temp');

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

router.route("/update").post(updateUser);

router.route("/updatePass").post(updatePass);

router.route("/sendemail").post(sendEmail) ;

router.route("/profile").get(UserProfile) ; 

router.post('/upload', clearTempDirectory, upload.single('image'), uploadImage);

export default router;