function createButtons(where, idName, type, classB, valueB, onclick) {
    var elementCreated = document.createElement("button");
    elementCreated.setAttribute("id", idName);
    elementCreated.setAttribute("type", type);
    elementCreated.setAttribute("class", classB);
    elementCreated.setAttribute("value", valueB);
    elementCreated.setAttribute("onclick", onclick);
    where.appendChild(elementCreated);
}

function createInputs(element, where, idName, type) {
    var elementCreated = document.createElement("" + element + "");
    elementCreated.setAttribute("type", type);
    elementCreated.setAttribute("id", idName);
    elementCreated.setAttribute("name", idName);
    elementCreated.setAttribute("name", idName);
    where.appendChild(elementCreated);
}

function createElement(element, where, idName) {
    var elementCreated = document.createElement("" + element + "");
    elementCreated.setAttribute("id", idName);
    where.appendChild(elementCreated);
}

function initializeElements() {
    var body = document.getElementById('body');

    createElement("div", body, "mainDiv");

    createElement("h3", document.getElementById("mainDiv"), "dataAtual");

    createElement("div", document.getElementById("mainDiv"), "todayConsultation");

}


/**
 * Classe Data
 */


/**
 * @constructs Data
 */

function Data() {
    var data = new Date();
    var mm = data.getMonth() + 1;
    var dd = data.getDate();

    if (dd < 10)
        dd = '0' + dd; //adicionar o 0
    if (mm < 10)
        mm = '0' + mm; //adicionar o 0

    this.ano = data.getFullYear();
    this.mes = mm;
    this.dia = dd;
}

Data.prototype.getDataAtual = function () {
    return this.ano + '-' + this.mes + '-' + this.dia;
}
Data.prototype.getAno = function () {
    return this.ano;
}

Data.prototype.getMes = function () {
    return this.mes;
}

Data.prototype.getDia = function () {
    return this.dia;
}

var data = new Data();

function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = "Consultas do dia - " + data.getDataAtual();
    ListaConsulta.apresentar();
}

window.onload = initialize();