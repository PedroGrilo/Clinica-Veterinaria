var medicosBD = [];

const arrayEspecialidade = [];

/**
 * Classe Medico
 */

/**
 * @constructs Medico
 */
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
    this.medicos = medicosBD
}

/**
 * Procurar um index de uma array
 * @method searchIndex
 * @param {array} array
 * @param {string} attr
 * @param {number} value
 */
function searchIndex(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

/**
 * Remove os medicos
 * @method removerMedico
 * @param {number} posicao
 */
ListaMedicos.prototype.removerMedico = function (id) {
    if (confirm('Deseja remover o medico? É uma ação inreversível. Irá remover todas as consultas referente ao mesmo'))
        $.ajax({
            type: "get",
            url: "/medicos/eliminar/" + id,
            success: function () {
                $("#" + id).remove();
                loadMedicos();
            }
        });
};

function loadMedicos() {
    $.ajax({
        url: '/medicos/getMedicos',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: (dataR) => {
            medicosBD = dataR;
            $("#medicosTable").replaceWith(new ListaMedicos().listarMedicos());
        }
    })
}

ListaMedicos.prototype.insertMedicoBD = function (medico) {//guardar na database
    $.ajax({
        url: '/insert-medico',
        type: 'POST',
        data: {
            data: medico
        }
    })
};


ListaMedicos.prototype.acrescentarMedico = function (medico) {
    this.medicos.push(medico);
    this.insertMedicoBD(medico);
};

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
        <table id="medicosTable" class="table medtab">
            <thead class="thead-dark">
            <tr>
                <th>Medico</th>
                <th>Titulo</th>
                <th>Genero</th>
                <th>Email</th>
                <th>Especialidade</th>
                <th width="10px">Mais Informações</th>
                <th width="10px">Editar</th>
                <th width="10px">Apagar/Voltar</th>  
            </tr>
        </thead>`;

        this.medicos.forEach(function (currentValue, index, array) {
            today = true;
            resultado += "<tr id='" + currentValue.id + "'>" +
                "<td><div id ='nome" + currentValue.id + "'>" + currentValue.nome + "</div></td>" +
                "<td><div id ='titulo" + currentValue.id + "'>" + currentValue.titulo + "</div></td>" +
                "<td><div id ='genero" + currentValue.id + "'>" + currentValue.genero + "</div></td>" +
                "<td><div id ='email" + currentValue.id + "'>" + currentValue.email + "</div></td>" +
                "<td><div id ='especialidade" + currentValue.id + "'>" + currentValue.especialidade + "</div></td>" +
                "<td style='text-align: center'><div id ='info" + currentValue.id + "'><button class='editmed' onclick='window.location = `info/" + currentValue.id + "`'><i class='fas fa-user-tag iconRotate'> </i></button></div></td>" +
                "<td style='text-align: center'><div id='ico" + currentValue.id + "'><button onclick=EditarMed(" + currentValue.id + ") class='editmed'><i' class='fas fa-user-edit iconRotate'></i></button></div></td>" +
                "<td style='text-align: center'><div id='ico_s" + currentValue.id + "'><button onclick='new ListaMedicos().removerMedico(" + currentValue.id + ")'class='editmed'><i class='fas fa-user-times iconRotate    '></i></button></div></td>" +
                "</tr>";

        });
        resultado += "</table>";

        return resultado;
    }

};


/**
 * Lista os medicos
 * @method apresentar
 * @param {Medico} medico
 */
ListaMedicos.apresentar = function (medico) {

    medico = medico || new ListaMedicos().acrescentarMedicos();
    //medico.getMedicosLocal();
    document.getElementById("listaMedicos").innerHTML = medico.listarMedicos();
    // medico.saveMedicos();
};


// /**
//  * Retorna o número total de médicos
//  * @method getNumberOfMedicos
//  * @return MemberExpression
//  */
ListaMedicos.getNumberOfMedicos = function (medico) {
    return medico.medicos.length;
};

function insertEspecialidade(especialidade) {
    $.ajax({
        url: '/insert-especialidade',
        type: 'POST',
        data: {
            data: especialidade
        }
    })
}

function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("foto").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.width = 64;
            newImage.height = 64;
            newImage.className = "rounded-circle";
            newImage.style.border = "1px solid black";
            newImage.src = srcData;
            newImage.id = "newImage";
            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}


/**
 * Acrescenta um médico aos médicos
 * @method acrescentar
 * @param {Object} medico
 */

ListaMedicos.acrescentar = function (medico) {
    var nome = document.getElementById("nome");
    var titulo = document.getElementById("titulo");
    var genero = document.getElementById("tipoGenero");
    var email = document.getElementById("email");
    var especialidade = document.getElementById("tipoEspecialidade");
    var foto = document.getElementById("foto");
    if (!arrayEspecialidade.includes(especialidade.value)) {
        arrayEspecialidade.push(especialidade.value);
        insertEspecialidade(especialidade.value);
    }

    if (checkMedicos(nome, titulo, email, genero, especialidade, foto)) {
        if (foto.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {

            var imageBase64 = document.getElementById("newImage").src;

            medico = new ListaMedicos().acrescentarMedicos();
            medico.acrescentarMedico(new Medico(ListaMedicos.getNumberOfMedicos(medico) + 1, nome.value, titulo.value, genero.value, email.value, especialidade.value, imageBase64));
            alert("Médico adicionado com sucesso!!");
            location.href = "/";
        } else {
            alert("A extenção do ficheiro da foto necessita de ser .jpg/.jpeg/.png/.gif");
            return false;
        }
    } else {
        return false;
    }

};
/**
 * Edita um médico já existente
 * @method saveEditMedicos
 * @param {number} id
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
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (nome.value != "" && titulo.value != "" && email.value != "" && genero.value != "" && espec.value != "") {
        if (re.test(String(email.value).toLowerCase()) == true) {
            if (!arrayEspecialidade.includes(espec.value)) {
                arrayEspecialidade.push(espec.value);
                insertEspecialidade(espec.value);
            }
            $.ajax({
                url: '/medicos/editar',
                type: 'POST',
                data: {
                    id: id,
                    nome: nome.value,
                    titulo: titulo.value,
                    email: email.value,
                    especialidade: espec.value,
                    genero: genero.value,
                },
                success: function () {
                    let newdata = JSON.stringify([id, nome.value, titulo.value, email.value, genero.value, espec.value]);
                    undo(newdata);
                }

            })

        } else {
            alert("Campo 'email' não está correto")
        }
    } else {
        alert("Todos os campos têm que estar preenchidos!");
    }

};

/**
 * Remove os child elements do pai fornecido
 * @method removeChilds
 * @param {HTMLObjectElement} myNode
 */
function removeChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

/**
 * Reverte a form criada da edição de médicos sem alterar qualquer valor
 * @method undo
 * @param {number} id
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
 * Cria a form para editar o medico
 * @method EditarMed
 * @param {number} id
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
    let emailinp = document.getElementById("emailinp" + id);
    nomeinp.value = nomevalor;
    tituloinp.value = titulovalor;
    emailinp.value = emailvalor;

    especopt = document.getElementById(especvalor);
    genopt = document.getElementById(generovalor);
    especopt.selected = true;
    genopt.selected = true;

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

    createElements("i", document.getElementById("btnicp" + id), "", "fas fa-user-check iconRotate");
    createElements("i", document.getElementById("btnics" + id), "", "fas fa-undo iconRotate");
}


/**
 * Lista todos os generos
 * @method listarGenero
 * @param {number} idform
 */
function listarGenero(idform) {

    const arrGenero = ["Masculino", "Feminino"];

    var mainForm = document.getElementById(idform);
    let id = idform.split("genero");
    id = id[1];
    createElements("SELECT", mainForm, "tipoGenero" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoGenero" + id);

    for (let i = -2; i <= arrGenero.length; i++) {

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
        if (i != arrGenero.length) {
            var option = document.createElement("option");
            option.text = arrGenero[i];
            option.value = arrGenero[i];
            option.id = arrGenero[i];
            getSelectTipo.add(option);
        }
        if (i == arrGenero.length) {
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
 * Lista todas as especialidades
 * @method listarEspecialidade
 * @param {number} idform
 */
function listarEspecialidade(idform) {


    var mainForm = document.getElementById(idform);
    let id = idform.split("especialidade");
    id = id[1];
    createElements("SELECT", mainForm, "tipoEspecialidade" + id, "form-control");
    var getSelectTipo = document.getElementById("tipoEspecialidade" + id);
    getSelectTipo.addEventListener("change", function () {
        if (arrayEspecialidade.length == this.value) {
            id = this.id;
            if (!document.getElementById("otherespec"))
                createInputs(this.parentElement, "otherespec", "text", "form-control");
            other = document.getElementById("otherespec");
            other.placeholder = "Outro";
            other.focus = true;
            other.id = this.id;
            this.id = "filler";
        }

    });

    for (let i = -2; i < arrayEspecialidade.length + 1; i++) {

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
        if (i != arrayEspecialidade.length) {
            var option = document.createElement("option");
            option.text = arrayEspecialidade[i];
            option.value = arrayEspecialidade[i];
            option.id = arrayEspecialidade[i];
            getSelectTipo.add(option);
        }
        if (i == arrayEspecialidade.length) {
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
 * Verificar se um campo é null ou nao está preenchido
 * @method isNull
 * @param {HTMLObjectElement} campo - um objeto html
 * @returns retorna true se o campo for inválido
 */
function isNull(campo) {
    return (campo == "" || campo == null);
}

/**
 * Envia um alert e foca no elemento html fornecido
 * @method alertAndFocus
 * @param {HTMLObjectElement} campo
 * @param {String} msg
 * @return falso
 */
function alertAndFocus(campo, msg) {
    alert(msg);
    campo.focus();
    campo.setAttribute("class", "input-error form-control");
    return false;
}

/**
 * Confirma se todos os valores são aceitaveis.
 * @method checkMedicos
 * @param {HTMLObjectElement} nome
 * @param {HTMLObjectElement} titulo
 * @param {HTMLObjectElement} email
 * @param {HTMLObjectElement} genero
 * @param {HTMLObjectElement} especialidade
 * @param {HTMLObjectElement} foto
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
    } else if (re.test(String(email.value).toLowerCase()) == false) {
        alertAndFocus(email, "O email introduzido não é valido");
    } else {
        return true;
    }

}

/**
 * Cria a o lugar onde a data irá mostrar
 * @method initializeElements
 */
function initializeElements() {
    var body = document.getElementById('body');
    createElements("h4", document.getElementById("nowTime"), "dataAtual");
}

/**
 * Inicializaçao da pagina
 * @method initialize
 */
function putEspecialidade() {
    $.ajax({
        url: '/especialidades',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            for (i in data) {
                arrayEspecialidade.push(data[i].especialidade);
            }
        }
    })
}

$.get("/medicos/getMedicos", function (data) {
    medicosBD = data;
    putEspecialidade();
    initializeElements();
    ListaMedicos.apresentar();
});