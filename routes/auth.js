const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/'
    }),
    function (req, res) {
        res.redirect('/dashboard');
    })

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function (req, res) {
        res.redirect('/dashboard');
    })


router.get('/github', passport.authenticate('github'));
router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    function (req, res) {
        res.redirect('/dashboard');
    });

router.get('/linkedin',
    passport.authenticate('linkedin'),
    function (req, res) {});

// router to receive request from linkedin
router.get('/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/dashboard', // successful authentication, redirect to secrets.
    failureRedirect: '/' // else redirect login
}));

router.get('/verify', (req, res) => {
    if (req.user) {
        console.log(req.user);
    } else {
        console.log('Not auth');
    }
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logged Out!')
    res.redirect('/');
})
module.exports = router;