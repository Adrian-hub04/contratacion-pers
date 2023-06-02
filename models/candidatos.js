const { Sequelize, DataTypes, Model } = require('sequelize');
// const Contrato = require('./contrato');

const {sequelize} = require('../db/config');

const Candidatos = sequelize.define('candidato',{
    id_candidato: {
        type: Sequelize.INTEGER,
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
    edad: {
        type: DataTypes.DATE
    },
    correo: {
        type: DataTypes.STRING,
        unique: true
    },
    clave: {
        type: DataTypes.STRING
    },
    documento: {
        type: DataTypes.STRING
    }
    
},
{
    timestamps: false
});
// Relacion de las tablas o modelos
// Candidatos.hasMany(Contrato, {foreignKey: 'id_contrato'});
// Contrato.belongsTo(Candidatos, {foreignKey: 'id_contrato'});

Candidatos.toJSON = function () {
    const {clave, id_candidato, ...resto} = this.toObject();
    resto.uid = id_candidato;
    return {Candidatos}
}
module.exports = Candidatos;