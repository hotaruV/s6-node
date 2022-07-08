import { response } from "express";
import buyers from "../models/buyer/buyer";

const BuyersController = {
  buyer: async (req, res = response) => {
    try {
      const buyer = new buyers(req.body);
      await buyer.save();
      return res.status(400).json({
        ok: true
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: "Error en servidor por favor comunicarse con administración",
      });
    }
  },
};

export default BuyersController;
