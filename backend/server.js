import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import filmsRouter from './routes/films.js';
import contactRouter from './routes/contact.js';
import authRouter from './routes/auth.js';


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/films', filmsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
