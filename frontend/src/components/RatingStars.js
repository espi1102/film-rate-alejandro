import React, { useState } from 'react';

function RatingStars({ filmId, onRate }) {
  const [rating, setRating] = useState(0);
  const [mode, setMode] = useState('stars');

  const handleRating = (val) => {
    setRating(val);
    onRate(filmId, val, mode);
  };

  return (
    <div className="mt-2">
      <select value={mode} onChange={(e) => setMode(e.target.value)} className="p-1 text-black">
        <option value="stars">Stars</option>
        <option value="percentage">%</option>
      </select>

      {mode === 'stars' ? (
        <div className="mt-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => handleRating(s)} className="text-yellow-400 mx-1">
              ⭐
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-1 flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={rating}
            onChange={(e) => handleRating(+e.target.value)}
          />
          <span className="ml-2">{rating}%</span>
        </div>
      )}
    </div>
  );
}

export default RatingStars;
