import mongoose from 'mongoose';

const FilmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  ratingType: { type: String, enum: ['stars', 'percentage'], default: 'stars' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Film', FilmSchema);
