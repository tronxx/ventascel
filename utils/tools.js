function input_en_row(campo_z ) {
    var input_z = "";
    input_z = "<td>" + campo_z.label + "</td>";
    input_z += "<td> <input type=\"" + campo_z.tipo + "\"";
    input_z += " id=\"" + campo_z.idcampo + "\"";
    input_z += " name=\"" + campo_z.nombre + "\" " ;
    input_z += " placeholder=\"" + campo_z.placeholder + "\" " ;
    input_z += " >";
    input_z += "</td>";
    return (input_z);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

