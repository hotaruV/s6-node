const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const valueSchema = Schema({
    amount: { type: Number, require},
    currency: { type: String, require},
});

valueSchema.methods.toJson = function () {
  const { __v, _id, ...data } = this.toObject();
  object.uid = _id;
  return data;
};

module.exports = model("tender.value", valueSchema);