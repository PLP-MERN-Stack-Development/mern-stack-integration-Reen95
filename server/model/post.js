const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  comments: [CommentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
