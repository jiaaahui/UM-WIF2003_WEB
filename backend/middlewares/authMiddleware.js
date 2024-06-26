import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";

dotenv.config();

// To verify client's token is valid or not, then decode it to extract userid
export const userVerification = (req, res) => {
  const token = req.cookies.token;
  console.log("received token in backend: " + token);
  if (!token) {
    console.log("no token!!");
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("wrong token!!");
      return res.json({ status: false });
    } else {
      console.log("correct token");
      const user = await User.findById(data._id);
      // Sends back user's username if token is valid
      if (user) return res.json({ status: true, user: user });
      else return res.json({ status: false });
    }
  });
};

export const validateSignUp = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("username")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    next();
  },
];
