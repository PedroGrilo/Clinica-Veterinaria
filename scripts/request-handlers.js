const mysql = require("mysql");

const connectionOptions = {
    host: "localhost",
    user: "root",
    password: "",
    database: "clinica_veterenaria"
};


function creditos(request, response) {
    response.render("creditos");
}

function pagamento(request, response) {

    var consultaID = request.params.id;


    //Tipos de pagamento - load
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query("SELECT * FROM `metodos_pagamento`",
        function (err, rows, fields) {
            if (err) {
                response.sendStatus(500);
            } else {
                response.render('pagamentos', {paymentMethods: rows, consultaID: consultaID});
            }
        });
    connection.end();

}

function especialidades(request, response) {
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query("SELECT * FROM `especialidades`",
        function (err, rows, fields) {
            if (err) {
                response.sendStatus(500);
            } else {
                response.send(rows);
            }
        });
    connection.end();
}

function insertEspecialidade(request, response) {
    var especialidade = request.body.data;
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query("INSERT INTO `especialidades` (`id_especialidade`, `especialidade`) VALUES (NULL, '" + especialidade + "');");
    connection.end();
    response.send(request.body);
}

function home(request,response){
    let sqlQuery = "SELECT * FROM `noticias` order by id desc LIMIT 6";

    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sqlQuery,
        function (err, rows, fields) {
            if (err) {
                response.send(500);
            } else {
                response.render("home",{rows:rows});
            }
        });
    connection.end();


}
module.exports.home = home;
module.exports.pagamento = pagamento;
module.exports.insertEspecialidade = insertEspecialidade;
module.exports.especialidades = especialidades;
module.exports.creditos = creditos;