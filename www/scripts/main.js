$(document).ready(() => {
    initialize();
});


function initializeElements() {
    var body = document.getElementById('body');
    createElements("h4", document.getElementById("nowTime"), "dataAtual", "");
    document.getElementById("dataAtual").innerText = data.getDataAtual();
}

function initialize() {
    initializeElements();
    ListaConsulta.apresentar();
}

