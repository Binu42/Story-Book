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
        .populate('user')
        .sort({
            date: 'desc'
        })
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
                    req.flash('success_msg', 'Successfully Updated !')
                    res.redirect('/stories/show/' + story.id);
                })
        })
})

// Deleting of stories
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Story.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            req.flash('success_msg', 'Successfully Deleted !');
            res.redirect('/dashboard');
        })
})

// single Stories
router.get('/show/:id', (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .populate('user')
        .populate('comments.commentUser')
        .then(story => {
            if (story.status === 'public') {
                res.render('stories/show', {
                    story: story
                });
            } else {
                if (req.user) {
                    if (req.user.id == story.user._id) {
                        res.render('stories/show', {
                            story: story
                        });
                    } else {
                        req.flash('error_msg', 'You are not authorized to view this message.');
                        res.redirect('/stories');
                    }
                } else {
                    req.flash('error_msg', 'You are not authorized to view this message.');
                    res.redirect('/stories');
                }
            }

        })
})

// add story form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .then(story => {
            if (story.user._id == req.user.id) {
                res.render('stories/edit', {
                    Story: story
                });
            } else {
                req.flash('error_msg', "You can't edit it.");
                res.redirect('/stories');
            }

        })
})

router.get('/show', ensureAuthenticated, (req, res) => {
    res.render('stories/show');
});

// List stories of a user
router.get('/user/:userId', (req, res) => {
    Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .then(stories => {
            res.render('stories/index', {
                Stories: stories
            })
        })
})

// logged in user stories
router.get('/my', ensureAuthenticated, (req, res) => {
    Story.find({
            user: req.user.id
        })
        .populate('user')
        .then(stories => {
            res.render('stories/index', {
                Stories: stories
            })
        })
})

//  Adding New Story
router.post('/', ensureAuthenticated, (req, res) => {
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
            req.flash('success_msg', 'Your New Story Added !');
            res.redirect('/stories/show/' + story.id);
        })
})

router.post('/comment/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .then(story => {
            const newComment = {
                commentBody: req.body.commentBody,
                commentUser: req.user.id
            }

            story.comments.unshift(newComment);
            story.save()
                .then(story => {
                    req.flash('success_msg', 'Your Comment Added !');
                    res.redirect('/stories/show/' + story.id);
                })
        })
})

module.exports = router;