const mysql = require("mysql");

const connectionOptions = {
    host: "localhost",
    user: "root",
    password: "",
    database: "clinica_veterenaria"
};

function login(request, response) {
    var password = request.params.pw;
    if(password != "admin"){
        response.send("<b style='color:darkred'>Erro 401: Acesso não autorizado</b>");
    }else{
        let connection = mysql.createConnection(connectionOptions);
        let sqlQuery = "SELECT FIRST.nCPH nConsultasPagasHoje, SECOND.nCRH nConsultasRestantesHoje, third.nCT nConsultasTotais, four.nCP nConsultasPagas, five.nM nMedicos FROM ( SELECT COUNT(*) nCPH FROM consultas WHERE diaDaConsulta = CURRENT_DATE AND consultas.efetivada = 1 AND consultas.paga = 1 ) FIRST, ( SELECT COUNT(*) AS nCRH FROM consultas WHERE diaDaConsulta = CURRENT_DATE AND consultas.efetivada = 0 AND consultas.paga = 0 ) SECOND, ( SELECT COUNT(*) nCT FROM consultas ) third, ( SELECT COUNT(*) nCP FROM consultas WHERE consultas.paga = 1 ) four, ( SELECT COUNT(*) nM FROM `medicos` ) five";
        connection.query(sqlQuery,
            function (err, rows, fields) {
                if (err) {
                    response.sendStatus(500);
                } else {
                    response.render("backoffice",{querys: rows[0]});
                }
            });
        connection.end();
    }
}

function apresentarNoticias(request,response){
    var password = request.params.pw;
    if(password != "admin"){
        response.send("<b style='color:darkred'>Erro 401: Acesso não autorizado</b>");
    }else {
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
}

function adicionarForm(request,response) {
    var password = request.params.pw;
    if(password != "admin"){
        response.send("<b style='color:darkred'>Erro 401: Acesso não autorizado</b>");
    }else {
        response.render("backoffice-noticias-adicionar");
    }
}

function saveNoticia(request,response){
    var password = request.params.pw;
    if(password != "admin"){
        response.send("<b style='color:darkred'>Erro 401: Acesso não autorizado</b>");
    }else {
        let connection = mysql.createConnection(connectionOptions);
        let titulo = request.body.titulo;
        let corpo = request.body.corpo;
        connection.connect();
        let sqlQuery = "INSERT INTO `noticias` (`id`, `titulo`, `noticia`) VALUES (NULL, '" + titulo + "', '" + corpo + "');";
        connection.query(sqlQuery);
        connection.end();
        response.redirect('../../')
    }
}

function removerNoticia(request,response){
    var password = request.params.pw;
    if(password != "admin"){
        response.send("<b style='color:darkred'>Erro 401: Acesso não autorizado</b>");
    }else {
        let idNoticia = request.params.idNoticia;
        let connection = mysql.createConnection(connectionOptions);
        connection.connect();
        let sqlQuery = "DELETE FROM `noticias` WHERE `noticias`.`id` = " + idNoticia + ";";
        connection.query(sqlQuery);
        connection.end();
        response.redirect('../../');
    }

}
module.exports.removerNoticia = removerNoticia;
module.exports.adicionarForm = adicionarForm;
module.exports.saveNoticia = saveNoticia;
module.exports.apresentarNoticias = apresentarNoticias;
module.exports.login = login;