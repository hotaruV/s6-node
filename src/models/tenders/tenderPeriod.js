const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");


const TenderPeriodSchema = Schema({
    startDate: { type: String, required: true},
    endDate: { type: String, required: true},
    maxExtentDate: { type: String, required: false, default: "0"},
    durationInDays: { type: Number, required: true},
  });
  
  TenderPeriodSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
  });
  
  module.exports = model("edca_tender.tenderPeriod", TenderPeriodSchema);