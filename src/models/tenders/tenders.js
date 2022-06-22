const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const TendersSchema = Schema({
    title: { type: String, required},
    description: { type: String, required},
    status: { type: String, required},
    items: [
        {
            description: String,
            classification: String,
            additionalClassifications: Number,
            quantity: Number,
        }
    ],
    minValue: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.minValue' },
    value: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.value' },
    procurementMethod: { type: String, require},
    procurementMethodRationale: { type: String, require},
    awardCriteria: { type: String, require},
    awardCriteriaDetails: { type: String, require},
    submissionMethodDetails: { type: String, require},
    enquiryPeriod: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.enquiryPeriod' },
    hasEnquiries: { type: Boolean, require, default: false },
    tenderPeriod: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.tenderPeriod' },
    awardPeriod: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.awardperiod' },
    procuringEntity: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.procuringentity' },
    documents: { type: Schema.Types.ObjectId, require, ref: 'edca_tender.document' },
});

TendersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_tender.awardperiod", TendersSchema);