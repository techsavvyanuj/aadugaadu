const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

// Get all team members
router.get('/', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create team member (admin)
router.post('/', async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update team member (admin)
router.put('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete team member (admin)
router.delete('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
