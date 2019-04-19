var nombre = "Nombre de Pokemon";
var detalles = "Descripción detallada de las habilidades del Pokemon y toda la pesca"
var nPokemon = 5;
var pokemon = "e";

document.getElementById('nombre').innerHTML = nombre;
document.getElementById('detalles').innerHTML = detalles;

var pokemones = ["pokemon1", "pokemon2", "pokemon3", "otro más"];
var numeros = [1, 40, 321, 390];
var generaciones = [1, 2, 6, 6];

pokemones.forEach((value, i) => {
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(numeros[i]));
    td1.appendChild(document.createTextNode(value));
    td2.appendChild(document.createTextNode(generaciones[i]));
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    document.getElementById('pokemonTable').appendChild(tr);
});
