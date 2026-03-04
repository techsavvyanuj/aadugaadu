const Contact = require('../models/Contact');
const { sendNotificationToTeam, sendConfirmationToUser } = require('../utils/emailService');

// POST submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please fill all required fields' });
    }

    const contact = await Contact.create({ name, email, company, service, message });

    // Send notification to team (non-blocking — don't fail the request if email fails)
    try {
      await sendNotificationToTeam({ name, email, company, service, message });
    } catch (emailErr) {
      console.error('⚠️ Team notification failed:', emailErr.message);
    }

    // Send confirmation to user
    try {
      await sendConfirmationToUser({ name, email, service });
      await Contact.findByIdAndUpdate(contact._id, { emailSent: true });
    } catch (emailErr) {
      console.error('⚠️ User confirmation failed:', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET all contacts (admin)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PATCH update contact status (admin)
const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, error: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { submitContact, getAllContacts, updateContactStatus };
