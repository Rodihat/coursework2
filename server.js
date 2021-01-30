//Set up express
let express = require("express");
let app = express();
let url = require("url");

//Connect to mongodb
const {MongoClient , ObjectID } = require('mongodb');
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
app.use((req, res, next) =>{
    console.log("Request IP -", req.ip);
    console.log("Request performed - ", req.method)
    console.log("Path - ", req.path)
    next();
})
console.log("test");
//Logger middleware

app.use(express.json());

//Serving static files
app.use(express.static('static'))

app.use(function(req, res, next) {
    // allow diff IP address
    res.header("Access-Control-Allow-Origin","*");
    // allow diff header fields
    res.header("Access-Control-Allow-Headers","*");
    next();
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

//To update items
app.put('/collection/:collectionName/:id', (req, res, next) => {
    
    req.collection.update(
        { _id: new ObjectID(req.params.id) },
        { "$inc": {"spaces" : -1 } },
        { safe: true, multi: false }, 
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
        })
            // allow diff IP address
    res.header("Access-Control-Allow-Origin","*");
    // allow diff header fields
    res.header("Access-Control-Allow-Headers","*");
});

const port = process.env.PORT || 3000
app.listen(port)
console.log("listening on port" ,port)
