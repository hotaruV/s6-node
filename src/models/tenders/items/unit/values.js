const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const ItemValueSchema = Schema({
  amount: { type: Number, require },
  currency: { type: String, require },
});

ItemValueSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model(
  "edca_tender.item.unit.value",
  ItemValueSchema
);
