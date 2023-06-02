const { Router } = require('express');
const { check } = require('express-validator');
const {idUsuarioExiste, coleccionesPermitidas} = require('../helpers/dbValidators');
const {validarArchivo} = require('../middlewares/validar-archivo');
const {validarCampos} = require('../middlewares/validaciones');
const { cargarArchivo, actualizarArchivo, mostrarDocumento } = require('../controllers/uploads');

const router = Router();

router.post('/', [validarArchivo], cargarArchivo);
router.put('/:coleccion/:uuid', [
    check('uuid').custom(idUsuarioExiste),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['candidatos', 'empleados'])),
    validarCampos
], actualizarArchivo);

router.get('/:coleccion/:uuid', [
    check('uuid').custom(idUsuarioExiste),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['candidatos', 'empleados'])),
    validarCampos
], mostrarDocumento);

module.exports = router;