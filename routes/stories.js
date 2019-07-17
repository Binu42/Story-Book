const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helper/auth');

// stories index
router.get('/', (req, res) => {
    res.render('stories/index');
})

// add story form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
})

router.get('/edit', ensureAuthenticated, (req, res) => {
    res.render('stories/edit');
})

router.get('/show', ensureAuthenticated, (req, res) => {
    res.render('stories/show');
})


module.exports = router;