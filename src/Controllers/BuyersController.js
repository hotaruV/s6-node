import { response } from "express";
import buyers from "../models/buyer/buyer";

const BuyersController = {
    buyer: async (req, res = response) => {
    const buyer = new buyers(req.body);
    await buyer.save();
    return res.status(400).json({
      ok: true,
      buyer,
    });
  },
};

export default BuyersController;
