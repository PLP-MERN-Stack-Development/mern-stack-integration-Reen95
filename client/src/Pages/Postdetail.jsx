import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addComment = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data);
      setComment('');
    } catch (err) {
      alert('Error adding comment');
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto border p-4 rounded shadow">
      {post.imageUrl && <img src={`http://localhost:5000${post.imageUrl}`} className="w-full rounded mb-3" />}
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="my-2">{post.body}</p>

      <h3 className="font-semibold mt-4 mb-2">Comments</h3>
      {post.comments.map((c, i) => (
        <p key={i} className="border-t py-1">{c.userName}: {c.text}</p>
      ))}

      <div className="mt-3">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Add comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={addComment} className="bg-blue-600 text-white px-4 py-2 rounded">Comment</button>
      </div>
    </div>
  );
};

export default PostDetail;
