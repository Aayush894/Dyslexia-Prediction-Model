import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Indicates whether to use SSL/TLS
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
      ciphers: "SSLv3",
    },
  });

  console.log("Credentials obtained, sending message...");
  const { name, email, subject, message } = req.body;

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: "nicolatesladummy@gmail.com",
    subject: `username: ${name} || ${subject}`,
    text: message,
    html: "<h1>Mail is Sent</h1>",
  };

  console.log(mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: " + info.response);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

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
    const usernameRegex = /^[a-zA-Z]+\d*$/;
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

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  // check for valid email id
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|kiet\.edu)$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  const user = await User.findOne({
    email,
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
});

const uploadImage = asyncHandler(async (req, res) => {
  const imagePath = req.file.path; // Path to the uploaded image file

  if (imagePath === undefined || imagePath === "") {
    throw new ApiError(400, "Image Path not found");
  }

  res.json({ imagePath: imagePath, ok: true });
});

const GoogleloginUser = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  // check for valid email id
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
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

const convertImageToText = asyncHandler(async (req, res) => {
  const url = req.body.url;

  var myHeaders = new Headers();
  myHeaders.append("apikey", process.env.IMAGE_TO_TEXT_API_KEY);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  let text = "";

  await fetch(
    `https://api.apilayer.com/image_to_text/url?url=${url}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((textresult) => (text = textresult))
    .catch((error) => console.log("error", error));

  if (text === "") {
    throw new ApiError(400, "No text found in the image");
  }

  res.json({
    status: true,
    text: text,
    message: "text fetch successfully",
  });
});

export {
  sendEmail,
  registerUser,
  loginUser,
  UserProfile,
  uploadImage,
  GoogleloginUser,
  convertImageToText,
};
