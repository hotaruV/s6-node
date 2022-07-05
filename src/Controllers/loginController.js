import response from "express";
import { JWTgenerate } from "../helpers/jwt";
import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";

const loginController = {
  login: async (req, res = response) => {
    const { email, password } = req.body;
    try {
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
    const uid = req.uid;
    const token = await JWTgenerate(uid);
    res.status(200).json({
      ok: true,
      uid,
      token,
    });
  },
  ChangePass: async (req, res = response) => {
    try {
      //console.log(req.body);
      let { email, password, newpassword, lastpassword } = req.body;
      const userData = await Usuario.findOne({ email });
      if (!userData) {
        res.status(200).json({
          ok: false,
          msg: "El usuario no existe en la base de datos"
        });
      }
      if (!bcrypt.compareSync(lastpassword, userData.password)) {
        res.status(200).json({
          ok: false,
          msg: "usuario o contraseña invalidos"
        });
      }
      const salt = bcrypt.genSaltSync();
      newpassword = bcrypt.hashSync(newpassword, salt);
      
      const passwordUpdate = await Usuario.updateOne(
        { email },
        { $set: { password: newpassword,  fist_login: false} }
      );

      if (passwordUpdate) {
        return res.status(400).json({
          ok: false,
          msg: "Contraseña cambiada Satisfactoriamente"
        });
      }
    } catch (error) {
      //console.log(error);
    }
  },
};

module.exports = loginController;
