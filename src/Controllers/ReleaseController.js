import { response } from "express";
import licitacion from "../models/licitacion";
import adjudicacion from "../models/adjudicacion";
import contrato from "../models/contrato";
import implementacion from "../models/implementacion";
import enmienda from "../models/enmienda";
import getID from "../helpers/getId";

const ReleaseController = {
  licitacionCreate: async (req, res = response) => {
    try {
      const lic = new licitacion(req.body);
      let count = await getID(licitacion);
      lic.id = count;
      count = await getID(licitacion, true);
      let date = new Date().toDateString();
      lic.ocid = `${count}- ${date}`;
      lic.date = date;
      await lic.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  licitacionShow: async (req, res = response) => {
    try {
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
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },

  adjudicacionCreate: async (req, res = response) => {
    try {
      const lic = new adjudicacion(req.body);
      let count = await getID(licitacion);
      lic.id = count;
      count = await getID(licitacion, true);
      let date = new Date().toDateString();
      lic.ocid = `${count}- ${date}`;
      lic.date = date;
      
      console.log(lic.id);
      await lic.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  adjudicacionShow: async (req, res = response) => {
    try {
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
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },

  contratoCreate: async (req, res = response) => {
    try {
      const lic = new contrato(req.body);
      let count = await getID(contrato);
      lic.id = count;
      count = await getID(contrato, true);
      let date = new Date().toDateString();
      lic.ocid = `${count}- ${date}`;
      lic.date = date;
      await lic.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  contratoShow: async (req, res = response) => {
    try {
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
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  allContratos: async (req, res) => {
    //console.log(desde);
    const [contratos, total, costo] = await Promise.all([
      contrato.find(
        {},
        //"ocid id date language tag initiationType parties buyer awards contracts"
      ),contrato.countDocuments(),
    ]);
    res.status(200).json({
      ok: true,
      contratos,
      total,
      costo,
    });
  },

  implementacionCreate: async (req, res = response) => {
    try {
      const lic = new implementacion(req.body);
      let count = await getID(licitacion);
      lic.id = count;
      count = await getID(licitacion, true);
      let date = new Date().toDateString();
      lic.ocid = `${count}- ${date}`;
      lic.date = date;
      await lic.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  implementacionShow: async (req, res = response) => {
    try {
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
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },

  enmiendaCreate: async (req, res = response) => {
    try {
      const lic = new enmienda(req.body);
      let count = await getID(licitacion);
      lic.id = count;
      count = await getID(licitacion, true);
      let date = new Date().toDateString();
      lic.ocid = `${count}- ${date}`;
      lic.date = date;
      await lic.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
  enmiendaShow: async (req, res = response) => {
    try {
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
    } catch (error) {
      return res.status(404).json({
        ok: false,
      });
    }
  },
};

module.exports = ReleaseController;
