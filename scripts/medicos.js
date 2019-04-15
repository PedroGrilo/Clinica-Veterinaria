/**
 * Classe Medico
 */

/**
 * @constructs Medico
 */
arr = JSON.parse(localStorage["Especialidade"]);
arrgen = JSON.parse(localStorage["Genero"]);

function Medico(id, nome, titulo, genero, email, especialidade, foto) {
    this.id = id;
    this.nome = nome;
    this.titulo = titulo;
    this.genero = genero;
    this.email = email;
    this.especialidade = especialidade;
    this.foto = foto;
}

/*
 * Classe Lista de medicos
 */

/**
 * @constructs ListaMedicos
 */


function ListaMedicos() {
    if (localStorage['ListaMedicos']) {
        var retrievedObject = JSON.parse(localStorage.getItem('ListaMedicos'));
        this.medicos = retrievedObject;
    } else {
        this.medicos = [];
    }
}




ListaMedicos.prototype.saveMedicos = function () { //guardar no localStorage
    localStorage['ListaMedicos'] = JSON.stringify(this.medicos);
}

ListaMedicos.prototype.acrescentarMedico = function (medico) {
    this.medicos.push(medico);
    this.saveMedicos();
}

ListaMedicos.prototype.acrescentarMedicos = function (medico) {
    medico = Array.prototype.slice.call(arguments); //Transformar o "arguments" num array par poder usar o forEach
    medico.forEach(function (currentValue, index, array) {
        this.acrescentarMedico(currentValue);
    }, this);
    return this;

};

ListaMedicos.prototype.listarMedicos = function () {

    if (this.medicos.length === 0) {
        return "<h4>Não existem médicos na base de dados!</h4>";

    } else {
        var resultado = `
        <table class=" table medtab">
            <tr>
                <th class ='medtab' scope="col" scope="col">Medico</th>
                <th class ='medtab' scope="col">Titulo</th>
                <th class ='medtab' scope="col">Genero</th>
                <th class ='medtab' scope="col">Email</th>
                <th class ='medtab' scope="col">Especialidade</th>
                <th class ='medtab' scope="col">Editar</th>
                <th class ='medtab' scope="col">Remover</th>
            </tr>`;

        this.medicos.forEach(function (currentValue, index, array) {
            resultado += "<tr>" +
                "<td class ='medtab'><div id ='nome" + currentValue.id + "'>" + currentValue.nome + "</div></td>" +
                "<td class ='medtab'><div id ='titulo" + currentValue.id + "'>" + currentValue.titulo + "</div></td>" +
                "<td class ='medtab'><div id ='genero" + currentValue.id + "'>" + currentValue.genero + "</div></td>" +
                "<td class ='medtab'><div id ='email" + currentValue.id + "'>" + currentValue.email + "</div></td>" +
                "<td class ='medtab'><div id ='especialidade" + currentValue.id + "'>" + currentValue.especialidade + "</div></td>" +
                "<td class ='medtab'><div id='ico" + currentValue.id + "'><button onclick=EditarMed(" + currentValue.id + ") class='editmed'><i' class='fas fa-user-edit'></i></button></div></td>" +
                "<td class ='medtab'><div id='ico_s" + currentValue.id + "'><button onclick=ListaMedicos.removerMedicos(" + currentValue.id + ") class='editmed'><i class='fas fa-user-times'></i></button></div></td>" +
                "</tr>";
            today = true;

        });
        resultado += "</table>";

        return resultado;
    }

};

ListaMedicos.prototype.getMedicosLocal = function () { //guardar as consultas no array de consultas
    if (localStorage['ListaMedicos']) {
        this.medicos = JSON.parse(localStorage['ListaMedicos']);
    }
}

ListaMedicos.apresentar = function (medico) {
    medico = medico || new ListaMedicos().acrescentarMedicos();
    medico.getMedicosLocal();
    document.getElementById("listaMedicos").innerHTML = medico.listarMedicos();
    medico.saveMedicos();

};

ListaMedicos.removerMedicos = function (posicao) {
    medico = new ListaMedicos();
    var localStorageObjs = JSON.parse(localStorage.getItem('ListaMedicos'));
    for (let i = 0; i < localStorageObjs.length; i++) {
        if (localStorageObjs[i].id == posicao)
            localStorageObjs.splice(i, 1);
    }
    localStorage['ListaMedicos'] = JSON.stringify(localStorageObjs);
    ListaMedicos.apresentar(medico);
}


ListaMedicos.getNumberOfMedicos = function () {
    var retrievedObject = JSON.parse(localStorage.getItem('ListaMedicos'));
    return retrievedObject.length;
}

