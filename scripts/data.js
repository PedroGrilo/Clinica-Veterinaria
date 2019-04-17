
/**
 * Classe Data
 */


/**
 * @constructs Data
 */

function Data() {
    var data = new Date();
    var mm = data.getMonth() + 1;
    var dd = data.getDate();

    if (dd < 10)
        dd = '0' + dd; //adicionar o 0
    if (mm < 10)
        mm = '0' + mm; //adicionar o 0

    this.ano = data.getFullYear();
    this.mes = mm;
    this.dia = dd;
    this.hora = data.getHours();
}

function addDays(days) {
    return new Date().setDate(new Date().getDate() + days);
}

Data.prototype.getHoras = function (){
    return this.hora;
}

Data.prototype.getDataAtual = function () {
    return this.ano + '-' + this.mes + '-' + this.dia;
}
Data.prototype.getAno = function () {
    return this.ano;
}

Data.prototype.getMes = function () {
    return this.mes;
}

Data.prototype.getDia = function () {
    return this.dia;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);

    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    if (dd < 10)
        dd = '0' + dd; //adicionar o 0
    if (mm < 10)
        mm = '0' + mm; //adicionar o 0

    return date.getFullYear()+"-"+mm+"-"+dd;
}

var data = new Data();
