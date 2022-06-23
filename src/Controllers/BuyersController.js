const { response } = require("express");
const { JWTgenerate } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const buyers = require("../models/buyer/buyer");

const PartiesController = {
    buyer: async (req, res = response) => {
    const buyer = new buyers(req.body);
    await buyer.save();
    return res.status(400).json({
      ok: true,
      buyer,
    });
  },
};

module.exports = PartiesController;