ListaMedicos.acrescentar = function (medico) { //
    var nome = document.getElementById("nome");
    var titulo = document.getElementById("titulo");
    var genero = document.getElementById("tipoGenero");
    var email = document.getElementById("email");
    var especialidade = document.getElementById("tipoEspecialidade");
    var foto = document.getElementById("foto");
    switch (parseInt(especialidade.value)) {
        case 0:
            espec= arr[0];
            break;
        case 1:
            espec = arr[1];
            break;
        case 2:
            espec = arr[2];
            break;
        case 3:
            espec = arr[3];
            break;
        case 4:
            espec = "Outro";
            break;
        default:
            espec = "";
            break;
    }

    switch (parseInt(genero.value)) {
        case 0:
            gen = "Masculino";
            break;
        case 1:
            gen = "Feminino";
            break;
        case 2:
            gen = "Outro";
            break;
        default:
            gen = "";
            break;
    }


    if (checkMedicos(nome,titulo,email,genero,especialidade,foto)) {
        medico = new ListaMedicos().acrescentarMedicos();
        ListaMedicos.getNumberOfMedicos();
        medico.acrescentarMedico(new Medico(ListaMedicos.getNumberOfMedicos() + 1, nome.value, titulo.value, gen, email.value, espec, foto.value));
        location.reload();
    } else {
        if (especialidade == null)
            alert("O medico necessita de ser especializado em algo");
        else
            alert("Obrigatório preencher todos os campos!");
    }


};
ListaMedicos.prototype.saveEditMedicos = function (id) {
    id = JSON.parse(id);
    id = id[0];
    let nome = document.getElementById("nomeinp" + id);
    let titulo = document.getElementById("tituloinp" + id);
    let genero = document.getElementById("tipoGenero" + id);
    let email = document.getElementById("emailinp" + id);
    let espec = document.getElementById("tipoEspecialidade" + id);
    switch (parseInt(espec.value)) {
        case 0:
            espec = arr[0];
            break;
        case 1:
            espec = arr[1];
            break;
        case 2:
            espec = arr[2];
            break;
        case 3:
            espec = arr[3];
            break;
        case 4:
            espec = "Outro";
            break;
        default:
            espec = "";
            break;
    }

    switch (parseInt(genero.value)) {
        case 0:
            genero = "Masculino";
            break;
        case 1:
            genero = "Feminino";
            break;
        case 2:
            genero = "Outro";
            break;
        default:
            genero = "";
            break;
    }

    medico = new ListaMedicos();
    var localStorageObjs = JSON.parse(localStorage.getItem('ListaMedicos'));
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (let i = 0; i < localStorageObjs.length; i++) {
        if (localStorageObjs[i].id == id) {
            if (nome.value != "" && titulo.value != "" && email.value != "" && genero != "" && espec != "" && re.test(String(email.value).toLowerCase()) == true) {
                
                localStorageObjs[i].nome = nome.value;
                localStorageObjs[i].titulo = titulo.value;
                localStorageObjs[i].email = email.value;
                localStorageObjs[i].especialidade = espec;
                localStorageObjs[i].genero = genero;
                let newdata = JSON.stringify([id, nome.value, titulo.value, email.value, genero, espec])
                undo(newdata);
            } else {
                alert("Todos os campos têm que estar preenchidos!");
            }
        }

    }
    localStorage['ListaMedicos'] = JSON.stringify(localStorageObjs);
}

function removeChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function undo(id) {
    id = JSON.parse(id);
    let nomevalor = id[1];
    let titulovalor = id[2];
    let emailvalor = id[3];
    let generovalor = id[4];
    let especvalor = id[5];
    id = id[0];
    let nome = document.getElementById("nomeinp" + id).parentElement;
    let titulo = document.getElementById("tituloinp" + id).parentElement;
    let genero = document.getElementById("tipoGenero" + id).parentElement;
    let email = document.getElementById("emailinp" + id).parentElement;
    let espec = document.getElementById("tipoEspecialidade" + id).parentElement;
    let icon1 = document.getElementById("ico" + id);
    let icon2 = document.getElementById("ico_s" + id);
    removeChilds(nome);
    removeChilds(titulo);
    removeChilds(genero);
    removeChilds(email);
    removeChilds(espec);
    removeChilds(icon1);
    removeChilds(icon2);
    nome.textContent = nomevalor;
    titulo.textContent = titulovalor;
    email.textContent = emailvalor;
    genero.textContent = generovalor;
    espec.textContent = especvalor;

    let btn1 = document.createElement("button");
    btn1.setAttribute("id", "btnicp" + id);
    btn1.className = "editmed";
    btn1.setAttribute("onclick", "EditarMed(" + id + ")");
    icon1.appendChild(btn1);

    let btn2 = document.createElement("button");
    btn2.setAttribute("id", "btnics" + id);
    btn2.className = "editmed";
    btn2.setAttribute("onclick", "undo(" + id + ")");
    icon2.appendChild(btn2);

    createElements("i", document.getElementById("btnicp" + id), "", "fas fa-user-edit");
    createElements("i", document.getElementById("btnics" + id), "", "fas fa-user-times");
}

function removeChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function EditarMed(id) {

    let nome = document.getElementById("nome" + id);
    let titulo = document.getElementById("titulo" + id);
    let genero = document.getElementById("genero" + id);
    let email = document.getElementById("email" + id);
    let espec = document.getElementById("especialidade" + id);
    let icon1 = document.getElementById("ico" + id);
    let icon2 = document.getElementById("ico_s" + id);
    let nomevalor = nome.textContent;
    let titulovalor = titulo.textContent;
    let emailvalor = email.textContent;
    let generovalor = genero.textContent;
    let especvalor = espec.textContent;
    removeChilds(nome);
    removeChilds(titulo);
    removeChilds(genero);
    removeChilds(email);
    removeChilds(espec);
    removeChilds(icon1);
    removeChilds(icon2);

    createInputs("input", nome, "nomeinp" + id);
    createInputs("input", titulo, "tituloinp" + id);
    listarGenero(genero.id);
    createInputs("input", email, "emailinp" + id);
    listarEspecialidade(espec.id);

    let nomeinp = document.getElementById("nomeinp" + id);
    let tituloinp = document.getElementById("tituloinp" + id);
    let emailinp = document.getElementById("emailinp" + id,"email");
    nomeinp.placeholder = nomevalor;
    tituloinp.placeholder = titulovalor;
    emailinp.placeholder = emailvalor;

    let btn1 = document.createElement("button");
    btn1.setAttribute("id", "btnicp" + id);
    btn1.className = "editmed";
    arrval = [id, nomevalor, titulovalor, emailvalor, generovalor, especvalor];
    btn1.value = JSON.stringify(arrval);
    btn1.setAttribute("onclick", "ListaMedicos.prototype.saveEditMedicos(this.value)");
    icon1.appendChild(btn1);

    let btn2 = document.createElement("button");
    btn2.setAttribute("id", "btnics" + id);
    btn2.className = "editmed";
    arrval = [id, nomevalor, titulovalor, emailvalor, generovalor, especvalor];
    btn2.value = JSON.stringify(arrval);
    btn2.setAttribute("onclick", "undo(this.value)");
    icon2.appendChild(btn2);

    createElements("i", document.getElementById("btnicp" + id), "", "fas fa-user-check");
    createElements("i", document.getElementById("btnics" + id), "", "fas fa-undo");
}

function listarEspecialidade(idform) {

    var mainForm = document.getElementById(idform);
    let id = idform.split("especialidade");
    id = id[1];
    createElements("SELECT", mainForm, "tipoEspecialidade" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoEspecialidade" + id);

    
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
            option.value = i;
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
    let id = idform.split("genero");
    id = id[1];
    createElements("SELECT", mainForm, "tipoGenero" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoGenero" + id);

    for (let i = -2; i <= arrgen.length ; i++) {

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
            option.text = arrgen[i];
            option.value = i;
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


function isNull(campo) {
    return (campo == "" || campo == null);
}

function alertAndFocus(campo, msg) {
    alert(msg);
    campo.focus();
    campo.setAttribute("class", "input-error form-control");
    return false;
}

function checkMedicos(nome, titulo, email, genero,especialidade,foto)  {
    if(isNull(nome.value)){
        alertAndFocus(nome, "Campo: Nome vazio");
    }else if(isNull(titulo.value)){
        alertAndFocus(titulo, "Campo: Titulo vazio");
    }else if(isNull(email.value)){
        alertAndFocus(email, "Campo: Email vazio");
    }else if(isNull(genero.value)){
        alertAndFocus(genero, "Campo: Genero vazio");
    }else if(isNull(especialidade.value)){
        alertAndFocus(especialidade, "Campo: Especialidade vazio");
    }else if(isNull(foto.value)){
        alertAndFocus(foto, "Campo: Foto vazio");
    }else{
        return true;
    }
    
}

function initializeElements() {
    var body = document.getElementById('body');
    createElements("h4", document.getElementById("nowTime"), "dataAtual");
}

function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = data.getDataAtual();
}
