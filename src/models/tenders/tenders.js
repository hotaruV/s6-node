const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const TendersSchema = Schema({
  title: { type: String, require },
  description: { type: String, require },
  status: { type: String, require },
  minValue: {
    type: Schema.Types.ObjectId,
    require,
    ref: "edca_tender.minValue",
  },
  value: { type: Schema.Types.ObjectId, require, ref: "edca_tender.value" },
  value: { type: Schema.Types.ObjectId, require, ref: "edca_tender.value" },
  procurementMethod: { type: String, require },
  procurementMethodRationale: { type: String, require },
  awardCriteria: { type: String, require },
  awardCriteriaDetails: { type: String, require },
  submissionMethodDetails: { type: String, require },
  enquiryPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "edca_tender.enquiryPeriod",
  },
  hasEnquiries: { type: Boolean, require, default: false },
  tenderPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "edca_tender.tenderPeriod",
  },
  awardPeriod: {
    type: Schema.Types.ObjectId,
    require,
    ref: "edca_tender.awardperiod",
  },
  procuringEntity: {
    type: Schema.Types.ObjectId,
    require,
    ref: "edca_tender.procuringentity",
  },
  documents: [
    {
        id: { type: String, require},
        documentType: { type: String, require},
        title: { type: String, require},
        description: { type: String, require},
        url: { type: String, require},
        datePublished: { type: String, require, default: fecha },
        format: { type: String },
        language: { type: String },
    },
  ],
});

TendersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.ocid = _id;
  return object;
});

module.exports = model("edca_tender", TendersSchema);
