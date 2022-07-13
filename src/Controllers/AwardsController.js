import { response } from "express";
import  contractPeriod  from "../models/award/contractPeriod";
import  suppliers  from "../models/award/suppliers";
import  value  from "../models/award/value";
import  award  from "../models/award/awards";
import  getID  from "../helpers/getId";

const AwardsController = {
  contractPeriod: async (req, res = response) => {
    try {
      const contract = new contractPeriod(req.body);
      let count = await getID(contractPeriod);
      contract.id = count;

      let fecha_fin = new Date(req.body.endDate).getTime();
      let fecha_inicio = new Date(req.body.startDate).getTime();

      if (fecha_inicio > fecha_fin) {
        return res.status(400).json({
          ok: false,
          msg: "Fecha final no debe se menor a la fecha de inicio",
        });
      }

      await contract.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
  suppliers: async (req, res = response) => {
    try{
      const supplier = new suppliers(req.body);
      await supplier.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
  value: async (req, res = response) => {
    try{  
      const val = new value(req.body);
      let count = await getID(value);
      val.id = count;
      await val.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
  awardsCreate: async (req, res = response) => {
     try{ 
      const aw = new award(req.body);
      let count = await getID(award, true);
      aw.id = `${count}-award`;
      aw.documents.id = count;
      let date = new Date().toDateString();
      aw.date = date;
      await aw.save();
      return res.status(200).json({
        ok: true,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
  awardsShow: async (req, res = response) => {
    try{
      const id = req.params.id;
      console.log(id);
      const aw = await award
        .findOne({ id: id })
        .populate("value", "-__v")
        .populate("suppliers", "-__v")
        .populate("items", "-__v")
        .populate("contractPeriod", "-__v");
      if (!aw) {
        return res.status(404).json({
          ok: false,
          msg: "No hay registro hecho",
        });
      }
      res.status(200).json({
        award: {
          id: aw.id,
          title: aw.title,
          description: aw.description,
          status: aw.status,
          date: aw.date,
          value: aw.value,
          suppliers: aw.supplier,
          items: aw.items,
          contractPeriod: aw.contractPeriod,
          documents: aw.documents,
        },
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
  awardButton: () => {
    try{  
      this.contractPeriod();
      this.suppliers();
      this.value();
      this.documents();
      this.items();
      this.classifications();
      this.additionalClassifications();
      this.itemValue();
      this.itemUnit();
      this.awardsCreate();
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
};

module.exports = AwardsController;
