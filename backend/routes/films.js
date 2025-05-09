import express from 'express';
import Film from '../models/Film.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const films = await Film.find().sort('-createdAt');
  res.json(films);
});

router.post('/', async (req, res) => {
  const { name, rating, ratingType } = req.body;
  const film = new Film({ name, rating, ratingType });
  await film.save();
  res.status(201).json(film);
});

router.put('/:id', async (req, res) => {
  const { name, rating, ratingType } = req.body;
  const updated = await Film.findByIdAndUpdate(req.params.id,
    { name, rating, ratingType }, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Film.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
