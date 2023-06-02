const {response} = require('express');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../db/config');
const Empleados = require('../models/empleados');

const getEmpleados = async (req, res = response) => {
    const {id_empleado} = req.body;
    try {
        const empleado = await Empleados.findAll();
        empleado.every(empleado => empleado instanceof Empleados);
        JSON.stringify(empleado, null, 2);
        res.status(200).json({empleado});
    } catch (error) {
        res.status(400).json({empleado});
        console.log(error);
    }
}
const postEmpleados = async (req, res) => {
    const {p_nombre, p_apellido, cedula, edad, correo, clave} = req.body;
         try {
            // encriptar la contraseña
            const salt  = bcrypt.genSaltSync();
            const password = await bcrypt.hashSync(clave, salt);
            // guardar usuario
            const empleado = await Empleados.create({
                    p_nombre,
                    p_apellido,  
                    cedula, 
                    edad,
                    correo, 
                    clave: password,
                },
                {
                fields:['p_nombre', 'p_apellido', 'cedula', 'edad', 'correo', 'clave']
            });
            res.status(200).json( {
                msg: `Empleado ${nombre}, se ha registrado con exito`,
                empleado
            });
         } catch (error) {
            console.log(error);
            res.status(400).json(empleado);
         }
}
const updateEmpleados = async (req, res) => {
    const {p_nombre, p_apellido, cedula, edad, correo, clave} = req.body;
        try {
            const uuid = req.params.uuid;
           // encriptar la contraseña
           const salt  = bcrypt.genSaltSync();
           const password = await bcrypt.hashSync(clave, salt);
           // actualizar usuario
           const empleado = await Empleados.update({
                p_nombre,
                p_apellido,  
                cedula, 
                edad,
                correo, 
                clave: password,
           },{where: {id_empleado: uuid}});

           res.status(200).json({
            msg: `Empleado(a) ${p_nombre}, sus datos se han actualizado`
            });

    } catch (error) {
        console.log(error);
    }
}
const deleteEmpleados = async (req, res) => {
    const uuid = req.params.uuid;

    try {
        Empleados.destroy({where: {id_empleado: uuid}
        });
        return res.status(200).json({
            msg: `Empleado: ${uuid}, eliminado con exito `
        });

    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getEmpleados,
    postEmpleados,
    updateEmpleados,
    deleteEmpleados
}