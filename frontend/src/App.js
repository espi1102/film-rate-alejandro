import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FilmList from './components/FilmList';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // decode token to get username (skipping real decode for brevity)
      setUser({ username: 'User' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-red-500 p-6">
      <nav className="flex justify-center space-x-6 mb-8">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        {user ? (
          <>
            <span>Hello, {user.username}</span>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
      </Routes>
    </div>
);
}

export default App;
