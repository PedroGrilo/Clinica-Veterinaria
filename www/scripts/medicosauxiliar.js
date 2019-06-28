
const arrEspecialidade=[];

const arrGenero = ["Masculino","Feminino"]


function listarEspecialidade(idform) {
    var mainForm = document.getElementById(idform);

    createLabels("Especialidade:", mainForm); // Facil controlo
    createElements("SELECT", mainForm, "tipoEspecialidade" /*+ numSel*/, "form-control"); // ativar com o codigo debaixo!
    createBrs(mainForm);

    var getSelectTipo = document.getElementById("tipoEspecialidade"/*+ numSel*/); // ativar com o codigo debaixo!

     getSelectTipo.addEventListener("change", function () { // funcao que adiciona o novo select

         if(arrEspecialidade.length==this.value){
             id=this.id;
             if(!document.getElementById("otherespec"))
             createInputs(this.parentElement,"otherespec","text","form-control");
             other=document.getElementById("otherespec");
             other.placeholder="Outro";
             other.focus=true;
             other.id=this.id;
             this.id="filler";
         }
         
    });
    for (let i = -2; i < arrEspecialidade.length + 1; i++) {

        if (i == -2) {
            var option = document.createElement("option");
            option.text = "Indefinido";
            option.value = "";
            getSelectTipo.add(option);
            continue;
        }
        if (i == -1) {
            var optionsep = document.createElement("option");
            optionsep.text = "------------";
            optionsep.value = "";
            optionsep.disabled = true;
            getSelectTipo.add(optionsep);
            continue;
        }
            if (i != arrEspecialidade.length) {
                var option = document.createElement("option");
                option.text = arrEspecialidade[i];
                option.value = arrEspecialidade[i];
                option.id = arrEspecialidade[i];
                getSelectTipo.add(option);
            }
        if (i == arrEspecialidade.length) {
            var option = document.createElement("option");
            option.text = "Outro";
            option.value = i;
            option.id = "Outro";
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
            option.value = "";
            getSelectTipo.add(option);
            continue;
        }
        if (i == -1) {
            var optionsep = document.createElement("option");
            optionsep.text = "------------";
            optionsep.value = "";
            optionsep.disabled = true;
            getSelectTipo.add(optionsep);
            continue;
        }
        if (i != arr.length) {
            var option = document.createElement("option");
            option.text = arrGenero[i];
            option.value = arrGenero[i];
            option.id = arrGenero[i];
            getSelectTipo.add(option);
        }
        if (i == arr.length) {
            var option = document.createElement("option");
            option.text = "Outro";
            option.value = i;
            option.id = "Outro";
            getSelectTipo.add(option);
        }
    }
    getSelectTipo.options[0].disabled = true;
}

$(document).ready(() =>
        $.ajax({
            url: '/especialidades',
            type: 'GET',
            dataType: 'json',
            success: (data)=>{
                console.log("success");
                for (i in data) {
                   arrEspecialidade.push(data[i].especialidade);
                 }
                 listarEspecialidade("especialiadediv");
                 listarGenero("generodiv");
            } 
        })
);