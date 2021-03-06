var mongo = require('mongodb')
var express = require('express')
var bodyparser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var app = express()
var parser = bodyparser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
var stats = [{ item: 'hola', name: 'Nombre', pokedex_number: '#', generation: '#', abilities: 'a', height_m: 'a', weight_kg: 'a', japanese_name: '-', type1: 'a', type2: 'a'}];
var generacion = -1
var tipo = -1
var legendario = -1
var orden = 1
var dbo
var url = "mongodb://localhost:27017/pokeDB";

arrayResultado = [];
image = '';
rowId = 0;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");
    dbo = db.db("pokeDB");
}
);

function filtroThanos(dbo, gen, type, leg, order) {
    if (gen == -1 && type == -1 && leg == -1) {
        var results = dbo.collection("pokeCollection").find().sort({ 'pokedex_number': order });


    }
    else {
        var filter1 = { $and: [] };
        if (gen != -1) {
            filter1.$and.push({ generation: gen });
        }
        if (type != -1) {
            filter1.$and.push({ $or: [{ type1: type }, { type2: type }] });
        }
        if (leg != -1) {
            filter1.$and.push({ is_legendary: 1 });
        }
        var results = dbo.collection("pokeCollection").find(filter1).sort({ 'pokedex_number': order });
    }
    return results;
}
app.listen(3000);
app.use(express.static("public"));
app.get('/', function (req, res) {
    res.render('index', { currentImage: image, datos: stats, rowId: rowId});
});

app.post('/poke', parser, function (req, res) {
    this.generacion = parseInt(req.body.gen, 10);
    this.tipo = req.body.tipo;
    this.legendario = parseInt(req.body.legendario, 10);
    this.orden = parseInt(req.body.orden, 10);
    arrayResultado = [];

    var results = filtroThanos(dbo, this.generacion, this.tipo, this.legendario, this.orden);
    results.forEach(row => {
        arrayResultado.push(row);
    }, function () {
        if(arrayResultado[0].pokedex_number > 721) nombreImagen = "1.png";
        else nombreImagen = arrayResultado[0].pokedex_number + ".png";
        buffer = "";
        var mongooseDrv = require("mongoose");
        mongooseDrv.connect('mongodb://localhost/imagenesDB', { useMongoClient: true });
        var connection = mongooseDrv.connection;
        if (connection !== "undefined") {

            var grid = require("gridfs-stream");

            var btoa = require('btoa');

            grid.mongo = mongooseDrv.mongo;
            connection.once("open", () => {
                console.log("Conexion abierta");
                var gridfs = grid(connection.db);
                if (gridfs) {
                    readStream = gridfs.createReadStream({ filename: nombreImagen });
                    readStream.on("data", function (chunk) {
                        buffer += btoa(chunk);
                    });
                    readStream.on("end", function () {
                        image = "data:image/png;base64," + buffer;
                        res.render('index', { currentImage: image, datos: arrayResultado, rowId: rowId });
                    });
                } else {
                    console.log("No hay grid");
                }
            });
        } else {
            console.log('No conectado');
        }
    });
});

app.post('/row', parser, function (req, res) {
    rowId = parseInt(req.body.rowId,10);
    console.log(rowId);

    if(arrayResultado[rowId-1].pokedex_number > 721) nombreImagen = "1.png";
    else nombreImagen = arrayResultado[rowId-1].pokedex_number + ".png";
        buffer = "";
        var mongooseDrv = require("mongoose");
        mongooseDrv.connect('mongodb://localhost/imagenesDB', { useMongoClient: true });
        var connection = mongooseDrv.connection;
        if (connection !== "undefined") {

            var grid = require("gridfs-stream");

            var btoa = require('btoa');

            grid.mongo = mongooseDrv.mongo;
            connection.once("open", () => {
                console.log("Conexion abierta");
                var gridfs = grid(connection.db);
                if (gridfs) {
                    readStream = gridfs.createReadStream({ filename: nombreImagen });
                    readStream.on("data", function (chunk) {
                        buffer += btoa(chunk);
                    });
                    readStream.on("end", function () {
                        image = "data:image/png;base64," + buffer;
                        res.render('index', { currentImage: image, datos: arrayResultado, rowId: rowId-1 });
                    });
                } else {
                    console.log("No hay grid");
                }
            });
        } else {
            console.log('No conectado');
        }
});
