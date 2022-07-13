import response from "express";
import { JWTgenerate } from "../helpers/jwt";
import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";

const loginController = {
  login: async (req, res = response) => {
    try {
      const { email, password } = req.body;
      const usuarioDB = await Usuario.findOne({ email });
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          msg: "contraseña o email no valido (email))",
        });
      }
      const passwordValidate = bcrypt.compareSync(password, usuarioDB.password);
      if (!passwordValidate) {
        return res.status(400).json({
          ok: false,
          msg: "contraseña o email no valido (password))",
        });
      }

      //generar token
      const token = await JWTgenerate(usuarioDB.id);
      res.status(200).json({
        ok: true,
        token,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Error Inesperado",
      });
    }
  },
  renewToken: async (req, res = response) => {
    try {
      const uid = req.uid;
      const token = await JWTgenerate(uid);
      const usuario = await Usuario.findById({_id :uid});
      res.status(200).json({
        ok: true,
        uid,
        token,
        user : {
          uid: usuario.uid,
          nombres: usuario.nombres,
          primer_apellido: usuario.primer_apellido,
          segundo_apellido: usuario.segundo_apellido,
          email: usuario.email,
          rfc: usuario.rfc,
          rfc_homoclave: usuario.rfc_homoclave,
          curp: usuario.curp,
          id_ente_publico: usuario.id_ente_publico,
          ente_publico: usuario.ente_publico,
          fist_login: usuario.fist_login,
          rol: usuario.role,
          created_at: usuario.created_at,
          updated_at: usuario.updated_at,
        },
        
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  ChangePass: async (req, res = response) => {
    try {
      //console.log(req.body);
      const uid = req.uid;
      let { newpassword, lastpassword } = req.body;
      const userData = await Usuario.findOne({ _id: uid });
      // console.log(userData);
      // return 
      if (!bcrypt.compareSync(lastpassword, userData.password)) {
        return res.status(400).json({
          ok: false,
          msg: "usuario invalido",
        });
      }
      const salt = bcrypt.genSaltSync();
      newpassword = bcrypt.hashSync(newpassword, salt);

      const passwordUpdate = await Usuario.updateOne(
        { _id: uid },
        { $set: { password: newpassword, fist_login: false } }
      );
      const token = await JWTgenerate(userData.id);
      if (passwordUpdate) {
        return res.status(200).json({
          ok: true,
          msg: "Contraseña cambiada Satisfactoriamente",
          token
        });
      }
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
};

module.exports = loginController;
