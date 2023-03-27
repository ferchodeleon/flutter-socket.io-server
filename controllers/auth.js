const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {  
    
    const {email, password} = req.body;

    try {
        const existeEmail = await User.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya está registrado'
            })
        }
        
        const user = new User(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar un Json Web Token

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
    
}

module.exports = {
    createUser
}