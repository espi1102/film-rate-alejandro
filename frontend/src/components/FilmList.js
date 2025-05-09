import React, { useEffect, useState } from 'react';
import RatingStars from './RatingStars';

function FilmList() {
  const [films, setFilms] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/films')
      .then(res => res.json())
      .then(setFilms);
  }, []);

  const addFilm = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/films', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: newName, rating: 0, ratingType: 'stars' })
    });
    const film = await res.json();
    setFilms([film, ...films]);
    setNewName('');
  };

  const deleteFilm = async id => {
    await fetch(`http://localhost:5001/api/films/${id}`, { method: 'DELETE' });
    setFilms(films.filter(f => f._id !== id));
  };

  const updateRating = async (id, rating, ratingType) => {
    const res = await fetch(`http://localhost:5001/api/films/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ rating, ratingType })
    });
    const updated = await res.json();
    setFilms(films.map(f => f._id === id ? updated : f));
  };

  return (
    <div className="max-w-2xl mx-auto bg-red-950 p-6 rounded">
      <h2 className="text-3xl font-bold mb-4">Your Films</h2>
      <form onSubmit={addFilm} className="mb-6 flex">
        <input
          className="flex-grow p-2 rounded text-black"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Add film"
        />
        <button className="bg-red-600 text-black px-4 py-2 ml-2 rounded">Add</button>
      </form>
      <ul className="space-y-4">
        {films.map(f => (
          <li key={f._id} className="bg-black p-4 rounded">
            <div className="flex justify-between">
              <strong>{f.name}</strong>
              <button onClick={() => deleteFilm(f._id)} className="text-red-400">Delete</button>
            </div>
            <RatingStars filmId={f._id} onRate={updateRating} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilmList;