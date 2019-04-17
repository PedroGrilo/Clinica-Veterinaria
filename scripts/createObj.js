/**
 * Função para criar botões
 */
function createButtons(where, idName, type, classB, valueB, onclick) {
    var elementCreated = document.createElement("button");
    elementCreated.setAttribute("id", idName);
    elementCreated.setAttribute("type", type);
    elementCreated.setAttribute("class", classB);
    elementCreated.textContent = valueB;
    elementCreated.setAttribute("onclick", onclick);
    where.appendChild(elementCreated);
}

/**
 * Função para criar inputs
 */
function createInputs(where, idName, type, classe) {
    var elementCreated = document.createElement("INPUT");
    elementCreated.setAttribute("type", type);
    elementCreated.setAttribute("id", idName);
    elementCreated.setAttribute("name", idName);
    where.appendChild(elementCreated);
    if (classe) {
        elementCreated.setAttribute("class", classe);
    }
}


function createSpans(text, where,id) {
    var elementCreated = document.createElement("SPAN");
    elementCreated.textContent = text;
    elementCreated.id = id;
    where.appendChild(elementCreated);
}

/**
 * Função para criar labels
 */
function createLabels(text, where) {
    var elementCreated = document.createElement("LABEL");
    elementCreated.textContent = text;
    where.appendChild(elementCreated);
}

/**
 * Função para criar brs
 */
function createBrs(where) {
    var elementCreated = document.createElement("BR");
    where.appendChild(elementCreated);
}

/**
 * Função para criar qualquer elemento
 */
function createElements(element, where, idName, classes) {
    var elementCreated = document.createElement("" + element + "");
    elementCreated.setAttribute("id", idName);
    elementCreated.className = classes;
    where.appendChild(elementCreated);
}

/**
 * Função para criar options - select
 */
function createOptions(select, text, attribute, textAttribute) {
    var option = document.createElement("option");
    option.text = text;
    select.add(option);
    if (attribute) {
        select.setAttribute(attribute, textAttribute);
    }
}

