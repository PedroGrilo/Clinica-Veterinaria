/**
 * Classe Consulta
 */
/**
 * @constructs Consulta
 */

function Consulta(diaDaConsulta, medico, nomeDoAnimal, tipoDeConsulta, efetivada, paga) {
    this.diaDaConsulta = diaDaConsulta;
    this.medico = medico;
    this.nomeDoAnimal = nomeDoAnimal;
    this.tipoDeConsulta = tipoDeConsulta;
    this.efetivada = efetivada;
    this.paga = paga;
}

/**
 * Classe Lista Consultas
 */
 
 /**
 * 
 * @constructs ListaConsultas
 * 
*/


function ListaConsulta() {
    if (localStorage['ListaConsultas']) {
        var retrievedObject = JSON.parse(localStorage.getItem('ListaConsultas'));
        this.consultas = retrievedObject;
    } else {
        this.consultas = [];
    }

}

ListaConsulta.prototype.saveConsultas = function () { //guardar no localStorage
    localStorage['ListaConsultas'] = JSON.stringify(this.consultas);
}

ListaConsulta.prototype.acrescentarConsulta = function (consulta) {
    this.consultas.push(consulta);
    this.saveConsultas();
}

ListaConsulta.prototype.acrescentarConsultas = function (consulta) {
    consulta = Array.prototype.slice.call(arguments); //Transformar o "arguments" num array par poder usar o forEach
    consulta.forEach(function (currentValue, index, array) {
        this.acrescentarConsulta(currentValue);
    }, this);
    return this;

};

ListaConsulta.prototype.listarConsultas = function () {

    var today = false;

    console.log(this.consultas);
    if (this.consultas.length === 0) {
        return "<h4>Não existem consultas na base de dados!</h4>";

    } else {
        var resultado = `<table><tr><th>Medico</th><th>Nome do Animal</th><th>Tipo de Consulta</th><th>Efetivada</th><th>Paga</th></tr>`;

        this.consultas.forEach(function (currentValue, index, array) {
            if (currentValue.diaDaConsulta === data.getDataAtual()) { // verificar se as consultas é para o dia atual
                resultado += "<tr><td> " + currentValue.medico + "</td><td> " + currentValue.nomeDoAnimal + "</td><td>" + currentValue.tipoDeConsulta + "</td><td>" + currentValue.efetivada + "</td><td>" + currentValue.paga + "</td></tr>";
                today = true;
            }
        });
        if (today)
            resultado += "</table>";
        else
            resultado = "<h4>Não existem consultas para hoje! :(</h4>";

        return resultado;
    }

};

ListaConsulta.prototype.getConsultasLocal = function () { //guardar as consultas no array de consultas
    if (localStorage['ListaConsultas']) {
        this.consultas = JSON.parse(localStorage['ListaConsultas']);
    }
}


ListaConsulta.apresentar = function (consulta) {
    consulta = consulta || new ListaConsulta().acrescentarConsultas();
    consulta.getConsultasLocal();
    document.getElementById("todayConsultation").innerHTML = consulta.listarConsultas();
    consulta.saveConsultas();

};


ListaConsulta.acrescentar = function (consulta) {

    var data = document.getElementById("data").value;
    var medico = document.getElementById("medico").value;
    var nAnimal = document.getElementById("nomeAnimal").value;
    var tipoConsulta = document.getElementById("tipoConsulta").value;

    if (data != "" && medico != "" && nAnimal != "") {
        consulta = new ListaConsulta().acrescentarConsultas();
        consulta.acrescentarConsulta(new Consulta(data, medico, nAnimal, tipoConsulta, 0, 0));
        ListaConsulta.apresentar(consulta);
    } else {
        alert("Obrigatório preencher todos os campos!");
    }


};