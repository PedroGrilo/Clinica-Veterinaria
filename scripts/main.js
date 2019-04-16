
function initializeElements() {
    var body = document.getElementById('body');
    createElements("h4", document.getElementById("nowTime"), "dataAtual");
}

function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = data.getDataAtual();
    ListaConsulta.apresentar();
    var arr = ['Rastreio', 'Cirurgia', 'Vacina', 'Rotina'];
    var arrgen = ['Masculino', 'Feminino'];
    localStorage['Especialidade'] = JSON.stringify(arr);
    localStorage['Genero'] = JSON.stringify(arrgen);

}

window.onload = initialize();