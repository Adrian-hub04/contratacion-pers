const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validaciones');
const {login, googleSignin} = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('cedula', 'La cedula no es valida').notEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('clave', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);
router.post('/google', [
    check('id_token', 'El token es obligatorio').notEmpty(),
    validarCampos
], googleSignin);

module.exports = router;