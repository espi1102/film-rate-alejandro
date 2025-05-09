import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET value:", JWT_SECRET);


router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Username exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ username, password: hash }).save();
    const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('SIGNIN ERROR:', err);
    res.status(500).json({ error: 'Signin failed' });
  }
});

export default router;
