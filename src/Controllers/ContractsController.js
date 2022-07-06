import { response } from "express";
import getID from "../helpers/getId";
import contratos from "../models/contracts/contracts";
import ContractPeriod from "../models/contracts/contractPeriod";
import value from "../models/contracts/value";

const ContractsController = {
  documents: async (req, res = response) => {
    /*console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No Hay archivos",
      });
    }
    const tipo = "documentos";
    const file = req.files.document;
    const originalName = req.files.document.name;
    console.log(originalName);
    const shotName = file.name.split(".");
    const extension = shotName[shotName.length - 1];
    const validas = ["pdf"];
    if (!validas.includes(extension)) {
      return res.status(400).json({
        ok: false,
        msg: "Archivo Invalido solo se permiten pdfs",
      });
    }
    const nameFile = `${uuidv4()}.${extension}`;
    const path = `./src/uploads/${tipo}/${uuidv4()}-${originalName}`;
    file.mv(path, (err) => {
      if (err)
        return res.status(500).json({
          ok: false,
          msg: "Error al mover imagen",
        });

      //actualizar Imaagen
      //actualizarImagen(tipo, id, nameFile)

      res.status(200).json({
        ok: true,
        msg: "Archivo subido exitosamente",
        nombre: originalName,
      });
    });*/

    let date = new Date();
    let time =
      " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let output =
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();

    const Docs = new TendersDocuments(req.body);

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

    Docs.documentType = "tenderNotice";
    Docs.datePublished = output + time;
    Docs.language = "es";
    Docs.format;
    let count = await getID(TendersDocuments);
    Docs.id = count;
    await Docs.save();
    return res.status(400).json({
      ok: true,
      documents: Docs,
      msg: "Documento subido de manera exitosa",
    });
  },
  ContractPeriod: async (req, res = response) => {
    let fecha_fin = new Date(req.body.endDate).getTime();
    let fecha_inicio = new Date(req.body.startDate).getTime();
    if (fecha_inicio > fecha_fin) {
      return res.status(400).json({
        ok: true,
        msg: "Fecha final no debe se menor a la fecha de inicio",
      });
    }

    let maxExtend2 = req.body.maxExtentDate;
    let diff = fecha_fin - fecha_inicio;
    let period = diff / (1000 * 60 * 60 * 24) + parseInt(maxExtend2);
    const Period = new ContractPeriod(req.body);
    Period.durationInDays = period;
    let count = await getID(ContractPeriod);
    Period.id = count;
    await Period.save();

    return res.status(400).json({
      ok: true,
      period: Period,
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
  contractCreate: async (req, res = response) => {
    //console.log(req.body);
    const contract = new contratos(req.body);
    let count = await getID(contratos, true);
    contract.id = `${count}--contract`;
    contract.awardID = `${count}--adward`;
    console.log(contract.id);

    await contract.save();
    return res.status(400).json({
      ok: true,
      contract,
    });
  },
  contractShow: async (req, res = response) => {
    const id = req.params.id;
    console.log(id);
    const contract = await contratos
      .findOne({ id: id })
      .populate("value", "-__v");

    if (!contract) {
      return res.status(404).json({
        ok: false,
        msg: "No hay registro hecho",
      });
    }
    res.status(200).json({
      contract: {
        id: contract.id,
        awardID: contract.awardID,
        title: contract.title,
        description: contract.description,
        status: contract.status,
        period: contract.period,
        value: contract.value,
        items: contract.items,
        dateSigned: contract.dateSigned,
        documents: contract.documents,
      },
    });
  },
  contractButton: () => {
    this.documents();
    this.ContractPeriod();
    this.value();
    this.items();
    this.TendersItemValue();
    this.classifications();
    this.additionalClassifications();
    this.contractCreate();
  },
  contractUpdate: async (req, res = response) => {},
};

module.exports = ContractsController;
