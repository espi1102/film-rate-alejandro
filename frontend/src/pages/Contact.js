import React, { useState } from 'react';

function Contact() {
  const [data, setData] = useState({ name:'', email:'', message:'' });
  const handle = e => setData({ ...data, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/contact', {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
    });
    const resj = await res.json();
    alert(resj.message || 'Error');
    setData({ name:'', email:'', message:'' });
  };
  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-2xl mb-4">Contact Us</h2>
      <form onSubmit={submit} className="space-y-2">
        <input name="name" value={data.name} onChange={handle} placeholder="Name" className="w-full p-2 text-black" required/>
        <input name="email" value={data.email} onChange={handle} placeholder="Email" type="email" className="w-full p-2 text-black" required/>
        <textarea name="message" value={data.message} onChange={handle} placeholder="Message" className="w-full p-2 text-black" rows="4" required/>
        <button className="bg-red-600 text-black px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}

export default Contact;