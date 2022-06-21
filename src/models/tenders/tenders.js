const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const TendersSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    items: [
        {
            description: String,
            classification: String,
            additionalClassifications: Number,
            quantity: Number,
        }
    ],
    minValue: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.minValue' },
    value: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.value' },
    procurementMethod: { type: String, required: true },
    procurementMethodRationale: { type: String, required: true },
    awardCriteria: { type: String, required: true },
    awardCriteriaDetails: { type: String, required: true },
    submissionMethodDetails: { type: String, required: true },
    enquiryPeriod: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.enquiryPeriod' },
    hasEnquiries: { type: Boolean, required: true, default: false },
    tenderPeriod: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.tenderPeriod' },
    awardPeriod: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.awardperiod' },
    procuringEntity: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.procuringentity' },
    documents: { type: Schema.Types.ObjectId, required: true, ref: 'edca_tender.document' },
});

TendersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_tender.awardperiod", TendersSchema);