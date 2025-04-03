


const express = require('express');
const Blog = require('../models/Blog');
const authenticate = require('../middleware/auth');
const router = express.Router();

// GET all blogs
router.get('/', authenticate, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new blog
router.post('/', authenticate, async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlog = new Blog({ title, content, author, createdBy: req.user });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a blog
router.delete('/:id', authenticate, async (req, res) => {
  try {
    console.log('Blog ID to delete:', req.params.id);

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      // console.log('Blog not found');
      return res.status(404).json({ message: 'Blog not found' });
    }

    // console.log('Blog found:', blog);


    if (blog.createdBy !== req.user) {
      // console.log('Unauthorized to delete this blog');
      return res.status(403).json({ message: 'Unauthorized to delete this blog' });
    }

 
    await Blog.deleteOne({ _id: req.params.id });
    console.log('Blog deleted successfully');
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.createdBy !== req.user) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    blog.title = title;
    blog.content = content;
    blog.author = author;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;