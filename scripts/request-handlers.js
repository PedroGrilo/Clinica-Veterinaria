const mysql = require("mysql");

const connectionOptions = {
    host: "localhost",
    user: "root",
    password: "",
    database: "clinica_veterenaria"
};

// página de créditos
function creditos(request, response) {
    response.render("creditos");
}

//página de pagamento
function pagamento(request, response) {

    var consultaID = request.params.id; //id que é passado no url por GET

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

//seleciona todas as especialidades na base de dados, para mais tarde ser retornadas num ajax
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

//inserir especialidade na base de dados através do request do ajax
function insertEspecialidade(request, response) {
    var especialidade = request.body.data;
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query("INSERT INTO `especialidades` (`id_especialidade`, `especialidade`) VALUES (NULL, '" + especialidade + "');");
    connection.end();
    response.send(request.body);
}

//página home. Vai buscar as ultimas 6 noticias e retorna no PUG
function home(request, response) {
    let sqlQuery = "SELECT * FROM `noticias` order by id desc LIMIT 6";
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sqlQuery,
        function (err, rows, fields) {
            if (err) {
                response.send(500);
            } else {
                response.render("home", {rows: rows});
            }
        });
    connection.end();
}

module.exports.home = home;
module.exports.pagamento = pagamento;
module.exports.insertEspecialidade = insertEspecialidade;
module.exports.especialidades = especialidades;
module.exports.creditos = creditos;