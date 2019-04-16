
// var numSel = 0; // ativar com o codigo debaixo!
// var arrUsed = [0, 0, 0, 0]; // ativar com o codigo debaixo!

function listarEspecialidade(idform) {

    var mainForm = document.getElementById(idform);

    createLabels("Especialidade:", mainForm); // Facil controlo
    createElements("SELECT", mainForm, "tipoEspecialidade" /*+ numSel*/, "form-control"); // ativar com o codigo debaixo!
    createBrs(mainForm);

    var getSelectTipo = document.getElementById("tipoEspecialidade"/*+ numSel*/); // ativar com o codigo debaixo!

     getSelectTipo.addEventListener("change", function () { // funcao que adiciona o novo select
         /*
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
     */
         if(arr.length==this.value){
             id=this.id;
             if(!document.getElementById("otherespec"))
             createInputs(this.parentElement,"otherespec","text","form-control");
             other=document.getElementById("otherespec");
             other.placeholder="Outro";
             other.focus=true;
             other.id=this.id;
             this.id="filler";
         }else{
             if(other=document.getElementById(id)){
                this.id=other.id;
                other.parentElement.removeChild(other);
            }
         }
         
    });
    for (let i = -2; i < arr.length + 1; i++) {

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
        /*if (arrUsed[i] == 0) {
            if (i != arr.length) {
                var option = document.createElement("option");
                option.text = arr[i];
                option.value = arr[i];
                getSelectTipo.add(option);
            }
        }*/
            if (i != arr.length) {
                var option = document.createElement("option");
                option.text = arr[i];
                option.value = arr[i];
                getSelectTipo.add(option);
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
function listarGenero(idform) {

    var mainForm = document.getElementById(idform);
    let id = idform.split("generodiv");
    id = id[1];
    createLabels("Genero:", mainForm); // Facil controlo
    createElements("SELECT", mainForm, "tipoGenero" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoGenero" + id);

    var arr = ['Masculino', 'Feminino'];
    for (let i = -2; i < arr.length + 1; i++) {

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
        if (i != arr.length) {
            var option = document.createElement("option");
            option.text = arr[i];
            option.value = arr[i];
            getSelectTipo.add(option);
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
    listarEspecialidade("especialiadediv");
    listarGenero("generodiv");
    initialize2();
}