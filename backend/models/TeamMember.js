const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: String,
    image: String,
    imageUrl: String,
    email: String,
    phone: String,
    expertise: [String], // e.g., ['React', 'Node.js', 'AI/ML']
    socialLinks: {
      linkedin: String,
      twitter: String,
      github: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);
