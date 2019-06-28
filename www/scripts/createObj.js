/**
 * Função para criar botões
 * @method createButtons
 * @param {HTMLObjectElement} where
 * @param {string} idName
 * @param {string} type
 * @param {string} classB
 * @param {string} valueB
 * @param {string} onclick
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
 * @method createInputs
 * @param {HTMLObjectElement} where
 * @param {string} idName
 * @param {string} type
 * @param {string} classe
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


/**
 * Description
 * @method createSpans
 * @param {string} text
 * @param {HTMLObjectElement} where
 * @param {string} id
 */
function createSpans(text, where, id) {
    var elementCreated = document.createElement("SPAN");
    elementCreated.textContent = text;
    elementCreated.id = id;
    where.appendChild(elementCreated);
}

/**
 * Função para criar labels
 * @method createLabels
 * @param {string} text
 * @param {HTMLObjectElement} where
 */
function createLabels(text, where) {
    var elementCreated = document.createElement("LABEL");
    elementCreated.textContent = text;
    where.appendChild(elementCreated);
}

/**
 * Função para criar brs
 * @method createBrs
 * @param {HTMLObjectElement} where
 */
function createBrs(where) {
    var elementCreated = document.createElement("BR");
    where.appendChild(elementCreated);
}

/**
 * Função para criar qualquer elemento
 * @method createElements
 * @param {string} element
 * @param {HTMLObjectElement} where
 * @param {string} idName
 * @param {string} classes
 */
function createElements(element, where, idName, classes) {
    var elementCreated = document.createElement("" + element + "");
    elementCreated.setAttribute("id", idName);
    elementCreated.className = classes;
    elementCreated.setAttribute("name",idName);
    where.appendChild(elementCreated);
}

/**
 * Função para criar options - select
 * @method createOptions
 * @param {HTMLObjectElement} select
 * @param {string} text
 * @param {string} attribute
 * @param {string} textAttribute
 */
function createOptions(select, text, attribute, textAttribute) {
    var option = document.createElement("option");
    option.text = text;
    select.add(option);
    if (attribute) {
        select.setAttribute(attribute, textAttribute);
    }
}
