var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/pokeDB";

MongoClient.connect(url,
    function(err, db) 
    {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("pokeDB");
    var results = filtroThanos(dbo,1,"fire",-1)
    results.forEach(row => 
        {
        console.log(row);
        });
    }
);

function filtroThanos(dbo,gen,type,leg)
{ 
    if(gen==-1 && type==-1 && leg ==-1)
        {
            var results = dbo.collection("pokeCollection").find();
        }
    else
        {
            var filter1 = {$and: []};
            if(gen!=-1)
                {
                    filter1.$and.push({generation: gen});
                }
            if(type!=-1)
                {
                    filter1.$and.push({$or: [{type1:type},{type2:type}]});
                }
            if(leg!=-1)
                {
                    filter1.$and.push({is_legendary:1});
                }

                var results = dbo.collection("pokeCollection").find(filter1);
        }

    return results;
}