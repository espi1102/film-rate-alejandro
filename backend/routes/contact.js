import express from 'express';
import Contact from '../models/Contact.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const c = new Contact(req.body);
    await c.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    console.error('CONTACT ERROR:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

export default router;
