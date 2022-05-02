const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const usuario = require('../models/usuario')
const { JWTgenerate } = require('../helpers/jwt')

const usrController = {
    getUser: async(req, res) => {
        const desde = Number(req.query.desde) || 0;
        const hasta = Number(req.query.hasta) || 5;
        //console.log(desde);
        const [usuarios, total] = await Promise.all([
            Usuario.find({}, 'nombre email rol google img').skip(desde).limit(hasta),
            Usuario.countDocuments()
        ]);

        res.status(200).json({
            ok: true,
            usuarios,
            total
        })
    },
    createUsers: async(req, res = response) => {
        try {
            const { email, password } = req.body;
            const ExisteEmail = await Usuario.findOne({ email });

            if (ExisteEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Email no valido"
                })
            }
            const usuario = new Usuario(req.body)
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);
            await usuario.save()
            const token = await JWTgenerate(usuario.id)
                //console.log(token);
            res.status(200).json({
                ok: true,
                usuario,
                token

            })
        } catch (error) {
            //console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }
    },
    getOneUser: async(req, res) => {

    },
    updateUser: async(req, res = response) => {
        try {
            const uid = req.params.id
            const usuarioDB = await usuario.findById(uid)
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe usuario"
                })
            }

            //validar token
            //
            const { password, google, email, ...campos } = req.body;
            if (usuarioDB.email !== email) {
                const existeEmail = await Usuario.findOne({ email })
                if (existeEmail) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Email no valido"
                    })
                }
            }
            campos.email = email
            const userUpdated = await Usuario.findByIdAndUpdate(uid, campos, { new: true })
            res.status(200).json({
                ok: true,
                usuario: userUpdated
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... usuario no existe",
            })
        }
    },
    deleteUser: async(req, res = response) => {
        try {
            const usuarioDB = await usuario.findById(uid)
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe usuario"
                })
            }
            await Usuario.findByIdAndDelete(uid)
            res.status(200).json({
                ok: true,
                msg: "Usuario Eliminado"
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... usuario no existe",
            })
        }
    }
}

module.exports = usrController