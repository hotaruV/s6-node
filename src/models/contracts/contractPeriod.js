const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");


const ContractPeriodSchema = Schema({
    id: { type: String, require},
    startDate: { type: String, require},
    endDate: { type: String, require},
    maxExtentDate: { type: String, require, default: "0"},
    durationInDays: { type: Number},
  });
  
  ContractPeriodSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
  });
  
  module.exports = model("contract.period", ContractPeriodSchema);