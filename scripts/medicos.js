/**
 * Classe Medico
 */
/**
 * @constructs Medico
 */

function Medico(id, nome, titulo, genero, email, especialidade, foto) {
    this.id = id;
    this.nome = nome;
    this.titulo = titulo;
    this.genero = genero;
    this.email = email;
    this.especialidade = especialidade;
    this.foto = foto;
}

/*
 * Classe Lista de medicos
 */
/**
 * @constructs ListaMedicos
 */

function ListaMedicos() {
    this.medicos = [];
}

