import express from "express";
const router = express.Router();
import {registerUser, loginUser, sendEmail} from '../controllers/email.controller.js'; 
import {body} from 'express-validator' ; 

router.post(
  "/signup",
  [
    body("email", "Incorrect Email").isEmail(),
    body('name').isLength({min : 5}),
    body("password", "Incorrect Password").isLength({ min: 3 }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 3 }),
  ],
  loginUser
);

router.post('/sendemail', sendEmail) ; 

export default router;
