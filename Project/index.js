var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/newdb";

MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("newdb");
    var results = dbo.collection("students").find({});
    results.forEach(row => {
        console.log(row);
    });
});