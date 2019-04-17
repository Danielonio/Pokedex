//Esta función guarda en mongo db todas las fotos de los pokemon en una nueva bd llamada imagenesDB
function guardaImg(){
    var mongooseDrv = require("mongoose");
    mongooseDrv.connect('mongodb://localhost/imagenesDB', { useMongoClient: true });
    var connection = mongooseDrv.connection;
if (connection !== "undefined") {
    console.log(connection.readyState.toString());
  
    var path = require("path");

    var grid = require("gridfs-stream");

    var fs = require("fs");

    var filesrc = path.join(__dirname, "../Recursos Clase/pokemon/1.png");

    grid.mongo = mongooseDrv.mongo;

    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {

            const testFolder = '../Recursos Clase/pokemon';
          
            fs.readdir(testFolder, (err, files) => {
             c=0;
              files.forEach(file => {
               c++;
                var filesrc = path.join(__dirname, "../Recursos Clase/pokemon/"+file);
                var streamwrite = gridfs.createWriteStream({
                   //nombre al almacenar en la bd (el mismo que el archivo)
                    filename: file
                });
                
                fs.createReadStream(filesrc).pipe(streamwrite);
                streamwrite.on("close", function (file) {
                   // console.log("Archivo almacenado");
                });
              });
              console.log(c + " archivos almacenados")
            });


        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
 
    console.log('Sorry not connected');
}
console.log("done");

} 


//Esta funcion devuelve la imagen en base64 que se llame como el parámetro que recive (incluyendo extensión)
function getImage(nombreImagen)   
{   
    var mongooseDrv = require("mongoose");
    mongooseDrv.connect('mongodb://localhost/imagenesDB', { useMongoClient: true });
    var connection = mongooseDrv.connection;
    if (connection !== "undefined") {
        console.log(connection.readyState.toString());
    
        var path = require("path");

        var grid = require("gridfs-stream");

        var fs = require("fs");

        var btoa = require('btoa');
        
        grid.mongo = mongooseDrv.mongo;

        buffer = "";
        connection.once("open", () => {
            console.log("Connection OpenNNNNNN");
            var gridfs = grid(connection.db);
            if (gridfs) {        
                        readStream = gridfs.createReadStream({ filename: nombreImagen });
                        readStream.on("data", function (chunk) {
                            buffer +=btoa( chunk);
                        });
                
                        // dump contents to console when complete
                        readStream.on("end", function () {
                            //var img = document.createElement('img');
                        //  img.src = 'data:image/jpeg;base64,' + btoa(buffer);
                        // document.body.appendChild(img);
                            console.log(buffer);
                        });

            } else {
                console.log("Sorry No Grid FS Object");
            }
        });
    } else {
    
        console.log('Sorry not connected');
}
console.log("done");
}



getImage("53.png");
