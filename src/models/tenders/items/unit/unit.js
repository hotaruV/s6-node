const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const unitSchema = Schema({
  name: { type: String, require },
  values: { type: Schema.Types.ObjectId, require,ref: "edca_tender.item.unit.value"}
});

unitSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_tender.item.unit", unitSchema);
