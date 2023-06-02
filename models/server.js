const express = require('express');
const {sequelize} = require('../db/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // rutas
        this.CandidatoPath = '/candidato';
        this.EmpleadoPath = '/empleado';
        this.authCandidatoPath = '/api/auth';
        this.uploadsPath = '/api/uploads';
        // conexion db
        this.conectarDB();
        // middlewares
        this.middelwares();
        // rutas
        this.routes();

    }
    async conectarDB(){
        try {
            await sequelize.authenticate();
            console.log('Conexion exitosa a DB');
          } catch (error) {
            console.error('No se pudo conectar a DB: ', error);
          }
    }
    middelwares(){
        // Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use(express.urlencoded({extended: true}));
        // Directorio publico
        this.app.use(express.static('public'));
        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    routes(){
        this.app.use(this.authCandidatoPath, require('../routes/auth'));
        this.app.use(this.CandidatoPath, require('../routes/candidatos'));
        this.app.use(this.EmpleadoPath, require('../routes/empleados'));
        this.app.use(this.uploadsPath, require('../routes/uploads'));
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;