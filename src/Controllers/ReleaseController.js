import { response } from "express";
import {licitacion} from "../models/licitacion";
import {getID} from "../helpers/getId";

const ReleaseController = {
  licitacionCreate: async (req, res = response) => {
    const lic = new licitacion(req.body);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
    
  licitacionShow: async (req, res = response) => {
    const id = req.params.id;
    let ID = getID(licitacion);
    const lic = await licitacion
      .findById(id)
      .populate("parties",'-__v')
      .populate("buyer",'-__v')
      .populate("tender",'-__v');
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
        "release": {
          "ocid": lic.ocid,
          "id":lic.id,
          "date":lic.date,
          "language":lic.language,
          "tag":lic.tag,
          "initiationType":lic.initiationType,
          "parties":lic.parties,
          "buyer":lic.buyer,
          "tender":lic.tender
        }
    });
  }
};

module.exports = ReleaseController;
