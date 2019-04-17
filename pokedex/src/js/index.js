var nombre = "Nombre de Pokemon";
var detalles = "Descripción detallada de las habilidades del Pokemon y toda la pesca"
var nPokemon = 5;
var pokemon = "e";

document.getElementById('nombre').innerHTML = nombre;
document.getElementById('detalles').innerHTML = detalles;

var array = ["pokemon1", "pokemon2", "pokemon3", "otro más"], tr;

array.forEach((value, i) => {
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(i + 1));
    td1.appendChild(document.createTextNode("valor1"));
    td2.appendChild(document.createTextNode("valor2"));
    td3.appendChild(document.createTextNode("valor3"));
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    document.getElementById('pokemonTable').appendChild(tr);
});