import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const TendersSchema = Schema({
  id: { type: String, require},
  title: { type: String, require },
  description: { type: String, require },
  status: { type: String, require },
  items: [{ type: Schema.Types.ObjectId, require, ref: "items", autopopulate: true }],
  minValue: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.minValue",
    autopopulate: true
  },
  value: { type: Schema.Types.ObjectId, require, ref: "tender.value", autopopulate: true},
  procurementMethod: { type: String, require },
  procurementMethodRationale: { type: String, require },
  awardCriteria: { type: String, require },
  awardCriteriaDetails: { type: String, require },
  submissionMethodDetails: { type: String, require },
  enquiryPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.enquiryPeriod",
    autopopulate: true
  },
  hasEnquiries: { type: Boolean, require, default: false },
  tenderPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.Period",
    autopopulate: true
  },
  awardPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.awardperiod",
    autopopulate: true
  },
  procuringEntity: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.procuringentity",
    autopopulate: true
  },
  documents: [
    {
      id: { type: String, require },
      documentType: { type: String, require },
      title: { type: String, require },
      description: { type: String, require },
      url: { type: String, require },
      datePublished: { type: String, require, default: fecha },
      format: { type: String },
      language: { type: String },
    },
  ],
  amendments: [
    {
      id: { type: String },
      date: { type: String },
      rationale: { type: String },
      description: { type: String },
      amendsReleaseID: { type: String },
      releaseID: { type: String },
     }
 ]
});
TendersSchema.plugin(require('mongoose-autopopulate'));
TendersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("tender", TendersSchema);
