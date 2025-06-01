import User from "../Modules/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../Utils/mailer.js";

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while registering user",
      error: error.message,
    });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while logging in",
      error: error.message,
    });
  }
};

//Forgot password

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:5173/reset-password/${user._id}/${token}`;

    const subject = "Password Reset Request";
    const text = `
Hi ${user.name},

You are receiving this email because you (or someone else) requested a password reset for your account.

Please click the following link or paste it into your browser to complete the process:
${resetLink}

If you did not request this, please ignore this email and your password will remain unchanged.

Thank you,
Your Application Team
    `;

    await sendEmail(user.email, subject, text);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email", token });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while processing forgot password",
      error: error.message,
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while resetting password",
      error: error.message,
    });
  }
};
