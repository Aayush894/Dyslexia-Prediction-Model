import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken" ; 
import bcrypt from "bcryptjs" ;

router.post(
  "/signup",
  [
    body("email", "Incorrect Email").isEmail(),
    body('name').isLength({min : 5}),
    body("password", "Incorrect Password").isLength({ min: 3 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10) ; 
    const securePassword = await bcrypt.hash(req.body.password, salt) ; 

    try {
      const { name, email} = req.body;

      const user = await User.create({
        name,
        password: securePassword,
        email,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);


router.post(
  "/login",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 3 }),
  ],
  async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { email} = req.body;
    
    try {

      const user = await User.findOne({email});
      // console.log(user) ; 

      if (!user) {
        res.status(400).json({ errors: "Try Login with correct credentials" })
      }

      const pwdCompare = await bcrypt.compare(req.body.password, user.password) ;

      if (!pwdCompare) {
        res.status(400).json({ errors: "Try Login with correct credentials" })
      }
      const data = { 
        user: {
          id: user._id
        }
      }

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, authToken});
      

    } catch (error) {

      res.json({success : false});
    }
  }
);
export default router;
