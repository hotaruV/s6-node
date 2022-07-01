const { response } = require("express");
const { JWTgenerate } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const contractPeriod = require("../models/award/contractPeriod");
const suppliers = require("../models/award/suppliers");
const value = require("../models/award/value");
const valuesItm = require("../models/award/items/unit/values");
const unitItm = require("../models/award/items/unit/unit");
const documents = require("../models/award/documents");
const items = require("../models/award/items/items");
const additionalClassifications = require("../models/award/items/additionalClassifications");
const classification = require("../models/award/items/classification");
const award = require("../models/award/awards");
const getID = require("../helpers/getId");

const AwardsController = {
  contractPeriod: async (req, res = response) => {
    const contract = new contractPeriod(req.body);
    let count = await getID(contractPeriod);  
    contract.id = count;

    let fecha_fin = new Date(req.body.endDate).getTime();
    let fecha_inicio = new Date(req.body.startDate).getTime();

    if (fecha_inicio > fecha_fin) {
      return res.status(400).json({
        ok: true,
        msg: "Fecha final no debe se menor a la fecha de inicio",
      });
    }

    await contract.save();
    return res.status(400).json({
      ok: true,
      contractPeriod: contract,
    });
  },
  suppliers: async (req, res = response) => {
    const supplier = new suppliers(req.body);
    await supplier.save();
    return res.status(400).json({
      ok: true,
      suppliers: supplier,
    });
  },
  value: async (req, res = response) => {
    const val = new value(req.body);
    let count = await getID(value);  
    val.id = count;
    await val.save();
    return res.status(400).json({
      ok: true,
      value: val,
    });
  },
  documents: async (req, res = response) => {
    let date = new Date();
    let time =
      " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let output =
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();

    const Docs = new documents(req.body);
    
    function isUrl(s) {
      var regexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
    }

    let ur = req.body.url;
    let x = isUrl(ur);

    if (!x) {
      return res.status(400).json({
        ok: false,
        msg: "Necesita ser una URL válida",
      });
    }

    Docs.documentType = "awardNotice";
    Docs.datePublished = output + time;
    Docs.language = "es";
    Docs.format;
    let count = await getID(documents);
    Docs.id = count;
    await Docs.save();
    return res.status(400).json({
      ok: true,
      documents: Docs,
      msg: "Documento subido de manera exitosa",
    });
  },
  items: async (req, res = response) => {
    const item = new items(req.body);
    let count = await getID(items);
    item.id = count;
    await item.save();
    return res.status(400).json({
      item,
    });
  },
  classifications: async (req, res = response) => {
    const classifications = new classification(req.body);
    let count = await getID(classification);
    classifications.id = count;
    await classifications.save();
    return res.status(400).json({
      ok: true,
      classifications,
    });
  },
  additionalClassifications: async (req, res = response) => {
    const val = new additionalClassifications(req.body);
    let count = await getID(additionalClassifications);
    val.id = count;
    await val.save();
    return res.status(400).json({
      ok: true,
      additionalClassifications: val,
    });
  },
  itemValue: async (req, res = response) => {
    const val = new valuesItm(req.body);
    let count = await getID(valuesItm);
    val.id = count;
    await val.save();

    return res.status(400).json({
      ok: true,
      value: val,
    });
  },
  itemUnit: async (req, res = response) => {
    const val = new unitItm(req.body);
    let count = await getID(unitItm);
    val.id = count;
    await val.save();

    return res.status(400).json({
      ok: true,
      value: val,
    });
  },
  awardsCreate: async (req, res = response) => {
    const aw = new award(req.body);
    let count = await getID(award, true);
    aw.id =  `${count}-award`;
    await aw.save();
    return res.status(400).json({
      ok: true,
      award: aw,
    });
  },
  awardsShow: async (req, res = response) => {
    const id = req.params.id;
    console.log(id);
    const aw = await award
      .findOne({"id" : id})
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
      "award" : {
        "id":aw.id,
        "title":aw.title,
        "description":aw.description,
        "status":aw.status,
        "date":aw.date,
        "value":aw.value,
        "suppliers":aw.supplier,
        "items":aw.items,
        "contractPeriod":aw.contractPeriod,
        "documents":aw.documents,
      }
    });
  },
};

module.exports = AwardsController;