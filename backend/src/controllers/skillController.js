import { Skill } from '../models/Skill.js';
import { ApiError } from '../utils/ApiError.js';
import { dbConnected } from '../config/db.js';
import { getFallbackSkills } from '../utils/devFallback.js';

export const getSkills = async (req, res, next) => {
  try {
    if (!dbConnected) {
      const skills = getFallbackSkills().map((s, i) => ({
        ...s,
        _id: String(i + 1),
      }));
      return res.json({ success: true, data: skills });
    }
    const skills = await Skill.find().sort({ order: 1, category: 1 });
    res.json({ success: true, data: skills });
  } catch (err) {
    next(err);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) throw new ApiError(404, 'Skill not found');
    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) throw new ApiError(404, 'Skill not found');
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
};
