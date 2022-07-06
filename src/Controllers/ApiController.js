import { response } from "express";
import licitacion from "../models/licitacion";
import buyer from "../models/buyer/buyer";
import tenders from "../models/tenders/tenders";
import supplier from "../models/award/suppliers";
import { getID } from "../helpers/getId";

const ApiController = {
  Summary: async (req, res = response) => {
    let releases = licitacion;
    let buyers = buyer;
    let totalAmount = tenders;
    let contracts_amounts = tenders;

    let queries = [
      releases.countDocuments(),
      buyers.countDocuments(),
      releases.countDocuments({
        "tender.procurementMethod": { $regex: "open", $options: "i" },
      }),
      releases.countDocuments({
        "tender.procurementMethod": { $regex: "selective", $options: "i" },
      }),
      releases.countDocuments({
        "tender.procurementMethod": { $regex: "direct", $options: "i" },
      }),
      totalAmount.findOne(),
      contracts_amounts.findOne({ procurementMethod: "open" }),
      contracts_amounts.findOne({ procurementMethod: "selective" }),
      contracts_amounts.findOne({ procurementMethod: "direct" }),
      contracts_amounts.findOne({ procurementMethod: null }),
    ];

    //console.log(queries);

    Promise.all(queries).then((d) => {
      //console.log(d);
      res.json({
        procedimientos: d[0],
        instituciones: d[1],
        counts: {
          open: d[2],
          selective: d[3],
          direct: d[4],
          other: d[0] - (d[2] + d[3] + d[4]),
        },
        amounts: {
          total: d[5] ? d[5].total : 0,
          open: d[6] ? d[6].total : 0,
          selective: d[7] ? d[7].total : 0,
          direct: d[8] ? d[8].total : 0,
          other: d[9] ? d[9].total : 0,
        },
      });
    });
  },

  topBuyers: async (req, res) => {
    let { n } = req.params;
    if (isNaN(n)) {
      n = 10;
    } else {
      n = Math.abs(n);
    }

    const [buyers, total] = await Promise.all([
      buyer.find({}, "id name").limit(n),
      buyer.countDocuments(),
    ]);
    res.status(200).json({
      ok: true,
      buyers,
      total,
    });
  },
  topsupplier: async (req, res) => {
    let { n } = req.params;
    if (isNaN(n)) {
      n = 10;
    } else {
      n = Math.abs(n);
    }

    //console.log(n);

    if (n >= 50) {
      n = 50;
    }

    const [suppliers, total] = await Promise.all([
      supplier.find({}, "id name").limit(n),
      supplier.countDocuments(),
    ]);
    res.status(200).json({
      ok: true,
      suppliers,
      total,
    });
  },
};

module.exports = ApiController;
