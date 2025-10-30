import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostForm from './pages/PostForm';
import PostDetail from './pages/PostDetail';
import './App.css';

function App() {
  return (
    <div className="container mx-auto p-4 font-sans">
      <nav className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">MERN Blog</h1>
        <div className="space-x-3">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/create">Create Post</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
