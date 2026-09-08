import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { appendSubmission } from "./googleSheets.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json({ limit: "10kb" }));

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many submissions. Please try again later.",
  },
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.post(
  "/api/submissions",
  submissionLimiter,
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        message,
      } = req.body;

      // Basic validation
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: "Name and email are required.",
        });
      }

      if (name.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Name is too long.",
        });
      }

      if (email.length > 200) {
        return res.status(400).json({
          success: false,
          message: "Email is too long.",
        });
      }

      if (phone && phone.length > 50) {
        return res.status(400).json({
          success: false,
          message: "Phone number is too long.",
        });
      }

      if (message && message.length > 2000) {
        return res.status(400).json({
          success: false,
          message: "Message is too long.",
        });
      }

      // Basic email validation
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email.",
        });
      }

      await appendSubmission({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || "",
        message: message?.trim() || "",
      });

      return res.status(201).json({
        success: true,
        message: "Submission received successfully.",
      });
    } catch (error) {
      console.error("Submission error:", error);

      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  }
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});