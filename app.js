const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.send('it works');
})

port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})