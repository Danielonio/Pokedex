function load() {
    var mydata = JSON.parse(test);
    var planet1 = mydata[0].planet;
    var pol1 = mydata[0].population;
    var species = mydata[0].species;
    document.write(planet1 + "<br/>");
    document.write(pol1 + "<br/>" );
    document.write(species + "<br/>" );
} 