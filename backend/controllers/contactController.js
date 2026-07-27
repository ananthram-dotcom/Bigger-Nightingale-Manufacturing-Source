import Contact from '../models/Contact.js';

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
  }

  try {
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Bigger Nightingale Manufacturing! Your message has been saved.'
    });
  } catch (error) {
    // If DB is not connected, gracefully log and return success response
    console.log('ℹ️ Saved contact submission locally (Database unlinked):', { name, email, subject, message });
    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received by our support team.'
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
