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

    var mainForm = document.getElementById("mainForm");

    createSpans("Tipo de Consulta: ", mainForm);
    createElement("SELECT", mainForm, "tipoConsulta");
    createBrs(mainForm);
    createBrs(mainForm);

    var getSelectTipo = document.getElementById("tipoConsulta");

    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.text = arr[i];
        getSelectTipo.add(option);

    }

}

function listarMedicos() {

    var mainForm = document.getElementById("mainForm");

    createSpans("Médicos: ", mainForm);

    createElement("SELECT", mainForm, "medicos");

    createBrs(mainForm);

    createBrs(mainForm);


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
    createButtons(mainForm, "submit", "submit", "btn btn-warning", "Submeter", "");
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


ListaConsulta.acrescentar = function (consulta) {

    var dataInput = document.getElementById("dataInput").value;
    var nAnimal = document.getElementById("nomeAnimal").value;
    var tipoConsulta = document.getElementById("tipoConsulta").value;
    var medico = document.getElementById("medicos").value;
    if (medico != "" && nAnimal != "") {
        if (dataInput >= data.getDataAtual()) {
            consulta = new ListaConsulta().acrescentarConsultas();

            consulta.acrescentarConsulta(new Consulta(ListaConsulta.getNumberOfConsultas() + 1, dataInput, medico, nAnimal, tipoConsulta, 0, 0));
            ListaConsulta.apresentar(consulta);
        } else {
            alert("Data Inválida");
        }
    } else {
        alert("Obrigatório preencher todos os campos!");
    }
};