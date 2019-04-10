/**
 * Classe Consulta
 */
/**
 * @constructs Consulta
 */

function Consulta(id, diaDaConsulta, medico, nomeDoAnimal, tipoDeConsulta, efetivada, paga) {
    this.id = id;
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

ListaConsulta.getNumberOfConsultas = function () {
    var retrievedObject = JSON.parse(localStorage.getItem('ListaConsultas'));

    if (retrievedObject[retrievedObject.length - 1] == null)
        return 0;
    else
        return retrievedObject[retrievedObject.length - 1].id;

}



function createObjects() {
    listarTipoConsulta();
    listarMedicos();
}

function listarTipoConsulta() {

    var arr = ['Rastreio', 'Cirurgia', 'Vacina', 'Rotina'];

    var mainDiv = document.getElementById("mainDiv");

    createLabels("Tipo de Consulta: ", mainDiv);
    createElement("SELECT", mainDiv, "tipoConsulta", "custom-select");
    createBrs(mainDiv);

    var getSelectTipo = document.getElementById("tipoConsulta");

    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.text = arr[i];
        getSelectTipo.add(option);

    }

}

function listarMedicos() {

    var mainDiv = document.getElementById("mainDiv");

    createBrs(mainDiv);


    createLabels("Médicos: ", mainDiv);

    createElement("SELECT", mainDiv, "medicos","custom-select");

    createBrs(mainDiv);

    createBrs(mainDiv);



    var getSelectMedicos = document.getElementById("medicos");

    if (localStorage['ListaMedicos']) {
        var arr = JSON.parse(localStorage.getItem('ListaMedicos'));
        for (let i = 0; i < arr.length; i++) {
            var option = document.createElement("option");
            option.text = arr[i].nome;
            getSelectMedicos.add(option);
        }

    } else {
        var option = document.createElement("option");
        option.text = "Não existem médicos";
        getSelectMedicos.disabled = true;
        getSelectMedicos.add(option);
    }
    createButtons(mainDiv, "submit", "submit", "btn btn-primary", "Submeter", "");
}

ListaConsulta.prototype.saveConsultas = function () { //guardar no localStorage
    localStorage['ListaConsultas'] = JSON.stringify(this.consultas);
}

ListaConsulta.prototype.acrescentarConsulta = function (consulta) {
    this.consultas.push(consulta);
    this.saveConsultas();
}

ListaConsulta.removerConsulta = function (posicao) {
    consulta = new ListaConsulta();
    var localStorageObjs = JSON.parse(localStorage.getItem('ListaConsultas'));
    for (let i = 0; i < localStorageObjs.length; i++) {
        if (localStorageObjs[i].id == posicao)
            localStorageObjs.splice(i, 1);
    }
    localStorage['ListaConsultas'] = JSON.stringify(localStorageObjs);
    ListaConsulta.apresentar(consulta);

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
        var resultado = `<table class='table'><thead class="thead-dark"><tr><th>Medico</th><th>Nome do Animal</th><th>Tipo de Consulta</th><th>Efetivada</th><th>Paga</th><th>Remover</th></tr></thead>`;

        this.consultas.forEach(function (currentValue, index, array) {
            if (currentValue.diaDaConsulta === data.getDataAtual()) { // verificar se as consultas é para o dia atual
                var remove = `<td><a onclick="ListaConsulta.removerConsulta(` + currentValue.id + `)" class='far fa-times-circle'></a></td>`;
                resultado += "<tr><td> " + currentValue.medico + "</td><td> " + currentValue.nomeDoAnimal + "</td><td>" + currentValue.tipoDeConsulta + "</td><td>" + currentValue.efetivada + "</td><td>" + currentValue.paga + "</td>" + remove + "</tr>";
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


function isNull(campo){
    return (campo == "" || campo == null);
}

function alertAndFocus(campo, msg){
        alert(msg);
        campo.focus();
}

function check(medico,nomeAnimal,tipoConsulta,dataInput){
    
    if(isNull(dataInput.value)){
        alertAndFocus(dataInput,"Data inválida");
        return false;
    }else if(dataInput.value < data.getDataAtual()){
        alertAndFocus(dataInput,"A data têm que ser igual ou superior à do dia de hoje");
        return false;
    }else if(isNull(nomeAnimal.value)){
        alertAndFocus(nomeAnimal,"O campo 'Nome do Animal' é um obrigatório!");
        return false;
    }else if(isNull(tipoConsulta.value)){
        alertAndFocus(tipoConsulta,"O campo 'Tipo de Consulta' é obrigatório!");
        return false;
    }else if(isNull(medico.value)){
        alertAndFocus(medico,"Obrigatório escolher um médico");
        return false;
    }else if(medico.value == "Não existem médicos"){
        alertAndFocus("Não existem médicos para este tipo de consulta");    
        return false;
    }
        return true;
    
}


ListaConsulta.acrescentar = function (consulta) {

    var dataInput = document.getElementById("dataInput");
    var nAnimal = document.getElementById("nomeAnimal");
    var tipoConsulta = document.getElementById("tipoConsulta");
    var medico = document.getElementById("medicos");
    if (check(medico,nAnimal,tipoConsulta,dataInput)) {
            consulta = new ListaConsulta().acrescentarConsultas();
            consulta.acrescentarConsulta(new Consulta(ListaConsulta.getNumberOfConsultas() + 1, dataInput.value, medico.value, nAnimal.value, tipoConsulta.value, 0, 0));
            
            alert("Consulta adicionada com sucesso");
            window.location.href = "index.html";
    }
};