import { response } from "express";
import getID from "../helpers/getId";
import items from "../models/items/items";
import valuesItm from "../models/items/unit/values";
import unitItm from "../models/items/unit/unit";
import classification from "../models/items/classification";
import additionalClassifications from "../models/items/additionalClassifications";

const ItemsController = {
  items: async (req, res = response) => {
    const item = new items(req.body);
    let count = await getID(items);
    item.id = count;
    await item.save();
    return res.status(400).json({
      item,
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
  classifications: async (req, res = response) => {
    const classifications = new classification(req.body);
    let count = await getID(classification);
    classifications.scheme = "Catálogo de PyS";
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
    val.scheme = "Catálogo de PyS";
    await val.save();
    return res.status(400).json({
      ok: true,
      additionalClassifications: val,
    });
  },
}

module.exports = ItemsController;