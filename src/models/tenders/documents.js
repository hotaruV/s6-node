const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const TederDocumentsSchema = Schema({
  id: { type: String, require},
  documentType: { type: String, require},
  title: { type: String, require},
  description: { type: String, require},
  url: { type: String, require},
  datePublished: { type: String, require, default: fecha },
  format: { type: String },
  language: { type: String },
});

TederDocumentsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_tender.document", TederDocumentsSchema);
