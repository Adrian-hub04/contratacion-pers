const Candidatos = require('../models/candidatos');

//  verificar si el correo existe
const correoExiste = async (email) => {
    const existeCorreo = await Candidatos.findOne({where: {correo: email}});
    if (existeCorreo) {
        throw new Error(`El correo: ${email}, ya esta registrado`);
    }
}
//  verificar si la cedula existe
const cedulaExiste = async (documento) => {
    const existeCedula = await Candidatos.findOne({where: {cedula: documento}});
    if (existeCedula) {
        throw new Error(`La cedula: ${documento}, ya esta registrada`);
    }
}
//  verificar si existe un usuario con id
const idUsuarioExiste = async (id) => {
    const existeIdUsuario = await Candidatos.findOne({where: {id_candidato: id}});
    if (!existeIdUsuario) {
        throw new Error(`El id: ${id}, no existe`);
    }
}
// Validar colecciones permitidas
const coleccionesPermitidas = async (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = {
    correoExiste,
    cedulaExiste,
    idUsuarioExiste,
    coleccionesPermitidas
}
