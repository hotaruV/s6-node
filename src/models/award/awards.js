import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const awardSchema = Schema({
    id: { type: String, require},
    title: { type: String, require },
    description: { type: String, require },
    status: { type: String, require },
    date: { type: Date, require },
    value: { type: Schema.Types.ObjectId, require, ref: "award.value", autopopulate: true },
    suppliers: [{ type: Schema.Types.ObjectId, require, ref: "awards.suppliers", autopopulate: true }],
    items: [{ type: Schema.Types.ObjectId, require, ref: "items", autopopulate: true }],
    contractPeriod: { type: Schema.Types.ObjectId, require, ref: "awards.contractPeriod", autopopulate: true},
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
awardSchema.plugin(require('mongoose-autopopulate'));
awardSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("awards", awardSchema);