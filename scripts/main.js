
function initializeElements() {
    var body = document.getElementById('body');
    createElements("h4", document.getElementById("nowTime"), "dataAtual");
}

function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = data.getDataAtual();
    ListaConsulta.apresentar();
}
function initialize2(){
    var arrespec = ['Rastreio', 'Cirurgia', 'Vacina', 'Rotina'];
    var arrgenero = ['Masculino', 'Feminino'];
    if(!localStorage['Especialidade']){
        localStorage['Especialidade'] = JSON.stringify(arrespec);
    }
    if(!localStorage['Genero']){
        localStorage['Genero'] = JSON.stringify(arrgenero);
    }
};
window.onload = function(){
    initialize();
    initialize2();
}