const bodyParser = require("body-parser");

var requestHandlersConsultas = require("./scripts/request-handlers-consultas");
var requestHandlersMedicos = require("./scripts/request-handlers-medicos");
var requestHandlersAdmin = require("./scripts/request-handlers-admin");
var requestHandlers = require("./scripts/request-handlers");


var favicon = require('serve-favicon');
const express = require("express");
const app = express();
const medicos = express.Router();
const consultas = express.Router();
const admin = express.Router();

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

app.use(favicon(__dirname + '/www/images/site.ico'));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('www'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use("/medicos", medicos);
app.use("/consultas",consultas);
app.use("/admin/",admin);
app.use("/creditos",requestHandlers.creditos);
admin.get("/",requestHandlersAdmin.home)
admin.get("/noticias", requestHandlersAdmin.apresentarNoticias);
admin.get("/noticias/adicionar",requestHandlersAdmin.adicionarForm);
admin.post("/noticias/adicionar",requestHandlersAdmin.saveNoticia);
admin.get("/noticias/remover/:idNoticia",requestHandlersAdmin.removerNoticia);

app.all("/gerirConsultas", requestHandlersConsultas.gerirConsultas);
app.all("/consultas",requestHandlersConsultas.consultas);
app.get("/especialidades",requestHandlers.especialidades);
app.post("/insert-especialidade",requestHandlers.insertEspecialidade);
app.post("/insert-medico",requestHandlersMedicos.insertMedico);
app.post("/insert-consulta",requestHandlersConsultas.adicionarConsulta);
app.all("/pagamento/:id",requestHandlers.pagamento);
app.all("/",requestHandlers.home);

medicos.all("/gerir", requestHandlersMedicos.gerirMedicos);
medicos.get("/getMedicos", requestHandlersMedicos.getMedicos);
medicos.get("/getMedico/:id",requestHandlersMedicos.getMedicoByID);
medicos.all("/adicionar", requestHandlersMedicos.adicionarMedicos);
medicos.all("/eliminar/:id",requestHandlersMedicos.eliminarMedico);
medicos.post("/editar/",requestHandlersMedicos.editarMedico);

consultas.get("/getConsultas",requestHandlersConsultas.getConsultas);
consultas.all("/eliminar/:id",requestHandlersConsultas.eliminarConsultas);
consultas.all("/saveConsulta/",requestHandlersConsultas.saveConsulta);
medicos.all("/info/:id",requestHandlersMedicos.medicoInfo);
app.listen(81, function () {
    console.log("Server running at http://localhost:81");
});
