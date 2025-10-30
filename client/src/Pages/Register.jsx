import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      alert('Registration successful!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error registering');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Register</h2>
      <input type="text" name="name" placeholder="Name" className="border p-2 w-full mb-3" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={handleChange} />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
