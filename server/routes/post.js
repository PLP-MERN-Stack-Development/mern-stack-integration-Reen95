const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createPost, getPosts, getPost, updatePost, deletePost, addComment } = require('../controllers/postController');
const auth = require('../middleware/auth');

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/comments', auth, addComment);

module.exports = router;
