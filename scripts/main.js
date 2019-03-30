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

function initialize() {
    var data = new Date();
    initializeElements();
    document.getElementById("dataAtual").innerText = "Consultas - " + data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    ListaConsulta.apresentar();
}

window.onload = initialize();