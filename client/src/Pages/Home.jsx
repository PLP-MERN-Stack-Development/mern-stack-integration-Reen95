import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Login</h2>
      <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={handleChange} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
