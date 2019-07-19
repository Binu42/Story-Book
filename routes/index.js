const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureguest} = require('../helper/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');

router.get('/', ensureguest, (req, res) => {
    res.render('index/welcome');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Story.find({user: req.user.id})
    .then(stories => {
        res.render('index/dashboard', {
            stories: stories
        });
    })
})

router.get('/about', (req, res) => {
    res.render('index/about');
})

router.get('/privacy', (req, res) => {
    res.render('index/privacy');
})

module.exports = router;