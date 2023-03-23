const {response} = require('express');

const createUser = (req, res = response) => {    
    res.json({
        ok: true,
        msj: 'Crear usuario!'
    })
}

module.exports = {
    createUser
}