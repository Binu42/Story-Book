const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    linkedinID: String,
    facebookID: String,
    githubID: String,
    googleID: String,
    email: String,
    name: String, 
    image: {
        type: String
    }
});

mongoose.model('users', UserSchema);