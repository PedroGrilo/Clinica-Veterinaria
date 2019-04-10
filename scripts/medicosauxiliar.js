window.onload = function () {
    listarEspecialidade();

}
var numsel = 0;
var arr = ['Rastreio', 'Cirurgia', 'Vacina', 'Rotina'];
var arrused = [0, 0, 0, 0];
function listarEspecialidade() {

    var mainForm = document.getElementById("especialiadediv");

    createSpans("Especialidade #" + parseInt(numsel + 1) + " :", mainForm); // Facil controlo
    createElement("SELECT", mainForm, "tipoEspecialidade" + numsel, "form-control");
    createBrs(mainForm);

    var getSelectTipo = document.getElementById("tipoEspecialidade" + numsel);

    /* getSelectTipo.addEventListener("change", function () { // funcao que adiciona o novo select
         
         if(arr.length != this.value){ // Verifica se o Outro foi Selecionado
         arrused[this.value] = 1; // Diz que a pos X do array ja foi usada, melhor um array encadeado?
         numsel++; // Incrementa o numero de selects criados
         let bool = false;
         for (let i = 0; i < arrused.length; i++) { // ve se ja estao todos desativos caso não esteja abre acesso à criação do selct
             if (arrused[i] == 0) {
                 bool = true;
             }
         }
         if (bool == true) { // criação do novo select
             for (let i = 0; i < this.options.length; i++) { //desativa o selct antigo
                 if (i != parseInt(this.value + 2)) { // + 2, porque "Indefinido" e "--------"
                     this.options[i].disabled = true; // Desativa todas as opções menos a selecionada
                 }
             }
             listarEspecialidade();
         }
         }else{ // Caso seja selecionado
             // Adicionar codigo para adicionar uma especialização
         }
     });*/
    for (let i = -2; i < arr.length + 2; i++) {

        if (i == -2) {
            var option = document.createElement("option");
            option.text = "Indefinido";
            option.value = null;
            getSelectTipo.add(option);
            continue;
        }
        if (i == -1) {
            var optionsep = document.createElement("option");
            optionsep.text = "------------";
            optionsep.value = null;
            optionsep.disabled = true;
            getSelectTipo.add(optionsep);
            continue;
        }
        if (arrused[i] == 0) {
            if (i != arr.length) {
                var option = document.createElement("option");
                option.text = arr[i];
                option.value = i;
                getSelectTipo.add(option);
            }
        }
        if (i == arr.length) {
            var option = document.createElement("option");
            option.text = "Outro";
            option.value = i;
            getSelectTipo.add(option);
        }
    }
    getSelectTipo.options[0].disabled = true;
}


function initializeElements() {
    var body = document.getElementById('body');



    createElement("h4", document.getElementById("nowTime"), "dataAtual");


}

function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = data.getDataAtual();
}

window.onload = initialize();