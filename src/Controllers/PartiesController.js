const { response } = require("express");
const { JWTgenerate } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const identifier = require("../models/parties/identifier");
const address = require("../models/parties/address");
const contactPoint = require("../models/parties/contactPoint");
const parties = require("../models/parties/parties");

const PartiesController = {
  identifier: async (req, res = response) => {
    const ide = new identifier(req.body);

    function isUrl(s) {
      var regexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
    }

    let ur = req.body.uri;
    let x = isUrl(ur);

    if (!x) {
      return res.status(400).json({
        ok: false,
        msg: "Necesita ser una URL válida",
      });
    }

    await ide.save();
    return res.status(400).json({
      ok: true,
      identifier: ide,
    });
  },
  address: async (req, res = response) => {
    const add = new address(req.body);
    await add.save();

    return res.status(400).json({
      ok: true,
      address: add,
    });
  },
  contactPoint: async (req, res = response) => {
    const contact = new contactPoint(req.body);

    function isUrl(s) {
      var regexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
    }
    function validarEmail(s) {
      var regexp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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

    let em = req.body.email;
    let y = validarEmail(em);

    if (!y) {
      return res.status(400).json({
        ok: false,
        msg: "Necesita ser un E-mail válido",
      });
    }

    await contact.save();
    return res.status(400).json({
      ok: true,
      contactPoint: contact,
    });
  },
  partiesCreate: async (req, res = response) => {
    const partie = new parties(req.body);
    await partie.save();
    return res.status(400).json({
      ok: true,
      partie,
    });
  },
  partiesShow: async (req, res = response) => {
    const id = req.params.id;
    const partie = await parties
      .findById(id)
      .populate("identifier")
      .populate("address")
      .populate("contactPoint");
    if (!partie) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
        partie,
    });
  }
};

module.exports = PartiesController;