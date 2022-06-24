const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const TendersSchema = Schema({
  title: { type: String, require },
  description: { type: String, require },
  status: { type: String, require },
  items: [{ type: Schema.Types.ObjectId, require, ref: "tender.items", autopopulate: true }],
  minValue: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.minValue",
  },
  value: { type: Schema.Types.ObjectId, require, ref: "tender.value" },
  procurementMethod: { type: String, require },
  procurementMethodRationale: { type: String, require },
  awardCriteria: { type: String, require },
  awardCriteriaDetails: { type: String, require },
  submissionMethodDetails: { type: String, require },
  enquiryPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.enquiryPeriod",
  },
  hasEnquiries: { type: Boolean, require, default: false },
  tenderPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.Period",
  },
  awardPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.awardperiod",
  },
  procuringEntity: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.procuringentity",
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
});
TendersSchema.plugin(require('mongoose-autopopulate'));
TendersSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.ocid = _id;
  return object;
};

module.exports = model("tender", TendersSchema);
