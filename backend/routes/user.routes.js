import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  updatePass,
  sendEmail,
  UserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/update").post(updateUser);

router.route("/updatePass").post(updatePass);

router.route("/sendemail").post(sendEmail) ;

router.route("/profile").get(UserProfile) ; 

export default router;