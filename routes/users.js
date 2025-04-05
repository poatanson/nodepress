const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('user_list', { users });
});

router.post('/add', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User ({ name, email, password });
    await user.save();
    res.redirect('/users');
});

router.post('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});

module.exports = router;