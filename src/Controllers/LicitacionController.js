const { response } = require("express");
const { JWTgenerate } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const licitacion = require("../models/licitacion");
const { populate } = require("../models/usuario");
const getID = require("../helpers/getId")

const LicitacionController = {
  licitacionCreate: async (req, res = response) => {
    const lic = new licitacion(req.body);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },

  licitacionShow: async (req, res = response) => {
    let getID = GetID(licitacion, req.params.id);

    const id = req.params.id;
    const lic = await licitacion
      .findById(id)
      .populate("parties")
      .populate("buyer")
      .populate("tender");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
        release: lic,
    });
  }
};

module.exports = LicitacionController;
