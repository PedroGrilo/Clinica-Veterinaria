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
    if (retrievedObject[retrievedObject.length] == null)
        return 0;
    else
        return retrievedObject[retrievedObject.length].id;
}



function createObjects() {
    var mainForm = document.getElementById("mainForm");
    var marcacoes = document.getElementById("marcacoes");
    listarTipoConsulta();
    createElements("DIV", mainForm, "idDiv");
}


function createMarcacoes(medicoSelected){

    var medico = medicoSelected.value;

    document.getElementById("theadMarc").hidden = false;

    var tBody = document.getElementById("tbodySemana");

    removeChilds(tBody);

    var idHeader = document.getElementById("idHeader");

    idHeader.textContent="Marcaçoes dos proximos 7 dias -> Medico:  "+medico;


    for(var i = 0 ; i < 7; i++){
        var tr = document.createElement("TR");
        var date = new Date();
        var td = document.createElement("TD");
        var text = document.createTextNode(date.addDays(i));

        tr.setAttribute("id", "myTr" +i);
        tBody.appendChild(tr);
        td.appendChild(text);
        document.getElementById("myTr"+i).appendChild(td);

        var listaConsultasLocal = JSON.parse(localStorage.getItem('ListaConsultas'));

        for(var h = 0 ;h<listaConsultasLocal.length;h++){
            if((listaConsultasLocal[h].medico == medico) && (listaConsultasLocal[h].diaDaConsulta == text.textContent)){
                tr.setAttribute("class","checked");
                break;
            }   
        }

    }

}

function removeChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function getSelected(selectObject) {
    var elem = document.getElementById('idDiv');
    removeChilds(elem);
    var value = selectObject.value;
    listarMedicos(value);
}

function listarTipoConsulta() {

    var arr = JSON.parse(localStorage.getItem('Especialidade'));

    var mainForm = document.getElementById("mainForm");

    createLabels("Tipo de Consulta: ", mainForm);
    createElements("SELECT", mainForm, "tipoConsulta", "custom-select");
    createBrs(mainForm);

    var getSelectTipo = document.getElementById("tipoConsulta");
    getSelectTipo.setAttribute("onchange", "getSelected(this)");

    var option = document.createElement("option");
    option.text = "Escolher opção:";
    getSelectTipo.add(option);

    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.text = arr[i];
        getSelectTipo.add(option);
    }
    getSelectTipo.options[0].disabled = true;
}


