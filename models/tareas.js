const { Sequelize, DataTypes, Model } = require('sequelize');

const {sequelize} = require('../db/config');

const Tareas = sequelize.define('empleado',{
    id_tareas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    descrpcion: {
        type: DataTypes.TEXT
    },
    empleado: {
        type: DataTypes.STRING
    },
    candidato: {
        type: DataTypes.STRING
    }
},
{
    timestamps: false
});



Tareas.toJSON = function () {
    const {clave, id_tareas, ...resto} = this.toObject();
    resto.uid = id_tareas;
    return {Tareas}
}
module.exports = Tareas;