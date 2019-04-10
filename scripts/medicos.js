/**
 * Classe Medico
 */

/**
 * @constructs Medico
 */



function Medico(id, nome, titulo, genero, email, especialidade, foto) {
    this.id = id;
    this.nome = nome;
    this.titulo = titulo;
    this.genero = genero;
    this.email = email;
    this.especialidade = especialidade;
    this.foto = foto;
}

/*
 * Classe Lista de medicos
 */

/**
 * @constructs ListaMedicos
 */


function ListaMedicos() {
    if (localStorage['ListaMedicos']) {
        var retrievedObject = JSON.parse(localStorage.getItem('ListaMedicos'));
        this.medicos = retrievedObject;
    } else {
        this.medicos = [];
    }
}




ListaMedicos.prototype.saveMedicos = function () { //guardar no localStorage
    localStorage['ListaMedicos'] = JSON.stringify(this.medicos);
}

ListaMedicos.prototype.acrescentarMedico = function (medico) {
    this.medicos.push(medico);
    this.saveMedicos();
}

ListaMedicos.prototype.acrescentarMedicos = function (medico) {
    medico = Array.prototype.slice.call(arguments); //Transformar o "arguments" num array par poder usar o forEach
    medico.forEach(function (currentValue, index, array) {
        this.acrescentarMedico(currentValue);
    }, this);
    return this;

};

ListaMedicos.prototype.listarMedicos = function () {

    if (this.medicos.length === 0) {
        return "<h4>Não existem consultas na base de dados!</h4>";

    } else {
        var resultado = `<h2>Lista de Medicos</h2><table><tr><th>Medico</th><th>Titulo</th><th>Genero</th><th>Email</th><th>Especialidade</th></tr>`;

        this.medicos.forEach(function (currentValue, index, array) {
            resultado += "<tr><td> " + currentValue.nome + "</td><td> " + currentValue.titulo + "</td><td>" + currentValue.genero + "</td><td>" + currentValue.email + "</td><td>" + currentValue.especialidade + "</td></tr>";
            today = true;

        });
        resultado += "</table>";

        return resultado;
    }

};


ListaMedicos.prototype.getMedicosLocal = function () { //guardar as consultas no array de consultas
    if (localStorage['ListaMedicos']) {
        this.medicos = JSON.parse(localStorage['ListaMedicos']);
    }
}

ListaMedicos.apresentar = function (medico) {
    medico = medico || new ListaMedicos().acrescentarMedicos();
    medico.getMedicosLocal();
    document.getElementById("listaMedicos").innerHTML = medico.listarMedicos();
    medico.saveMedicos();

};


ListaMedicos.getNumberOfMedicos = function () {
    var retrievedObject = JSON.parse(localStorage.getItem('ListaMedicos'));

    if (retrievedObject[retrievedObject.length - 1] == null)
        return 0;
    else
        return retrievedObject[retrievedObject.length - 1].id;

}

ListaMedicos.acrescentar = function (medico) { //
    var nome = document.getElementById("nome").value;
    var titulo = document.getElementById("titulo").value;
    var genero = document.getElementById("genero").value;
    var email = document.getElementById("email").value;
    var especialidade = document.getElementById("tipoEspecialidade0").value;
    var foto = document.getElementById("foto").value;
    alert("DEBUG : \n" + nome + "\n" + titulo + "\n" + genero + "\n" + email + "\n" + especialidade + "\n" + foto + "\n");

    if (nome != "" && titulo != "" && genero != "" && email != "" && especialidade != "" && foto != "") {
        medico = new ListaMedicos().acrescentarMedicos();
        medico.acrescentarMedico(new Medico(ListaMedicos.getNumberOfMedicos, nome, titulo, genero, email, especialidade, foto));
        ListaMedicos.apresentar(medico);
    } else {
        alert("Obrigatório preencher todos os campos!");
    }


};