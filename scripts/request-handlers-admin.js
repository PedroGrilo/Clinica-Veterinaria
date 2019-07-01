const mysql = require("mysql");

const connectionOptions = {
    host: "localhost",
    user: "root",
    password: "",
    database: "clinica_veterenaria"
};

//pagina home do backoffice, com o request à base de dados de uma serie de querys e apresenta-las mais tarde no PUG
function home(request, response) {
    let connection = mysql.createConnection(connectionOptions);
    let sqlQuery = "SELECT FIRST.nCPH nConsultasPagasHoje, SECOND.nCRH nConsultasRestantesHoje, third.nCT nConsultasTotais, four.nCP nConsultasPagas, five.nM nMedicos FROM ( SELECT COUNT(*) nCPH FROM consultas WHERE diaDaConsulta = CURRENT_DATE AND consultas.efetivada = 1 AND consultas.paga = 1 ) FIRST, ( SELECT COUNT(*) AS nCRH FROM consultas WHERE diaDaConsulta = CURRENT_DATE AND consultas.efetivada = 0 AND consultas.paga = 0 ) SECOND, ( SELECT COUNT(*) nCT FROM consultas ) third, ( SELECT COUNT(*) nCP FROM consultas WHERE consultas.paga = 1 ) four, ( SELECT COUNT(*) nM FROM `medicos` ) five";
    connection.query(sqlQuery,
        function (err, rows, fields) {
            if (err) {
                response.sendStatus(500);
            } else {
                response.render("backoffice", {querys: rows[0]});
            }
        });
    connection.end();
}

//request de noticias à base de dados para retornar no PUG
function apresentarNoticias(request, response) {
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    let sqlQuery = "SELECT * FROM `noticias`";
    connection.query(sqlQuery,
        function (err, rows, fields) {
            if (err) {
                response.send(500);
            } else {
                response.render("backoffice-noticias", {rows: rows});
            }
        });
    connection.end();
}

//página de FORM, para adicionar uma noticia
function adicionarForm(request, response) {
    response.render("backoffice-noticias-adicionar");
}

//save na base de dados da noticia, com parametros passados do request da form
function saveNoticia(request, response) {
    let connection = mysql.createConnection(connectionOptions);
    let titulo = request.body.titulo;
    let corpo = request.body.corpo;
    connection.connect();
    let sqlQuery = "INSERT INTO `noticias` (`id`, `titulo`, `noticia`) VALUES (NULL, '" + titulo + "', '" + corpo + "');";
    connection.query(sqlQuery);
    connection.end();
    response.redirect('../../')
}

//remover noticia da base de dados sendo passado o id da mesma no URL
function removerNoticia(request, response) {
    let idNoticia = request.params.idNoticia;
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    let sqlQuery = "DELETE FROM `noticias` WHERE `noticias`.`id` = " + idNoticia + ";";
    connection.query(sqlQuery);
    connection.end();
    response.redirect('../../');

}

module.exports.removerNoticia = removerNoticia;
module.exports.adicionarForm = adicionarForm;
module.exports.saveNoticia = saveNoticia;
module.exports.apresentarNoticias = apresentarNoticias;
module.exports.home = home;