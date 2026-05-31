import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    technologies: [{ type: String, trim: true }],
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ['fullstack', 'frontend', 'backend', 'other'],
      default: 'fullstack',
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
