const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const contractPeriodSchema = Schema({
  startDate: { type: String, require},
  endDate: { type: String, require},
  id: {type: Number, require}
});

contractPeriodSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("awards.contractPeriod", contractPeriodSchema);
