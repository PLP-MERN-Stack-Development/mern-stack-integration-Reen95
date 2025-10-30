import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Latest Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="border p-3 mb-3 rounded shadow">
          {post.imageUrl && <img src={`http://localhost:5000${post.imageUrl}`} alt="" className="w-full rounded mb-2" />}
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p>{post.body.substring(0, 100)}...</p>
          <Link className="text-blue-600 underline" to={`/posts/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
