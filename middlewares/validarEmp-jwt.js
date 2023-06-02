const {response} = require('express');
const jwt = require('jsonwebtoken');
const Empleados = require('../models/empleados');

const validarJWTEmp = async (req, res = response, next) => {
    
    const token = req.header('x-token');

    if (!token){
        res.status(401).json({
            msg: 'No se asigno un token'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        const empleado = await Empleados.findByPk(uid);
        if (!empleado) {
            res.status(401).json({
                msg: 'Usuario no existe en DB'
            });
        }
        req.empleado = empleado;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}


module.exports = {
    validarJWTEmp
}