const bodyParser = require("body-parser");

var requestHandlersConsultas = require("./scripts/request-handlers-consultas");
var requestHandlersMedicos = require("./scripts/request-handlers-medicos");
var requestHandlers = require("./scripts/request-handlers");


const express = require("express");
const app = express();
const medicos = express.Router();
const consultas = express.Router();

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clinica_veterenaria"
});

db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  }); 


app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('www'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use("/medicos", medicos);
app.use("/consultas",consultas);
app.use("/creditos",requestHandlers.creditos);

app.all("/", requestHandlersConsultas.gerirConsultas);
app.all("/consultas",requestHandlersConsultas.consultas);
app.get("/especialidades",requestHandlers.especialidades);
app.post("/insert-especialidade",requestHandlers.insertEspecialidade);
app.post("/insert-medico",requestHandlersMedicos.insertMedico);
app.post("/insert-consulta",requestHandlersConsultas.adicionarConsulta);


medicos.all("/gerir", requestHandlersMedicos.gerirMedicos);
medicos.get("/getMedicos", requestHandlersMedicos.getMedicos);
medicos.get("/getMedico/:id",requestHandlersMedicos.getMedicoByID);
medicos.all("/adicionar", requestHandlersMedicos.adicionarMedicos);
medicos.all("/eliminar/:id",requestHandlersMedicos.eliminarMedico);
medicos.post("/editar/",requestHandlersMedicos.editarMedico);

consultas.get("/getConsultas",requestHandlersConsultas.getConsultas);
consultas.all("/eliminar/:id",requestHandlersConsultas.eliminarConsultas);
medicos.all("/info/:id",requestHandlersMedicos.medicoInfo);
app.listen(81, function () {
    console.log("Server running at http://localhost:81");
});
