require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
var flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Load User model
require('./models/Users');

// Passport Config
require('./config/passport')(passport);

// Load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// Load Keys
const keys = require('./config/keys');

// mongoose connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected'))
.catch(error => console.log(error));

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'me binu',
    resave: false,
    saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// global vars for flash and checking user is login or not
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Middleware for using static files.
app.use(express.static("public"));

// use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories); 

port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})