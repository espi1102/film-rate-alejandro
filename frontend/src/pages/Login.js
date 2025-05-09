import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [signup, setSignup] = useState(false);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5001/api/auth/${signup?'signup':'signin'}`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ username, password })
    });
    const j = await res.json();
    if (j.token) {
      localStorage.setItem('token', j.token);
      onLogin({ username });
      nav('/');
    } else {
      alert(j.error || 'Error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-2xl mb-4">{signup?'Sign Up':'Login'}</h2>
      <form onSubmit={submit} className="space-y-2">
        <input value={username} onChange={e=>setU(e.target.value)} placeholder="Username" className="w-full p-2 text-black" required/>
        <input type="password" value={password} onChange={e=>setP(e.target.value)} placeholder="Password" className="w-full p-2 text-black" required/>
        <button className="bg-red-600 text-black px-4 py-2 rounded">{signup?'Sign Up':'Login'}</button>
      </form>
      <p className="mt-2">
        <button onClick={()=>setSignup(!signup)} className="underline">
          {signup?'Have an account? Login':'No account? Sign Up'}
        </button>
      </p>
    </div>
  );
}

export default Login;