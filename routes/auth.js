/*

path: '/api/login'

*/

const  {Router, response} = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
], createUser);

module.exports = router;