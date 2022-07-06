import { response } from "express";
import  licitacion  from "../models/licitacion";
import adjudicacion from "../models/adjudicacion";
import contrato from "../models/conrato";
import  getID  from "../helpers/getId";

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
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("tender", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
      release: {
        ocid: lic.ocid,
        id: lic.id,
        date: lic.date,
        language: lic.language,
        tag: lic.tag,
        initiationType: lic.initiationType,
        parties: lic.parties,
        buyer: lic.buyer,
        tender: lic.tender,
      },
    });
  },

  adjudicacionCreate: async (req, res = response) => {
    const lic = new adjudicacion(req.body);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  adjudicacionShow: async (req, res = response) => {
    const id = req.params.id;
    let ID = getID(adjudicacion);
    const lic = await adjudicacion
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("tender", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
      release: {
        ocid: lic.ocid,
        id: lic.id,
        date: lic.date,
        language: lic.language,
        tag: lic.tag,
        initiationType: lic.initiationType,
        parties: lic.parties,
        buyer: lic.buyer,
        tender: lic.tender,
        awards: lic.awards,
      },
    });
  },

  contratoCreate: async (req, res = response) => {
    const lic = new contrato(req.body);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  contratoShow: async (req, res = response) => {
    const id = req.params.id;
    let ID = getID(contrato);
    const lic = await contrato
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("tender", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
      release: {
        ocid: lic.ocid,
        id: lic.id,
        date: lic.date,
        language: lic.language,
        tag: lic.tag,
        initiationType: lic.initiationType,
        parties: lic.parties,
        buyer: lic.buyer,
        awards: lic.awards,
        contracts: lic.contracts,
      },
    });
  },
};

module.exports = ReleaseController;
