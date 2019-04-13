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
        var resultado = `<h2>Lista de Medicos</h2>
        <table class=" table medtab">
            <tr>
                <th class ='medtab' scope="col" scope="col">Medico</th>
                <th class ='medtab' scope="col">Titulo</th>
                <th class ='medtab' scope="col">Genero</th>
                <th class ='medtab' scope="col">Email</th>
                <th class ='medtab' scope="col">Especialidade</th>
                <th class ='medtab' scope="col"></th>
                <th class ='medtab' scope="col"></th>
            </tr>`;

        this.medicos.forEach(function (currentValue, index, array) {
            resultado += "<tr>"+ 
                            "<td class ='medtab'> " + currentValue.nome + "</td>"+
                            "<td class ='medtab'> " + currentValue.titulo + "</td>"+
                            "<td class ='medtab'>" + currentValue.genero + "</td>"+
                            "<td class ='medtab'>" + currentValue.email + "</td>"+
                            "<td class ='medtab'>" + currentValue.especialidade +"</td>"+
                            "<td class ='medtab'><button class='editmed'><i class='fas fa-user-edit'></i></button></td>"+
                            "<td class ='medtab'><button class='editmed'><i class='fas fa-user-times'></i></button></td>"+
                            "</tr>";
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
    return retrievedObject.length;
}

ListaMedicos.acrescentar = function (medico) { //

    var nome = document.getElementById("nome").value;
    var titulo = document.getElementById("titulo").value;
    var genero = document.getElementById("genero").value;
    var email = document.getElementById("email").value;
    var especialidade = document.getElementById("tipoEspecialidade0").value;
    var foto = document.getElementById("foto").value;
    if (nome != "" && titulo != "" && genero != "" && email != "" && especialidade != "" && foto != "" && especialidade!=null) {
        medico = new ListaMedicos().acrescentarMedicos();
        ListaMedicos.getNumberOfMedicos();
        medico.acrescentarMedico(new Medico(ListaMedicos.getNumberOfMedicos(), nome, titulo, genero, email, especialidade, foto));
        ListaMedicos.apresentar(medico);
    } else {
        if(especialidade==null)
            alert("O medico necessita de ser especializado em algo");
        else
            alert("Obrigatório preencher todos os campos!");
    }


};