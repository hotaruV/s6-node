import { response } from "express";
import identifier from "../models/parties/identifier";
import address from "../models/parties/address";
import contactPoint from "../models/parties/contactPoint";
import parties from "../models/parties/parties";
import schemaGen from "../helpers/id_parties";
import getID from "../helpers/getId";


const PartiesController = {
  identifier: async (req, res = response) => {
    const ide = new identifier(req.body);
    ide.scheme = "MX-RFC";
    // let z=0;
    // do {
    //   let scheme = schemaGen();
    //   const ExisteScheme = await identifier.findOne({scheme});
    //   if (!ExisteScheme) {
    //     z=1;
    //   }
    // console.log(scheme);
    // }while(z!=1);

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

    let count = await getID(address);  
    add.id = count;

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

    let count = await getID(contactPoint);  
    contact.id = count;

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
      .populate("identifier",'-__v')
      .populate("address",'-__v')
      .populate("contactPoint",'-__v');
    if (!partie) {
      return res.status(404).json({
        ok: false,
        msg: "No existe esta partie",
      });
    }
    res.status(200).json({
        "paties":{
          "identifier":partie.identifier,
          "name":partie.name,
          "address":partie.address,
          "contactPoint":partie.contactPoint,
          "roles":partie.roles, 
          "id":partie.id
        }
    });
  },
  partiesButton: () => {
    this.identifier();
    this.address();
    this.contactPoint();
    this.partiesCreate();
  },
};

module.exports = PartiesController;
