const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendNotificationToTeam, sendConfirmationToUser } = require('../utils/emailService');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill all required fields (name, email, message)' });
    }

    // 1. Save to MongoDB
    const contact = new Contact({ name, email, company, service, message });
    await contact.save();
    console.log(`✅ Contact saved to DB: ${name} (${email})`);

    // 2. Send notification email to team
    try {
      await sendNotificationToTeam({ name, email, company, service, message });
      console.log(`📧 Notification email sent to team for: ${name}`);
    } catch (emailErr) {
      console.error('⚠️ Team notification email failed:', emailErr.message);
    }

    // 3. Send confirmation email to the user
    try {
      await sendConfirmationToUser({ name, email, service });
      await Contact.findByIdAndUpdate(contact._id, { emailSent: true });
      console.log(`📧 Confirmation email sent to: ${email}`);
    } catch (emailErr) {
      console.error('⚠️ User confirmation email failed:', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Contact submission error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact status (admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
