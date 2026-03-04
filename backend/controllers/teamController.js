const TeamMember = require('../models/TeamMember');

// GET all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: 1 });
    res.json({ success: true, count: team.length, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET single team member
const getTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found' });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST create team member
const createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update team member
const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found' });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE team member
const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found' });
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllTeamMembers, getTeamMember, createTeamMember, updateTeamMember, deleteTeamMember };
