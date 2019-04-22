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

    grid.mongo = mongooseDrv.mongo;

    connection.once("open", () => {
        console.log("Conexión abierta");
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
    buffer = "";
    var mongooseDrv = require("mongoose");
    mongooseDrv.connect('mongodb://localhost/imagenesDB', { useMongoClient: true });
    var connection = mongooseDrv.connection;
    if (connection !== "undefined") {
       // console.log(connection.readyState.toString());
        var grid = require("gridfs-stream");

        var btoa = require('btoa');
        
        grid.mongo = mongooseDrv.mongo;

        connection.once("open", () => {
            console.log("Conexion abierta");
            var gridfs = grid(connection.db);
            if (gridfs) {        
                        readStream = gridfs.createReadStream({ filename: nombreImagen });
                        readStream.on("data", function (chunk) {
                            buffer +=btoa( chunk);
                        });
                
                        readStream.on("end", function () {
                            //console.log(buffer);
                                                 
                        });
            } else {
                console.log("No hay grid");
                
            }
        });
    } else {  
        console.log('No conectado');
    }
}

function busquedaNombre(numeroPokemon,getI)
{
    var imagenes=[];
    var fs = require("fs");
    const testFolder = '../Recursos Clase/pokemon';
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            if (file.startsWith(numeroPokemon+".") || file.startsWith(numeroPokemon+"-") )
            {
                console.log(file)
                let a=new Promise(function(resolve,reject){
                    resolve(getI(file));
                });               
                a.then(function(){console.log("ya");  imagenes[imagenes.length]=a; } );
                //console.log(imagenes);
            }
            
        });
        
        
    });
    return imagenes;
}
//getImage("427.png");
i=busquedaNombre(15,getImage);
console.log(i);
setTimeout(function () {
    console.log(i);
}, 6000);
