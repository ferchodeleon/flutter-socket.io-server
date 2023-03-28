/*

path: '/api/login'

*/

const  {Router, response} = require('express');
const { check } = require('express-validator');
const { createUser, login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').not().isEmpty(),
    check('email', 'El correo ingresado no es un correo valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'El campo email es requerido').not().isEmpty(),
    check('password', 'El campo password es requerido').not().isEmpty(),
    validateFields,
], login)

module.exports = router;
