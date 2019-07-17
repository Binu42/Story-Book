const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureguest} = require('../helper/auth');

router.get('/', ensureguest, (req, res) => {
    res.render('index/welcome');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('index/dashboard');
})

router.get('/about', (req, res) => {
    res.render('index/about');
})

router.get('/privacy', (req, res) => {
    res.render('index/privacy');
})

module.exports = router;