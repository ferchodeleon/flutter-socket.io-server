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
};

const login = async (request, resolve = response) => {

    const {email, password} = request.body;

    try {
        const userDB = await User.findOne({email});
        if(!userDB){
            return resolve.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar el password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword) {
            return resolve.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        //Generar JWT
        const token = await generateJWT(userDB.id);
        resolve.json({
            ok: true,
            usuario: userDB,
            token
        });
    }catch(err) {
        request.status(500).json({
            ok: false,
            msg: 'Un error en el login',
        })
    }
}

module.exports = {
    createUser, login
};