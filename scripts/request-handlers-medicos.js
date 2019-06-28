const mysql = require("mysql");

const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "",
  database: "clinica_veterenaria"
};


function gerirMedicos(request, response) {
  response.render("gerir-medicos");
}
function adicionarMedicos(request, response) {
  response.render("adicionar-medicos");
}


function insertMedico(request, response) {
  let connection = mysql.createConnection(connectionOptions)
  let id = request.body.data.id;
  let nome = request.body.data.nome;
  let titulo = request.body.data.titulo;
  let genero = request.body.data.genero;
  let email = request.body.data.email;
  let especialidade = request.body.data.especialidade;
  let foto = request.body.data.foto;

  connection.connect();
  connection.query("INSERT INTO `medicos`(`id`, `nome`, `titulo`, `genero`, `email`, `especialidade`, `foto`) VALUES (NULL,'" + nome + "','" + titulo + "','" + genero + "','" + email + "','" + especialidade + "','" + foto + "')");
  connection.end();
}

function getMedicoByID(request, response) {
  var medicoID = request.params.id;
  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("SELECT * FROM `medicos` WHERE id = "+medicoID+"",
    function (err, rows, fields) {
      if (err) {
        response.send(500);
      } else {
        response.send(rows);
      }
    });
  connection.end();
}

function getMedicos(request, response) {
  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("SELECT * FROM `medicos`",
    function (err, rows, fields) {
      if (err) {
        response.send(500);
      } else {
        response.send(rows);
      }
    });
  connection.end();
}

function eliminarConsultas(idMedico){
  
  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("DELETE FROM `consultas` WHERE medico = "+idMedico +";");
  connection.end();
}

function eliminarMedico(request, response) {
  var medicoID = request.params.id;
 //remover todas as consultas referentes ao médico 
  eliminarConsultas(medicoID);
 //remover o médico

  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("DELETE FROM `medicos` WHERE `medicos`.`id` = " + medicoID + "");
  connection.end();
  response.redirect('/')
}

function editarMedico(request, response) {
  
  let id = request.body.id;
  let nome = request.body.nome;
  let titulo = request.body.titulo;
  let email = request.body.email;
  let especialidade = request.body.especialidade;
  let genero = request.body.genero;
  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("UPDATE `medicos` SET `nome` = '"+nome+"', `titulo` = '"+titulo+"', `genero` = '"+genero+"', `email` = '"+email+"', `especialidade` = '"+especialidade+"' WHERE `medicos`.`id` = "+id+";");
  connection.end();
  response.redirect('/medicos/gerir');
}

function medicoInfo(request,response){
 let medicoID = request.params.id;
  let connection = mysql.createConnection(connectionOptions);
  connection.connect();
  connection.query("SELECT * FROM `medicos` WHERE id = " + medicoID,
      function (err, rows, fields) {
        if (err) {
          response.send(500);
        } else {
         response.render('info-medicos',rows);
        }
      });
  connection.end();
}
module.exports.getMedicoByID = getMedicoByID;
module.exports.getMedicos = getMedicos;
module.exports.insertMedico = insertMedico;
module.exports.gerirMedicos = gerirMedicos;
module.exports.adicionarMedicos = adicionarMedicos;
module.exports.eliminarMedico = eliminarMedico;
module.exports.editarMedico = editarMedico;
module.exports.medicoInfo=medicoInfo;

