const express = require('express');
const path = require('path');
// const bodyparser = require('body-parser');
const fs = require("fs");
const app = express();
const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ArtAcademy', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  
});

const JoinSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
  });
  


const Join = mongoose.model('Join', JoinSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded()) //to save the data as object

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/join', (req, res) => {
    res.status(200).render('join.pug');
})

app.post('/join', (req, res) => {
    var myData= new Join(req.body)
    myData.save().then(() => {
        res.send("this item has been saved")
    }).catch(() => {
        res.status(404).send("Error")
    });
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});