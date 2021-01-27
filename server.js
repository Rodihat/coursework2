//Set up express
let express = require("express");
let app = express();

//Connect to mongodb
const MongoClient = require('mongodb').MongoClient;
//Connect to database
let db;
MongoClient.connect('mongodb+srv://me:mongo@cluster0.pkpaw.mongodb.net/test', (err, client) => {
    db = client.db('school');
});

//Serve images
app.use('/images', express.static(__dirname + '/static/coursework'))




app.listen(3000);
