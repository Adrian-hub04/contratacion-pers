const { Sequelize, DataTypes, Model } = require('sequelize');
// const Candidatos = require('./candidatos');

const {sequelize} = require('../db/config');

const Contratos = sequelize.define('contrato',{
    id_contrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.INTEGER,
        unique: true
    },
    celular: {
        type: DataTypes.INTEGER
    },
    direccion: {
        type: DataTypes.STRING,
    },
    perfil: {
        type: DataTypes.TEXT
    },
    firma: {
        type: DataTypes.STRING
    },
    documento: {
        type: DataTypes.STRING
    }
    
},
{
    timestamps: false
});



Contratos.toJSON = function () {
    const {clave, id_contrato, ...resto} = this.toObject();
    resto.uid = id_contrato;
    return {Contratos}
}
module.exports = Contratos;