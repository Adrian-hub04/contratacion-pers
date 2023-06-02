require('dotenv').config();
const {Pool} = require('pg');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool:{
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    logging: false,
  });

  
// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.DB_PORT
// });

module.exports = {sequelize};