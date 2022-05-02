const { response } = require('express');
const { JWTgenerate } = require('../helpers/jwt')
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { verify } = require('../helpers/google.verify');


const loginController = {
    login: async(req, res = response) => {
        const { email, password } = req.body;
        try {
            const usuarioDB = await Usuario.findOne({ email });
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    msg: "contraseña o email no valido (email))",
                })
            }
            const passwordValidate = bcrypt.compareSync(password, usuarioDB.password)
            if (!passwordValidate) {
                return res.status(400).json({
                    ok: false,
                    msg: "contraseña o email no valido (password))",
                })
            }

            //generar token
            const token = await JWTgenerate(usuarioDB.id)
            res.status(200).json({
                ok: true,
                token
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado",
            })
        }

    },

    loginGoogle: async(req, res = response) => {
        const googleToken = req.body.token;
        //console.log(googleToken);
        try {
            const { name, email, picture } = await verify(googleToken);
            const usuarioDB = await Usuario.findOne({ email });
            if (!usuarioDB) {
                usuario = new Usuario({
                    nombre: name,
                    email,
                    password: '@@@',
                    img: picture,
                    google: true
                })
            } else {
                // exite
                usuario = usuarioDB;
                usuario.google = true;
                usuario.password = '@@@'
            }
            await usuario.save();
            const jwt = await JWTgenerate(usuario.id)

            res.status(200).json({
                ok: true,
                msg: "Login Google",
                jwt
            })
        } catch (error) {
            res.status(401).json({
                ok: false,
                msg: "Token Invalido"
            })
        }

    },
    renewToken: async(req, res = response) => {

        const uid = req.uid
        const token = await JWTgenerate(uid)
        res.status(200).json({
            ok: true,
            uid,
            token
        })
    }
}

module.exports = loginController;