const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    services: [String], // e.g., ['AI', 'Full Stack', 'Flutter']
    technologies: [String], // e.g., ['React', 'Node.js', 'MongoDB']
    image: String,
    imageUrl: String,
    link: String,
    clientName: String,
    results: String,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
