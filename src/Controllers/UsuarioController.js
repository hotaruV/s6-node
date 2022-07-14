import response from "express";
import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";
import { JWTgenerate } from "../helpers/jwt";

const usrController = {
  getUser: async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 5;
    //console.log(desde);
    const [usuarios, total] = await Promise.all([
      Usuario.find(
        {},
        "nombres primer_apellido segundo_apellido curp rfc email role rfc_homoclave email created_at updated_at fist_login ente_publico "
      )
        .skip(desde)
        .limit(hasta),
      Usuario.countDocuments(),
    ]);

    res.status(200).json({
      ok: true,
      usuarios,
      total,
    });
  },
  getDataUser: async (req, res) => {
    try {
      const uid = req.uid;
      //console.log(req.uid);
      const usuarioDB = await Usuario.findOne({ _id: uid });
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe usuario",
        });
      } else {
        return res.status(200).json({
          ok: true,
          user: usuarioDB,
        });
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado-... usuario no existe",
      });
    }
  },
  createUsers: async (req, res = response) => {
    try {
      //console.log(req.body.rfc);
      const { email, rfc } = req.body;
      const ExisteEmail = await Usuario.findOne({ email });
      if (ExisteEmail) {
        return res.status(400).json({
          ok: false,
          msg: `El ${email} ya existe en nuestros registros, contacte adminstrador`,
        });
      }
      const usuario = new Usuario(req.body);
      let password = rfc;
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
      await usuario.save();
      const token = await JWTgenerate(usuario.id);
      res.status(200).json({
        ok: true,
        usuario,
        token,
      });
    } catch (error) {
      //console.log(error)
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado-... revisar logs",
        error: error,
      });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const uid = req.params.id;
      const usuarioDB = await usuario.findById(uid);
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe usuario",
        });
      } else {
        return res.status(200).json({
          ok: true,
          user: usuarioDB,
        });
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado-... usuario no existe",
      });
    }
  },
  updateUser: async (req, res = response) => {
    try {
      const uid = req.params.id;
      const usuarioDB = await usuario.findById(uid);
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe usuario",
        });
      }

      //validar token
      //
      const { password, email, ...campos } = req.body;

      if (usuarioDB.email !== email) {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
          return res.status(400).json({
            ok: false,
            msg: "Email no valido",
          });
        }
      }
      campos.email = email;
      const userUpdated = await Usuario.findByIdAndUpdate(uid, campos, {
        new: true,
      });
      res.status(200).json({
        ok: true,
        usuario: userUpdated,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado-... usuario no existe",
      });
    }
  },
  deleteUser: async (req, res = response) => {
    try {
      const usuarioDB = await usuario.findById(uid);
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "No existe usuario",
        });
      }
      await Usuario.findByIdAndDelete(uid);
      res.status(200).json({
        ok: true,
        msg: "Usuario Eliminado",
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado-... usuario no existe",
      });
    }
  },
  createAdminUser: async (req, res = response) => {
    try {
      const nombres = "admsesea";
      const ExisteSuper = await Usuario.findOne({ nombres });
      if (ExisteSuper) {
        return res.status(400).json({
          ok: false,
          msg: `El superadmin ya existe`,
        });
      }
      const usuario = new Usuario(req.body);
      let password = "pass1234";
      const salt = bcrypt.genSaltSync();
      usuario.nombres = nombres;
      usuario.email = "admsesea@seaslp.org";
      usuario.ente_publico =
        "SECRETARIA EJECUTIVA DEL SISTEMA ESTATAL ANTICORRUPCION DE SAN LUIS POTOSI";
      usuario.primer_apellido = "admin";
      usuario.segundo_apellido = "admin";
      usuario.password = bcrypt.hashSync(password, salt);
      usuario.role = "seseaadmin";
      await usuario.save();
      //const token = await JWTgenerate(usuario.id);
      res.status(200).json({
        ok: true,
        msg: "El superadmin ha sido creado",
      });
    } catch (error) {
      //console.log(error)
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado-... revisar logs",
        error: error.errors.role.message,
      });
    }
  },
  resetPasswordUser: async (req, res = response) => {
    try {
      const uid = req.params.id;
      const usuarioDB = await Usuario.findById({ _id: uid });
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          msg: "El usuario no existe en la base de datos",
        });
      }
      const rfc = usuarioDB.rfc;
      const salt = bcrypt.genSaltSync();
      const resetPass = bcrypt.hashSync(rfc, salt);
      const passwordUpdate = await Usuario.updateOne(
        { _id: uid },
        { $set: { password: resetPass } }
      );
      if (passwordUpdate) {
        return res.status(200).json({
          ok: true,
          msg: "Contraseña cambiada Satisfactoriamente",
        });
      }
    } catch (error) {}

    //const rfc = us;
  },
};

module.exports = usrController;
