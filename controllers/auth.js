const {response} = require('express');
const Candidatos = require('../models/candidatos');
const Empleados = require('../models/empleados');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    try {
        const {cedula, correo, clave} = req.body;

        // Validar si los datos existen
            const candidato = await Candidatos.findOne({where: {correo}});
            if (!candidato) {
                return res.status(400).json({
                    msg: 'Datos incorrectos - Correo'
                });
            }
            // Validar contraseña
            const contraseñaValid = bcrypt.compareSync(clave, candidato.clave);
            if (!contraseñaValid) {
                return res.status(400).json({
                    msg: 'Datos incorrectos - Contraseña'
                });
            }
            // Generar el JWT
            const token = await generarJWT(candidato.id_candidato);
            res.status(200).json({
                candidato,
                token
            });
    } catch (error) {
        console.log('Error: ', error);
    }
}

const googleSignin = async (req, res = response) => {

    const {id_token} = req.body;
    try {
    const {nombre, apellido, correo, clave} = await googleVerify(id_token);

    let candidato = await Candidatos.findOne({where:{correo}});
    
    if (!candidato) {
        const data = {
            nombre,
            apellido,
            cedula: '1118563147',
            edad: '1998-10-06',
            correo,
            clave: '$2a$10$Gfvd3d0be2dc421be4fcd0172e5afceea3970e2f3d92j3g4x93l0'
        };
        candidato = new Candidatos(data);
        await candidato.save();
    }
    // Generar el JWT
    const token = await generarJWT(candidato.id_candidato);
        res.status(200).json({
            candidato,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no valido'
        });
    }
}

module.exports = {
    login,
    googleSignin
}