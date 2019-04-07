
function initializeElements() {
    var body = document.getElementById('body');

 

    createElement("h4", document.getElementById("nowTime"), "dataAtual");


}

function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = data.getDataAtual();
    ListaConsulta.apresentar();
}

window.onload = initialize();