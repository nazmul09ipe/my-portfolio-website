import { Message } from "../models/Message.js";
import { ApiError } from "../utils/ApiError.js";
import { dbConnected } from "../config/db.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    let newMessage = null;

    // Save to database (if connected)
    if (dbConnected) {
      try {
        newMessage = await Message.create({
          name,
          email,
          subject,
          message,
        });
      } catch (dbError) {
        console.error("DB save failed:", dbError.message);
      }
    }

    // Respond immediately to the client
    res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: newMessage,
    });

    // Send email notification in the background
    setImmediate(() => {
      sendEmail({
        name,
        email,
        subject,
        message,
      }).catch((err) => {
        console.error("Email failed:", err.message);
      });
    });
  } catch (error) {
    // Only forward errors if a response hasn't been sent yet
    if (!res.headersSent) {
      next(error);
    } else {
      console.error("Error after response sent:", error);
    }
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!doc) {
      throw new ApiError(404, "Message not found");
    }

    res.json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);

    if (!doc) {
      throw new ApiError(404, "Message not found");
    }

    res.json({
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    next(error);
  }
};