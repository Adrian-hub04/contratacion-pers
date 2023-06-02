const { Sequelize, DataTypes, Model } = require('sequelize');
// const Tareas = require('./tareas');

const {sequelize} = require('../db/config');

const Empleados = sequelize.define('empleado',{
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    p_nombre: {
        type: DataTypes.STRING
    },
    s_nombre: {
        type: DataTypes.STRING
    },
    p_apellido: {
        type: DataTypes.STRING
    },
    s_apellido: {
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
},
{
    timestamps: false
});
// Relacion de las tablas o modelos
// Tareas.hasMany(Empleados, {foreignKey: 'id_empleado'});
// Empleado.belongsTo(Tareas, {foreignKey: 'id_empleado'});

Empleados.toJSON = function () {
    const {clave, id_empleado, ...resto} = this.toObject();
    resto.uid = id_empleado;
    return {Empleados}
}
module.exports = Empleados;