// import express, mongoose, bodyparser
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();


// import route
const apiRoute = require("./routes/routes.js");

// initializing the app
const app = express();

// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to my database
mongoose.connect('mongodb+srv://admin:book-list123@booklist.lyzhjgc.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected to database'))
.catch((err) => console.log(err));

// define server port
const PORT = process.env.port || 3001;

// use routes
app.use('/', apiRoute);

// send message for default route
app.get('/', (req, res) => {
    res.send("Express is running successfully!");
});

// listen to PORT (always at the bottom)
app.listen(PORT, () => {
    console.log("Server has started on port " + PORT);
});