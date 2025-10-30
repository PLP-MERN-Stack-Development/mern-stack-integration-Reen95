import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [form, setForm] = useState({ title: '', body: '' });
  const [file, setFile] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('body', form.body);
    if (file) formData.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Post created!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Create Post</h2>
      <input name="title" placeholder="Title" className="border p-2 w-full mb-3" onChange={handleChange} />
      <textarea name="body" placeholder="Content" className="border p-2 w-full mb-3 h-32" onChange={handleChange} />
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-3" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default PostForm;
