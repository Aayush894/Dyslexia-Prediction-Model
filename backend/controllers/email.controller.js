import expressAsyncHandler from "express-async-handler"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { validationResult } from "express-validator";
import nodemailer from 'nodemailer'; 

// Create transporter with SMTP configuration
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  console.log('Credentials obtained, sending message...');
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);

  var mailOptions = {
    from: email,
    to: "nicolatesladummy@gmail.com",
    subject: `username: ${name} || ${subject}`,
    text: message,
    html: '<h1>Mail is Sent</h1>'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error occurred. ' + err.message);
      res.status(500).json({ success: false, message: "Error occurred while sending email" });
    } else {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.status(200).json({ success: true, message: "Email sent successfully" });
    }
  });
});

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  try {
    const { name, email } = req.body;

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
}; 

const loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: "Try Login with correct credentials" });
    }

    const pwdCompare = await bcrypt.compare(req.body.password, user.password);

    if (!pwdCompare) {
      return res.status(400).json({ errors: "Try Login with correct credentials" });
    }

    const data = { 
      user: {
        id: user._id
      }
    }

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, authToken });
  } catch (error) {
    res.json({ success: false });
  }
};

export {
  sendEmail,
  registerUser,
  loginUser,
};
