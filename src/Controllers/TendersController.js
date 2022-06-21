const { response } = require("express");
const { JWTgenerate } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const TendersDocuments = require("../models/tenders/documents");
const Procuring = require("../models/tenders/procuringEntity");
// const { actualizarImagen } = require('../helpers/actualizarImagen');
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const procuringEntity = require("../models/tenders/procuringEntity");
const tenderPeriod = require("../models/tenders/tenderPeriod");
const awardPeriod = require("../models/tenders/awardPeriod");
const enquiryPeriod = require("../models/tenders/enquiryPeriod");
const value = require("../models/tenders/value");
const minValue = require("../models/tenders/minValue");

const TendersController = {
  documents: async (req, res = response) => {
    console.log(req.files);
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
    });
  },
  procuringEntity: async (req, res = response) => {
    const uid = req.params.id;
    const Procuring = new procuringEntity(req.body);
    await Procuring.save();
    return res.status(400).json({
      ok: true,
      Procuring,
    });
  },
  tenderPeriod: async (req, res = response) => {
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
    const Period = new tenderPeriod(req.body);
    Period.durationInDays = period;
    await Period.save();

    return res.status(400).json({
      ok: true,
      tenderPeriod: Period,
    });
  },
  awardPeriod: async (req, res = response) => {
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
    const Period = new awardPeriod(req.body);
    Period.durationInDays = period;
    await Period.save();

    return res.status(400).json({
      ok: true,
      awardPeriod: Period,
    });
  },
  enquiryPeriod: async(req, res = response) => {
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
    const Period = new enquiryPeriod(req.body);
    Period.durationInDays = period;
    await Period.save();

    return res.status(400).json({
      ok: true,
      enquiryPeriod: Period,
    });
  },
  minValue: async(req, res = response) => {
    const val = new minValue(req.body);
    await val.save();

    return res.status(400).json({
      ok: true,
      minValue: val,
    });
  },
  value: async(req, res = response) => {
    const val = new value(req.body);
    await val.save();

    return res.status(400).json({
      ok: true,
      value: val,
    });
  },
};

module.exports = TendersController;
