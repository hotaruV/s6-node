const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");


const enquiryPeriodSchema = Schema({
  id: { type: String, require},
  startDate: { type: String, require},
  endDate: { type: String, require},
  maxExtentDate: { type: String, default: "0" },
  durationInDays: { type: Number, require},
  
});

enquiryPeriodSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("tender.enquiryPeriod", enquiryPeriodSchema);