const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const minValueSchema = Schema({
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
});

minValueSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_tender.minValue", minValueSchema);