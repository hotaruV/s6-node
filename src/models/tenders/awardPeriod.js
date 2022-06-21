const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");


const awardPeriodSchema = Schema({
    startDate: { type: String, require: true },
    endDate: { type: String, require: true },
    maxExtendDate: { type: String, require: true},
    durationInDays: { type: Number, require: true },
  });
  
  awardPeriodSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
  });

  module.exports = model("edca_tender.awardperiod", awardPeriodSchema);