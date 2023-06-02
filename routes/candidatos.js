const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validar-jwt');
const {correoExiste, cedulaExiste, idUsuarioExiste} = require('../helpers/dbValidators');
const {getusuarios, postusuarios, updateusuarios, deleteusuarios} = require('../controllers/candidatos');


const router = Router();

router.get('/', [], getusuarios);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('cedula', 'La cedula no es valida').isInt().isLength({min:8, max:10}),
    check('cedula').custom(cedulaExiste),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    check('edad', 'Fecha invalida, formato: YYYY-MM-DD').isDate(),
    check('clave', 'La contraseña no es valida, mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], postusuarios);
router.put('/:uuid', [
    check('uuid').custom(idUsuarioExiste),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('cedula', 'La cedula no es valida').isInt().isLength({min:8, max:10}),
    check('cedula').custom(cedulaExiste),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    check('edad', 'Fecha invalida, formato: YYYY-MM-DD').isDate(),
    check('clave', 'La contraseña no es valida, mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], updateusuarios);
router.delete('/:uuid', [
    validarJWT,
    check('uuid').custom(idUsuarioExiste),
    validarCampos
], deleteusuarios);

module.exports = router;