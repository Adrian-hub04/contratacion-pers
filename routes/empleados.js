const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validaciones');
const { validarJWTEmp } = require('../middlewares/validarEmp-jwt');
const {correoExiste, cedulaExiste, idEmpleadoExiste} = require('../helpers/dbValidatorsEmp');
const {getEmpleados, postEmpleados, updateEmpleados, deleteEmpleados} = require('../controllers/empleados');


const router = Router();

router.get('/', [], getEmpleados);
router.post('/',[
    check('p_nombre', 'El nombre es obligatorio').notEmpty(),
    check('p_apellido', 'El apellido es obligatorio').notEmpty(),
    check('cedula', 'La cedula no es valida').isInt().isLength({min:8, max:10}),
    check('cedula').custom(cedulaExiste),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    check('edad', 'Fecha invalida, formato: YYYY-MM-DD').isDate(),
    check('clave', 'La contraseña no es valida, mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], postEmpleados);
router.put('/:uuid', [
    check('uuid').custom(idEmpleadoExiste),
    check('p_nombre', 'El nombre es obligatorio').notEmpty(),
    check('p_apellido', 'El apellido es obligatorio').notEmpty(),
    check('cedula', 'La cedula no es valida').isInt().isLength({min:8, max:10}),
    check('correo', 'El correo no es valido').isEmail(),
    check('edad', 'Fecha invalida, formato: YYYY-MM-DD').isDate(),
    check('clave', 'La contraseña no es valida, mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], updateEmpleados);
router.delete('/:uuid', [
    validarJWTEmp,
    check('uuid').custom(idEmpleadoExiste),
    validarCampos
], deleteEmpleados);

module.exports = router;