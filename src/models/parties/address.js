const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const addressSchema = Schema({
    streetAddress: { type: String, require},
    locality: { type: String, require},
    region: { type: String, require},
    postalCode: { type: String, require},
    countryName: { type: String, require},
});

addressSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("parties.address", addressSchema);