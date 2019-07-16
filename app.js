require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Passport Config
require('./config/passport')(passport);

// Load routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    res.send('it works');
})

// use routes
app.use('/auth', auth);

port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})