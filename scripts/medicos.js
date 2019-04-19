/**
 * Classe Medico
 */

/**
 * @constructs Medico
 */
arr = JSON.parse(localStorage["Especialidade"]);
arrgen = JSON.parse(localStorage["Genero"]);
function initialize2() {
    var arrespec = ['Rastreio', 'Cirurgia', 'Vacina', 'Rotina'];
    var arrgenero = ['Masculino', 'Feminino'];
    if (!localStorage['Especialidade']) {
        localStorage['Especialidade'] = JSON.stringify(arrespec);
    }
    if (!localStorage['Genero']) {
        localStorage['Genero'] = JSON.stringify(arrgenero);
    }
};
window.onload = function () {
    initialize2();
    ListaMedicos.apresentar();
}
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
        var retrievedObject = JSON.parse(localStorage["ListaMedicos"]);
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
        <table class="table medtab">
            <thead class="thead-dark">
            <tr>
                <th>Medico</th>
                <th>Titulo</th>
                <th>Genero</th>
                <th>Email</th>
                <th>Especialidade</th>
                <th>Editar</th>
                <th>Apagar/Undo</th>
            </tr>
        </thead>`;

        this.medicos.forEach(function (currentValue, index, array) {
            resultado += "<tr>" +
                "<td><div id ='nome" + currentValue.id + "'>" + currentValue.nome + "</div></td>" +
                "<td><div id ='titulo" + currentValue.id + "'>" + currentValue.titulo + "</div></td>" +
                "<td><div id ='genero" + currentValue.id + "'>" + currentValue.genero + "</div></td>" +
                "<td><div id ='email" + currentValue.id + "'>" + currentValue.email + "</div></td>" +
                "<td><div id ='especialidade" + currentValue.id + "'>" + currentValue.especialidade + "</div></td>" +
                "<td><div id='ico" + currentValue.id + "'><button onclick=EditarMed(" + currentValue.id + ") class='editmed'><i' class='fas fa-user-edit'></i></button></div></td>" +
                "<td><div id='ico_s" + currentValue.id + "'><button onclick=ListaMedicos.removerMedicos(" + currentValue.id + ") class='editmed'><i class='fas fa-user-times'></i></button></div></td>" +
                "</tr>";
            today = true;

        });
        resultado += "</table>";

        return resultado;
    }

};

/**
 * Description
 * @method getMedicosLocal
 */
 ListaMedicos.prototype.getMedicosLocal = function () { //guardar as consultas no array de consultas
    if (localStorage['ListaMedicos']) {
        this.medicos = JSON.parse(localStorage['ListaMedicos']);
    }
}

/**
 * Description
 * @method apresentar
 * @param {} medico
 */
ListaMedicos.apresentar = function (medico) {
    medico = medico || new ListaMedicos().acrescentarMedicos();
    medico.getMedicosLocal();
    document.getElementById("listaMedicos").innerHTML = medico.listarMedicos();
    medico.saveMedicos();

};

/**
 * Description
 * @method removerMedicos
 * @param {} posicao
 */
ListaMedicos.removerMedicos = function (posicao) {
    medico = new ListaMedicos();
    var localStorageObjs = JSON.parse(localStorage["ListaMedicos"]);
    for (let i = 0; i < localStorageObjs.length; i++) {
        if (localStorageObjs[i].id == posicao)
            localStorageObjs.splice(i, 1);
    }
    localStorage['ListaMedicos'] = JSON.stringify(localStorageObjs);
    ListaMedicos.apresentar(medico);
}


/**
 * Description
 * @method getNumberOfMedicos
 * @return MemberExpression
 */
ListaMedicos.getNumberOfMedicos = function () {
    var retrievedObject = JSON.parse(localStorage["ListaMedicos"]);
    return retrievedObject.length;
}

/**
 * Description
 * @method acrescentar
 * @param {} medico
 */
ListaMedicos.acrescentar = function (medico) { //
    var nome = document.getElementById("nome");
    var titulo = document.getElementById("titulo");
    var genero = document.getElementById("tipoGenero");
    var email = document.getElementById("email");
    var especialidade = document.getElementById("tipoEspecialidade");
    var foto = document.getElementById("foto");
    if (!arr.includes(especialidade.value)) {
        arr.push(especialidade.value);
        localStorage["Especialidade"] = JSON.stringify(arr);
    }
    if (checkMedicos(nome, titulo, email, genero, especialidade, foto)) {
        if(foto.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){
            medico = new ListaMedicos().acrescentarMedicos();
            ListaMedicos.getNumberOfMedicos();
            medico.acrescentarMedico(new Medico(ListaMedicos.getNumberOfMedicos() + 1, nome.value, titulo.value, genero.value, email.value, especialidade.value, foto.value));
            alert("Médico adicionado com sucesso!!");
            location.href = "gestao.html";
        }else{
            alert("A extenção do ficheiro da foto necessita de ser .jpg/.jpeg/.png/.gif");
        }
    } else {
        if (especialidade == "")
            alert("O medico necessita de ser especializado em algo");
        else
            alert("Obrigatório preencher todos os campos!");
    }


};
/**
 * Description
 * @method saveEditMedicos
 * @param {} id
 */
ListaMedicos.prototype.saveEditMedicos = function (id) {
    id = JSON.parse(id);
    id = id[0];
    let nome = document.getElementById("nomeinp" + id);
    let titulo = document.getElementById("tituloinp" + id);
    let genero = document.getElementById("tipoGenero" + id);
    let email = document.getElementById("emailinp" + id);
    let espec = document.getElementById("tipoEspecialidade" + id);
    medico = new ListaMedicos();
    var localStorageObjs = JSON.parse(localStorage["ListaMedicos"]);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (let i = 0; i < localStorageObjs.length; i++) {
        if (localStorageObjs[i].id == id) {
            if (nome.value != "" && titulo.value != "" && email.value != "" && genero.value != "" && espec.value != "") {
                if (re.test(String(email.value).toLowerCase()) == true) {
                    if (!arr.includes(espec.value)) {
                        arr.push(espec.value);
                        localStorage["Especialidade"] = JSON.stringify(arr);
                    }
                    localStorageObjs[i].nome = nome.value;
                    localStorageObjs[i].titulo = titulo.value;
                    localStorageObjs[i].email = email.value;
                    localStorageObjs[i].especialidade = espec.value;
                    localStorageObjs[i].genero = genero.value;
                    let newdata = JSON.stringify([id, nome.value, titulo.value, email.value, genero.value, espec.value])
                    undo(newdata);
                } else {
                    alert("Campo 'email' não está correto")
                }
            } else {
                alert("Todos os campos têm que estar preenchidos!");
            }
        }

    }
    localStorage['ListaMedicos'] = JSON.stringify(localStorageObjs);
}

/**
 * Description
 * @method removeChilds
 * @param {} myNode
 */
function removeChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

/**
 * Description
 * @method undo
 * @param {} id
 */
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
/**
 * Description
 * @method EditarMed
 * @param {} id
 */
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

    createInputs(nome, "nomeinp" + id, "", "form-control");
    createInputs(titulo, "tituloinp" + id, "", "form-control");
    listarGenero(genero.id);
    createInputs(email, "emailinp" + id, "", "form-control");
    listarEspecialidade(espec.id);

    let nomeinp = document.getElementById("nomeinp" + id);
    let tituloinp = document.getElementById("tituloinp" + id);
    let emailinp = document.getElementById("emailinp" + id, "email");
    nomeinp.value = nomevalor;
    tituloinp.value = titulovalor;
    emailinp.value = emailvalor;

    especopt=document.getElementById(especvalor);
    genopt=document.getElementById(generovalor);
    especopt.selected=true;genopt.selected=true;


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

/**
 * Description
 * @method listarEspecialidade
 * @param {} idform
 */
function listarEspecialidade(idform) {

    var mainForm = document.getElementById(idform);
    let id = idform.split("especialidade");
    id = id[1];
    createElements("SELECT", mainForm, "tipoEspecialidade" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoEspecialidade" + id);
    getSelectTipo.addEventListener("change", function () {
        if (arr.length == this.value) {
            id = this.id;
            if (!document.getElementById("otherespec"))
                createInputs(this.parentElement, "otherespec", "text", "form-control");
            other = document.getElementById("otherespec");
            other.placeholder = "Outro";
            other.focus = true;
            other.id = this.id;
            this.id = "filler";
        } else {
            if (other = document.getElementById(id)) {
                this.id = other.id;
                other.parentElement.removeChild(other);
            }
        }

    });

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
            option.text = arr[i];
            option.value = arr[i];
            option.id = arr[i];
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


/**
 * Description
 * @method listarGenero
 * @param {} idform
 */
function listarGenero(idform) {

    var mainForm = document.getElementById(idform);
    let id = idform.split("genero");
    id = id[1];
    createElements("SELECT", mainForm, "tipoGenero" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoGenero" + id);

    for (let i = -2; i <= arrgen.length; i++) {

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
        if (i != arrgen.length) {
            var option = document.createElement("option");
            option.text = arrgen[i];
            option.value = arrgen[i];
            option.id = arrgen[i];
            getSelectTipo.add(option);
        }
        if (i == arrgen.length) {
            var option = document.createElement("option");
            option.text = "Outro";
            option.value = i;
            option.id = "Outro";
            getSelectTipo.add(option);
        }
    }
    getSelectTipo.options[0].disabled = true;
}


/**
 * Description
 * @method isNull
 * @param {} campo
 * @return Se o campo é nulo ou sem aspas
 */
function isNull(campo) {
    return (campo == "" || campo == null);
}

/**
 * Description
 * @method alertAndFocus
 * @param {} campo
 * @param {} msg
 * @return falso
 */
function alertAndFocus(campo, msg) {
    alert(msg);
    campo.focus();
    campo.setAttribute("class", "input-error form-control");
    return false;
}

/**
 * Description
 * @method checkMedicos
 * @param {} nome
 * @param {} titulo
 * @param {} email
 * @param {} genero
 * @param {} especialidade
 * @param {} foto
 * @return true quando a validação é feita com sucesso
 */
function checkMedicos(nome, titulo, email, genero, especialidade, foto) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isNull(nome.value)) {
        alertAndFocus(nome, "Campo: Nome vazio");
    } else if (isNull(titulo.value)) {
        alertAndFocus(titulo, "Campo: Titulo vazio");
    } else if (isNull(email.value)) {
        alertAndFocus(email, "Campo: Email vazio");
    } else if (isNull(genero.value)) {
        alertAndFocus(genero, "Campo: Genero vazio");
    } else if (isNull(especialidade.value)) {
        alertAndFocus(especialidade, "Campo: Especialidade vazio");
    } else if (isNull(foto.value)) {
        alertAndFocus(foto, "Campo: Foto vazio");
    }else if(re.test(String(email.value).toLowerCase()) == false){
        alertAndFocus(email,"O email introduzido não é valido");
    }else{
        return true;
    }

}

/**
 * Description
 * @method initializeElements
 */
function initializeElements() {
    var body = document.getElementById('body');
    createElements("h4", document.getElementById("nowTime"), "dataAtual");
}

/**
 * Description
 * @method initialize
 */
function initialize() {
    initializeElements();
    document.getElementById("dataAtual").innerText = data.getDataAtual();
}