function listarMedicos(opcao) {

    var mainForm = document.getElementById("idDiv");

    createBrs(mainForm);

    createLabels("Médicos: ", mainForm);

    createElements("SELECT", mainForm, "medicos", "custom-select");

    createBrs(mainForm);

    createBrs(mainForm);

    var getSelectMedicos = document.getElementById("medicos");
    getSelectMedicos.setAttribute("onClick", "createMarcacoes(this)");
    var founded = false;

    if (localStorage['ListaMedicos']) {
        var arr = JSON.parse(localStorage.getItem('ListaMedicos'));
        for (let i = 0; i < arr.length; i++) {
            if (opcao == arr[i].especialidade) {
                var option = document.createElement("option");
                option.text = arr[i].nome;
                getSelectMedicos.add(option);
                founded = true;
            }
        }

    }

    if (!founded) {
        var option = document.createElement("option");
        option.text = "Não existem médicos";
        getSelectMedicos.disabled = true;
        getSelectMedicos.add(option);
        var button = document.getElementById('submit');
        button.parentNode.removeChild(button);
    }

    createLabels("Dia da consulta:",mainForm);
    createInputs(mainForm,"dataInput","date","form-control");
    createBrs(mainForm);

    createButtons(mainForm, "submit", "submit", "btn btn-primary", "Submeter", "");
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

function saveModal(id) {

    var localStorageObjs = JSON.parse(localStorage.getItem('ListaConsultas'));
    var selectModal = document.getElementById("idSelect");

    for (let i = 0; i < localStorageObjs.length; i++) {
        if (localStorageObjs[i].id == id) {
            localStorageObjs[i].efetivada = selectModal.options[selectModal.selectedIndex].text;
        }
    }

    localStorage['ListaConsultas'] = JSON.stringify(localStorageObjs);
    ListaConsulta.apresentar();
}

function openModal(id, option) {

    var modal = document.getElementById('modal-body');
    var saveButton = document.getElementById('saveButton');
    var paymentButton = document.getElementById('paymentButton');

    removeChilds(modal);

    saveButton.setAttribute("onclick", "saveModal(" + id + ")");

    createLabels("Efetivada: ", modal);

    createElements("SELECT", modal, "idSelect", "custom-select");

    var selectModal = document.getElementById("idSelect");

    selectModal.setAttribute("onchange", "checkOption(this.value)");

    createOptions(selectModal, "Escolher Opção");
    createOptions(selectModal, "Sim");
    createOptions(selectModal, "Não");

    selectModal.options[0].disabled = true;

    if (option == "Sim")
        paymentButton.disabled = false;
    else
        paymentButton.disabled = true;

    checkOption(option);

    selectModal.value = option;
}

function checkOption(getSelected) {
    if (getSelected == "Sim")
        paymentButton.disabled = false;
    else
        paymentButton.disabled = true;
}


ListaConsulta.prototype.listarConsultas = function () {

    var today = false;

    console.log(this.consultas);
    if (this.consultas.length === 0) {
        return "<h4>Não existem consultas na base de dados!</h4>";

    } else {
        var resultado = `<table class='table'><thead class="thead-dark"><tr><th>Medico</th><th>Nome do Animal</th><th>Tipo de Consulta</th><th>Efetivada</th><th>Paga</th><th>Remover</th><th>Efetivar/Pagar</th></tr></thead>`;

        this.consultas.forEach(function (currentValue, index, array) {
            if (currentValue.diaDaConsulta === data.getDataAtual()) { // verificar se as consultas é para o dia atual
                var remove = `<td><a onclick="ListaConsulta.removerConsulta(` + currentValue.id + `)" class='far fa-times-circle'></a></td>`;
                resultado += "<tr><td> " + currentValue.medico + "</td><td> " + currentValue.nomeDoAnimal + "</td><td>" +
                    currentValue.tipoDeConsulta + "</td><td>" + currentValue.efetivada + "</td><td>" + currentValue.paga + "</td>" +
                    remove + "<td><a onclick='openModal(" + currentValue.id + ",`" + currentValue.efetivada + "`)' data-toggle='modal' data-target='#exampleModal'><i class='far fa-edit'></i></a></td></tr>";

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


function isNull(campo) {
    return (campo == "" || campo == null);
}

function alertAndFocus(campo, msg) {
    alert(msg);
    campo.focus();
    campo.setAttribute("class", "input-error form-control");
    return false;
}

function checkConsulta(medico, nomeAnimal, tipoConsulta, dataInput) {

    if (isNull(dataInput.value))
        alertAndFocus(dataInput, "Data inválida");
    else if (dataInput.value < data.getDataAtual())
        alertAndFocus(dataInput, "A data têm que ser igual ou superior à do dia de hoje");
    else if (isNull(nomeAnimal.value))
        alertAndFocus(nomeAnimal, "O campo 'Nome do Animal' é um obrigatório!");
    else if (isNull(tipoConsulta.value))
        alertAndFocus(tipoConsulta, "O campo 'Tipo de Consulta' é obrigatório!");
    else if (isNull(medico.value))
        alertAndFocus(medico, "Obrigatório escolher um médico");
    else if (medico.value == "Não existem médicos")
        alertAndFocus("Não existem médicos para este tipo de consulta");
    else
        return true;

}


ListaConsulta.acrescentar = function (consulta) {
    try {
        var dataInput = document.getElementById("dataInput");
        var nAnimal = document.getElementById("nomeAnimal");
        var tipoConsulta = document.getElementById("tipoConsulta");
        var medico = document.getElementById("medicos");
        if (checkConsulta(medico, nAnimal, tipoConsulta, dataInput)) {
            consulta = new ListaConsulta().acrescentarConsultas();
            consulta.acrescentarConsulta(new Consulta(ListaConsulta.getNumberOfConsultas() + 1, dataInput.value, medico.value, nAnimal.value, tipoConsulta.value, 'Não', 'Não'));
            alert("Consulta adicionada com sucesso");
            window.location.href = "index.html";
        }
    } catch (e) {
        throw "ERRO: " + e;
    }
};