
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

module.exports.insertEspecialidade = insertEspecialidade;
module.exports.especialidades = especialidades;
module.exports.creditos = creditos;