const Empleados = require('../models/empleados');

//  verificar si el correo existe
const correoExiste = async (email) => {
    const existeCorreo = await Empleados.findOne({where: {correo: email}});
    if (existeCorreo) {
        throw new Error(`El correo: ${email}, ya esta registrado`);
    }
}
//  verificar si la cedula existe
const cedulaExiste = async (documento) => {
    const existeCedula = await Empleados.findOne({where: {cedula: documento}});
    if (existeCedula) {
        throw new Error(`La cedula: ${documento}, ya esta registrada`);
    }
}
//  verificar si existe un empleado con id
const idEmpleadoExiste = async (id) => {
    const existeIdEmpleado = await Empleados.findOne({where: {id_empleado: id}});
    if (!existeIdEmpleado) {
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
    idEmpleadoExiste,
    coleccionesPermitidas
}
