const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const identifierSchema = Schema({
    scheme: { type: String, require},
    id: { type: String, require},
    legalName: { type: String, require},
    uri: { type: String, require},
});

identifierSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_parties.identifier", identifierSchema);