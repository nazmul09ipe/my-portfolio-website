import { Project } from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { dbConnected } from '../config/db.js';
import { getFallbackProjects } from '../utils/devFallback.js';

export const getProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;
    if (!dbConnected) {
      const projects = getFallbackProjects(featured).map((p, i) => ({
        ...p,
        _id: String(i + 1),
      }));
      return res.json({ success: true, data: projects });
    }
    const filter = featured === 'true' ? { featured: true } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, 'Project not found');
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (!dbConnected) throw new ApiError(503, 'Database unavailable');
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (!dbConnected) throw new ApiError(503, 'Database unavailable');
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) throw new ApiError(404, 'Project not found');
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (!dbConnected) throw new ApiError(503, 'Database unavailable');
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) throw new ApiError(404, 'Project not found');
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
