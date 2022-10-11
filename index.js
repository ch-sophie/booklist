// import express, mongoose, bodyparser
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const apiRoute = require("./routes/routes");

// define server port
const PORT = process.env.port || 5000;

const Db = process.env.MONGODB_URI;

dotenv.config();


// connect to my database
mongoose.connect(Db,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected to database'))
.catch((err) => console.log(err));

// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use routes
app.use('/', apiRoute);

app.use(express.json());

// send message for default route
app.get('/', (req, res) => {
    res.send("Express is running successfully!");
});

// listen to PORT (always at the bottom)
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});