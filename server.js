//Set up express
let express = require("express");
let app = express();
let path = require("path");

//Serve html files
app.use(express.static('static'));

//Connect to mongodb
const MongoClient = require('mongodb').MongoClient;
//Connecting to database
let db;
MongoClient.connect('mongodb+srv://me:mongo@cluster0.pkpaw.mongodb.net/test', (err, client) => {
    db = client.db('store');
});

app.listen(3000);