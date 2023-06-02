const {response} = require('express');
const jwt = require('jsonwebtoken');
const Candidatos = require('../models/candidatos');

const validarJWT = async (req, res = response, next) => {
    
    const token = req.header('x-token');

    if (!token){
        res.status(401).json({
            msg: 'No se asigno un token'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        const candidato = await Candidatos.findByPk(uid);
        if (!candidato) {
            res.status(401).json({
                msg: 'Usuario no existe en DB'
            });
        }
        req.candidato = candidato;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}


module.exports = {
    validarJWT
}