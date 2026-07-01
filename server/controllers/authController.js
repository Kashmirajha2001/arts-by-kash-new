import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import resetPasswordEmail from "../templates/resetPasswordEmail.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      providers: ["local"],
    });

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "lax",
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "User registered successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1
    const user = await User.findOne({ email });

    if (!user.providers.includes("local")) {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Step 2
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    // Step 3
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "lax",
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logoutUser = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully.",
    });
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        providers: ["google"],
        isEmailVerified: true,
      });
    } else {
      if (!user.providers.includes("google")) {
        user.providers.push("google");
      }

      user.isEmailVerified = true;

      if (!user.avatar) {
        user.avatar = picture;
      }

      await user.save();
    }

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Google login successful.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  console.log("1. Controller started");
  try {
    const { email } = req.body;

    console.log("2. Email:", email);
    const user = await User.findOne({ email });

    console.log("3. User found:", !!user);

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a reset link has been sent.",
      });
    }

    // Google-only accounts cannot reset via password
    if (!user.providers.includes("local")) {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google Sign-In. Please login with your google account!",
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    console.log("4. Creating reset token");

    // Store hashed token
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

    console.log("5. Saving user");

    await user.save();

    // Build reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log("CLIENT_URL:", process.env.CLIENT_URL);
    console.log("Reset Link:", resetLink);
    console.log("About to send email...");

    await sendEmail({
      to: user.email,
      subject: "Reset your Arts by Kash password",
      html: resetPasswordEmail(user.name, resetLink),
    });
    // await sendEmail();

    res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired.",
      });
    }

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
