const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../helper/auth');
const mongoose = require('mongoose');

const Story = mongoose.model('stories');
const User = mongoose.model('users');

// stories index
router.get('/', (req, res) => {
    Story.find({
            status: 'public'
        })
        .populate('users')
        .then(stories => {
            res.render('stories/index', {
                Stories: stories
            });
        })
})

// Editing of Story
router.put('/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .then(story => {
            var allowComment;
            if (req.body.allowComments) {
                allowComment = true;
            } else {
                allowComment = false;
            }
            story.name = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowComments = allowComment;
            story.user = req.user.id;

            story.save()
                .then(story => {
                    res.redirect('/stories/show/' + story.id);
                })
        })
})

// Deleting of stories
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Story.deleteOne({_id: req.params.id})
    .then(() => {
        res.redirect('/dashboard');
    })
})

// single Stories
router.get('/show/:id', (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .populate('users')
        .then(story => {
            res.render('stories/show', {
                story: story
            });
        })
})

// add story form
router.get('/add', (req, res) => {
    res.render('stories/add');
})

router.get('/edit/:id', (req, res) => {
    Story.find({
            _id: req.params.id
        })
        .then(story => {
            res.render('stories/edit', {
                Story: story
            });
        })
})

router.get('/show', (req, res) => {
    res.render('stories/show');
})

router.post('/', (req, res) => {
    var allowComment;
    if (req.body.allowComments) {
        allowComment = true;
    } else {
        allowComment = false;
    }

    const newStory = new Story({
        name: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComment,
        user: req.user.id
    });

    newStory.save()
        .then(story => {
            res.redirect('/stories/show/' + story.id);
        })
})


module.exports = router;