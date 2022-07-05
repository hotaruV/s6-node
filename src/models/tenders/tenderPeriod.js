import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');


const TenderPeriodSchema = Schema({
    id: { type: String, require},
    startDate: { type: String, require},
    endDate: { type: String, require},
    maxExtentDate: { type: String, require, default: "0"},
    durationInDays: { type: Number},
  });
  
  TenderPeriodSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
  });
  
  module.exports = model("tender.Period", TenderPeriodSchema);