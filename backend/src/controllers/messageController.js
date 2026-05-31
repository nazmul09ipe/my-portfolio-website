import { Message } from '../models/Message.js';
import { ApiError } from '../utils/ApiError.js';
import { dbConnected } from '../config/db.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email, and message are required');
    }

    if (!dbConnected) {
      console.log('[dev] Contact message received (not persisted):', { name, email, subject });
      return res.status(201).json({
        success: true,
        data: { name, email, subject, message },
        message: 'Message received (dev mode — MongoDB not connected)',
      });
    }

    const doc = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: doc, message: 'Message sent successfully' });
  } catch (err) {
    next(err);
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
