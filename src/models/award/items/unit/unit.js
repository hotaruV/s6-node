const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const unitSchema = Schema({
  id: { type: String, require },
  name: { type: String, require },
  values: { type: Schema.Types.ObjectId, require,ref: "award.item.unit.value", autopopulate: true}
});
unitSchema.plugin(require('mongoose-autopopulate'));
unitSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("award.item.unit", unitSchema);
