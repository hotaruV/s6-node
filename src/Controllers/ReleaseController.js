import { response } from "express";
import  licitacion  from "../models/licitacion";
import adjudicacion from "../models/adjudicacion";
import contrato from "../models/contrato";
import implementacion from "../models/implementacion";
import enmienda from "../models/enmienda";
import  getID  from "../helpers/getId";

const ReleaseController = {
  licitacionCreate: async (req, res = response) => {
    const lic = new licitacion(req.body);
    let count = await getID(licitacion);
    lic.id = count;
    count = await getID(licitacion, true);
    let date = new Date().toDateString();
    lic.ocid = `${count}- ${date}`;
    lic.date = date;
    lic.ocid = 
    console.log(lic.id);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  licitacionShow: async (req, res = response) => {
    const id = req.params.id;
    const lic = await licitacion
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("tender", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta licitación",
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
    let count = await getID(adjudicacion, true);
    lic.id = count;
    console.log(lic.id);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  adjudicacionShow: async (req, res = response) => {
    const id = req.params.id;
    const lic = await adjudicacion
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("tender", "-__v")
      .populate("awards", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta adjudicación",
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
    let count = await getID(contrato, true);
    lic.id = count;
    console.log(lic.id);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  contratoShow: async (req, res = response) => {
    const id = req.params.id;
    const lic = await contrato
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("awards", "-__v")
      .populate("contracts", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe este contrato",
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

  implementacionCreate: async (req, res = response) => {
    const lic = new implementacion(req.body);
    let count = await getID(implementacion, true);
    lic.id = count;
    console.log(lic.id);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  implementacionShow: async (req, res = response) => {
    const id = req.params.id;
    const lic = await implementacion
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("contracts", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta implementación",
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
        contracts: lic.contracts,
      },
    });
  },

  enmiendaCreate: async (req, res = response) => {
    const lic = new enmienda(req.body);
    let count = await getID(enmienda, true);
    lic.id = count;
    console.log(lic.id);
    await lic.save();
    return res.status(400).json({
      ok: true,
      lic,
    });
  },
  enmiendaShow: async (req, res = response) => {
    const id = req.params.id;
    const lic = await enmienda
      .findById(id)
      .populate("parties", "-__v")
      .populate("buyer", "-__v")
      .populate("awards", "-__v")
      .populate("contracts", "-__v");
    if (!lic) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta enmienda al contrato",
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
