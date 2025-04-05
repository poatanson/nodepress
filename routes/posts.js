const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'name');
    res.render('posts', { posts });
});

router.post('/add', async (req, res) => {
    const { title, content } = req.body;
    await Post.create({
        title,
        content,
        author: req.session.userId
    });
    res.redirect('/posts');
});

router.post('/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id); 
    res.redirect('/posts');
});

module.exports = router;