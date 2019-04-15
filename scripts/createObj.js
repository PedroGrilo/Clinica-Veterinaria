function createButtons(where, idName, type, classB, valueB, onclick) {
    var elementCreated = document.createElement("button");
    elementCreated.setAttribute("id", idName);
    elementCreated.setAttribute("type", type);
    elementCreated.setAttribute("class", classB);
    elementCreated.textContent =  valueB;
    elementCreated.setAttribute("onclick", onclick);
    where.appendChild(elementCreated);
}

function createInputs(element, where, idName, type) {
    var elementCreated = document.createElement("" + element + "");
    elementCreated.setAttribute("type", type);
    elementCreated.setAttribute("id", idName);
    elementCreated.setAttribute("name", idName);
    elementCreated.setAttribute("name", idName);        
    where.appendChild(elementCreated);
}

function createLabels(text,where){
    var elementCreated = document.createElement("LABEL");
    elementCreated.textContent = text;
    where.appendChild(elementCreated);
}

function createBrs(where){
    var elementCreated = document.createElement("BR");
    where.appendChild(elementCreated);
}

function createElement(element, where, idName, classes) {
    var elementCreated = document.createElement("" + element + "");
    elementCreated.setAttribute("id", idName);
    elementCreated.className = classes;
    where.appendChild(elementCreated);
}


