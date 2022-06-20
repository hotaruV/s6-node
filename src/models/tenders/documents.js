const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const TederDocumentsSchema = Schema({
  id: { type: String, require: true },
  documentType: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  url: { type: String, require: true },
  datePublished: { type: String, require: true, default: fecha },
  format: { type: String, require: true },
  language: { type: String, require: false },
});

TederDocumentsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_tender.document", TederDocumentsSchema);
