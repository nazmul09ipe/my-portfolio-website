import { Message } from '../models/Message.js';
import { ApiError } from '../utils/ApiError.js';
import { dbConnected } from '../config/db.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    let newMessage = null;
    let dbSaved = false;

    // 1. Try to save to database first
    if (dbConnected) {
      try {
        newMessage = await Message.create({
          name,
          email,
          subject,
          message,
        });
        dbSaved = true;
      } catch (dbError) {
        console.error('Database save failed:', dbError.message);
      }
    } else {
      console.warn('Database not connected. Skipping save.');
    }

    // 2. Try to send email notification
    let emailSent = false;
    try {
      await sendEmail({
        name,
        email,
        subject,
        message,
      });
      emailSent = true;
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    // 3. Respond based on what succeeded
    if (dbSaved || emailSent) {
      return res.status(201).json({
        success: true,
        message: emailSent 
          ? 'Message received and notification sent.' 
          : 'Message received (notification pending).',
        data: newMessage,
      });
    }

    // Both failed
    throw new ApiError(503, 'Message service is currently unavailable. Please try again later.');
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!doc) throw new ApiError(404, 'Message not found');
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);
    if (!doc) throw new ApiError(404, 'Message not found');
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
