const {response} = require('express');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../db/config');
const Candidatos = require('../models/candidatos');

const getusuarios = async (req, res) => {
    const {id_candidato} = req.body;
    try {
        const candidato = await Candidatos.findAll();
        candidato.every(candidato => candidato instanceof Candidatos);
        JSON.stringify(candidato, null, 2);
        res.status(200).json({candidato});
    } catch (error) {
        res.status(400).json({candidato});
    }
}
const postusuarios = async (req, res) => {
    const {nombre, apellido, cedula, edad, correo, clave} = req.body;
         try {
            // encriptar la contraseña
            const salt  = bcrypt.genSaltSync();
            const password = await bcrypt.hashSync(clave, salt);
            // guardar usuario
            const candidato = await Candidatos.create({
                    nombre,
                    apellido,  
                    cedula, 
                    edad,
                    correo, 
                    clave: password,
                },
                {
                fields:['nombre', 'apellido', 'cedula', 'edad', 'correo', 'clave']
            });
            res.status(200).json( {
                msg: `Usuario ${nombre}, se ha registrado con exito`,
                candidato
            });
         } catch (error) {
            console.log(error);
            res.status(400).json(candidato);
         }
}
const updateusuarios = async (req, res) => {
    const {nombre, apellido, cedula, edad, correo, clave} = req.body;
        try {
            const uuid = req.params.uuid;
           // encriptar la contraseña
           const salt  = bcrypt.genSaltSync();
           const password = await bcrypt.hashSync(clave, salt);
           // actualizar usuario
           const candidato = await Candidatos.update({
                nombre,
                apellido,  
                cedula, 
                edad,
                correo, 
                clave: password,
           },{where: {id_candidato: uuid}});

           res.status(200).json({
            msg: `Usuario ${nombre}, sus datos se han actualizado`
            });

    } catch (error) {
        console.log(error);
    }
}
const deleteusuarios = async (req, res) => {
    const uuid = req.params.uuid;

    try {
        Candidatos.destroy({where: {id_candidato: uuid}
        });
        return res.status(200).json({
            msg: `Usuario: ${uuid}, eliminado con exito `
        });

    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getusuarios,
    postusuarios,
    updateusuarios,
    deleteusuarios
}