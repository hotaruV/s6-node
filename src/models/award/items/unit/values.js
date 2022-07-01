const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const ItemValueSchema = Schema({
  id: { type: String, require },
  amount: { type: Number, require },
  currency: { type: String, require },
});

ItemValueSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model(
  "award.item.unit.value",
  ItemValueSchema
);