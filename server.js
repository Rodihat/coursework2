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
app.use('/images', express.static(__dirname + '/static/coursework'), (req, res, err) =>{
    if(err){
        res.send("Cannot find image")//When doing front end, make this an alert
    }
})


//Logger middleware
app.use((req, res, next) => {
    console.log("Request IP -", req.ip);
    console.log("Request performed - ", req.method)
    next();
})
app.use(express.json());

app.listen(3000);
