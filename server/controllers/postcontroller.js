const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    let imageUrl = null;
    if (req.file) imageUrl = `/uploads/${req.file.filename}`;

    const post = new Post({ title, body, author: req.userId, imageUrl });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.userId) return res.status(403).json({ msg: 'Unauthorized' });

    const { title, body } = req.body;
    if (title) post.title = title;
    if (body) post.body = body;

    if (req.file) {
      if (post.imageUrl) {
        const oldPath = `.${post.imageUrl}`;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      post.imageUrl = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.userId) return res.status(403).json({ msg: 'Unauthorized' });

    if (post.imageUrl) {
      const oldPath = `.${post.imageUrl}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const comment = { userId: req.userId, userName: req.userName || 'Unknown', text: req.body.text };
    post.comments.push(comment);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
