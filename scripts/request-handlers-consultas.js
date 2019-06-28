const mysql = require("mysql");

const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "",
  database: "clinica_veterenaria"
};



function gerirConsultas(request, response) {
    response.render("gerir-consultas");
}
function consultas(request, response) {
    response.render("consultas");
}

function adicionarConsulta(request, response) {
    let diaDaConsulta = request.body.data.diaDaConsulta;
    let hora = request.body.data.hora;
    let medicoID = request.body.data.medico;
    let nomeDoAnimal = request.body.data.nomeDoAnimal;
    let tipoDeConsulta = request.body.data.tipoDeConsulta;
    let efetivada = request.body.data.efetivada;
    let paga = request.body.data.paga;
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query("INSERT INTO `consultas` (`id`, `diaDaConsulta`, `hora`, `medico`, `nomeDoAnimal`, `tipoDeConsulta`, `efetivada`, `paga`) VALUES (NULL, '"+diaDaConsulta+"','"+hora+":00', "+medicoID+", '"+nomeDoAnimal+"', '"+tipoDeConsulta+"', '"+efetivada+"', '"+paga+"');");
    connection.end();
}
function getConsultas(request,response){
    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query("SELECT * FROM `consultas`",
      function (err, rows, fields) {
        if (err) {
          response.send(500);
        } else {
          response.send(rows);
        }
      });
    connection.end();
}

function eliminarConsultas(request, response) {
  var consultaID = request.params.id;
  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("DELETE FROM `consultas` WHERE `consultas`.`id` = " + consultaID + "");
  connection.end();
  response.redirect('/')
}

module.exports.eliminarConsultas =eliminarConsultas;
module.exports.getConsultas = getConsultas;
module.exports.adicionarConsulta = adicionarConsulta;
module.exports.gerirConsultas = gerirConsultas;
module.exports.consultas = consultas;


