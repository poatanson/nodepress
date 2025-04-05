// 📄 routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 전체 게시글 목록
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'name');
    res.render('posts', { posts });
});

// 게시글 상세 보기
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).send('Post not found');
    res.render('postDetail', { post });
});

// 게시글 추가
router.post('/add', async (req, res) => {
    const { title, content } = req.body;
    await Post.create({
        title,
        content,
        author: req.session.userId
    });
    res.redirect('/posts');
});

// 게시글 삭제
router.post('/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id); 
    res.redirect('/posts');
});

module.exports = router;
