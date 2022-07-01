const { response } = require("express");
const getID = require("../helpers/getId");
const contracts = require("../models/contracts/contracts");
const ContractPeriod = require("../models/contracts/contractPeriod");

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
    let count = await getID(tenderPeriod);
    Period.id = count;
    await Period.save();

    return res.status(400).json({
      ok: true,
      period: Period,
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
    const PeriodAw = new awardPeriod(req.body);
    PeriodAw.durationInDays = period;
    let count = await getID(awardPeriod);
    PeriodAw.id = count;
    await PeriodAw.save();

    return res.status(400).json({
      ok: true,
      awardPeriod: PeriodAw,
    });
  },
  enquiryPeriod: async (req, res = response) => {
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
    let count = await getID(enquiryPeriod);

    Period.durationInDays = period;
    Period.id = count;
    //console.log(count);
    await Period.save();

    return res.status(400).json({
      ok: true,
      enquiryPeriod: Period,
    });
  },
  minValue: async (req, res = response) => {
    const val = new minValue(req.body);
    let count = await getID(minValue);
    val.id = count;
    await val.save();

    return res.status(400).json({
      ok: true,
      minValue: val,
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
  items: async (req, res = response) => {
    const item = new items(req.body);
    let count = await getID(items);
    item.id = count;
    await item.save();
    return res.status(400).json({
      item,
    });
  },
  TendersItemValue: async (req, res = response) => {
    const val = new valuesItm(req.body);
    let count = await getID(valuesItm);
    val.id = count;
    await val.save();

    return res.status(400).json({
      ok: true,
      value: val,
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
  contractCreate: async (req, res = response) => {
    console.log(req.body);
    const contract = new contracts(req.body);
    let count = await getID(contracts, true);
    contract.id =  `${count}--contract`;
    contract.awardID =  `${count}--adward`;
    //console.log(contract.id);
    await contract.save();
    return res.status(400).json({
      ok: true,
      contract,
    });
  },
  contractShow: async (req, res = response) => {
    const id = req.params.id;
    console.log(id);
    const tender = await tenders
      .findOne({"id" : id})
      .populate("minValue", "-__v")
      .populate("value", "-__v")
      .populate("procuringEntity", "name")
      .populate("tenderPeriod", "-__v")
      .populate("awardPeriod", "-__v")
      .populate("enquiryPeriod", "-__v");
    if (!tender) {
      return res.status(404).json({
        ok: false,
        msg: "No hay registro hecho",
      });
    }
    res.status(200).json({
      tender,
    });
  },
  contractUpdate: async (req, res = response) => {},
};

module.exports = ContractsController;
