const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const additionalClassificationsSchema = Schema({
  scheme: { type: String, require },
  endDate: { type: String, require },
  description: { type: String, default: "0" },
  uri: { type: String, require },
});

additionalClassificationsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model(
  "edca_tender.item.additionalClassifications",
  additionalClassificationsSchema
);
