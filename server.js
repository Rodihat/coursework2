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

app.get('/', (req, res, next) => {
    res.send('Homepage');
});

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

//Retrieve collection from database
//toArray() gives the actual result as find() only points to cursor of array
app.get('/collection/:collectionName', (req, res, next) => {
    let resultt;
    req.collection.find({}).toArray((e, results) => {
        if (e) return next (e)
        res.send(results)
        resultt = JSON.stringify(results);
        console.log(resultt)
    })
});

//To post to server
app.post('/collection/:collectionName', (req, res, next) => {
    
    req.collection.insertOne(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results.ops)
        let resultt = req.body
        console.log("Order details")
        console.log(JSON.stringify(resultt))
    })
});


app.listen(3000);
