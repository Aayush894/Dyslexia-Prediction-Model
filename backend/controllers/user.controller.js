import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

// Create transporter with SMTP configuration
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  console.log("Credentials obtained, sending message...");
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);

  var mailOptions = {
    from: email,
    to: "nicolatesladummy@gmail.com",
    subject: `username: ${name} || ${subject}`,
    text: message,
    html: "<h1>Mail is Sent</h1>",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      res
        .status(500)
        .json({
          success: false,
          message: "Error occurred while sending email",
        });
    } else {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, age, phoneno } = req.body;

  if (
    [username, email, password, age, phoneno].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check for valid username format ie. only in lowercase
  const isValidUsername = (username) => {
    const usernameRegex = /^[a-z]+\d*$/;
    return usernameRegex.test(username);
  };

  // check for valid email id
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return emailRegex.test(email);
  };

  // check for valid age
  const isValidAge = (age) => {
    const ageInt = parseInt(age);
    return Number.isInteger(ageInt) && parseInt(ageInt) > 0;
  };

  // check for valid phoneno
const isValidPhoneNo = (phoneno) => {
  const phoneNoRegex = /^\d{10}$/; 
  return phoneNoRegex.test(phoneno);
};

  // check for valid password min length is 8.
  const isValidPassword = (password) => {
    const passwordRegex = /^.{4,}$/;
    return passwordRegex.test(password);
  };

  if (!isValidUsername(username)) {
    throw new ApiError(
      400,
      "Username must consist of lowercase letters followed by digits"
    );
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  if (!isValidAge(age)) {
    throw new ApiError(400, "Age must be a positive integer");
  }

  if (!isValidPassword(password)) {
    throw new ApiError(400, "Password must have min Length 4");
  }

  if (!isValidPhoneNo(phoneno)) {
    throw new ApiError(400, "Phone number is invalid");
  }

  // check existance of user with same username or email
  const existedUserWithUsername = await User.findOne({
    username,
  });

  const existedUserWithEmail = await User.findOne({
    email,
  });

  if (existedUserWithUsername) {
    throw new ApiError(409, "User with username already exists");
  }

  if (existedUserWithEmail) {
    throw new ApiError(409, "User with email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    username,
    email,
    password: securePassword,
    age,
    phoneno,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong when registering a user");
  }

  return res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "username or email is required");
  }

  // check for valid username format ie. only in lowercase
  const isValidUsername = (username) => {
    const usernameRegex = /^[a-z]+\d*$/;
    return usernameRegex.test(username);
  };

  // check for valid email id
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return emailRegex.test(email);
  };

  if (username && !isValidUsername(username)) {
    throw new ApiError(400, "Enter valid username");
  }

  if (email && !isValidEmail(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const authToken = await user.generateAuthToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("authToken", authToken, options)
    .json({ success: true, authToken });
});

const updatePass = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // check for valid password min length is 8.
  const isValidPassword = (password) => {
    const passwordRegex = /^.{4,}$/;
    return passwordRegex.test(password);
  };

  if (!isValidPassword(newPassword)) {
    throw new ApiError(400, "newPassword is Invalid");
  }

  try {
    const authToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      "";

    if (!authToken) {
      throw new ApiError(401, "Unauthorised request");
    }

    const decodedToken = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const salt = await bcrypt.genSalt(10);
    const secureNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = secureNewPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing password",
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, age, phoneno } = req.body;

  if (!username || !email || !age || !phoneno) {
    throw new ApiError(400, "All fields are required");
  }
  // check for valid username format ie. only in lowercase
  const isValidUsername = (username) => {
    const usernameRegex = /^[a-z]+\d*$/;
    return usernameRegex.test(username);
  };

  // check for valid email id
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return emailRegex.test(email);
  };

  // check for valid age
  const isValidAge = (age) => {
    const ageInt = parseInt(age);
    return Number.isInteger(ageInt) && parseInt(ageInt) > 0;
  };

  // check for valid phone number
  const isValidPhoneNo = (phoneno) => {
    const phoneNoRegex = /^\d{10}$/; 
    return phoneNoRegex.test(phoneno);
  };
  

  if (!isValidUsername(username)) {
    throw new ApiError(
      400,
      "Username must consist of lowercase letters followed by digits"
    );
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  if (!isValidAge(age)) {
    throw new ApiError(400, "Age must be a positive integer");
  }

  if (!isValidPhoneNo(phoneno)) {
    throw new ApiError(400, "Phone number cannot be empty");
  }

  try {
    const authToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      "";

    if (!authToken) {
      throw new ApiError(401, "Unauthorised request");
    }

    const decodedToken = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findByIdAndUpdate(
      decodedToken?._id,
      {
        $set: {
          username,
          email,
          age,
          phoneno,
        },
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      status: true,
      user,
      message: "Account details updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing details",
    });
  }
});

const UserProfile = asyncHandler(async (req, res) => {
  // console.log(req);
  try {
    const authToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      "";

    if (!authToken) {
      throw new ApiError(401, "Unauthorised request");
    }

    const decodedToken = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, user, message: "Fetched Data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending response",
    });
  }

})
export { sendEmail, registerUser, loginUser, updatePass, updateUser, UserProfile };
