import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const ContractsEnSchema = Schema({
  id: { type: String, require},
  awardID: { type: String, require},
  title: { type: String, require },
  description: { type: String, require },
  status: { type: String, require },
  period: { type: Schema.Types.ObjectId, require, ref: "contract.period", autopopulate: true},
  value: { type: Schema.Types.ObjectId, require, ref: "contract.value", autopopulate: true},
  items: [{ type: Schema.Types.ObjectId, require, ref: "items", autopopulate: true }],
  dateSigned: { type: Date, require },
  documents: [
    {
      id: { type: String, require },
      awardID: { type: String, require },
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
      id: { type: String, require },
      date: { type: String, require },
      rationale: { type: String, require },
      amendsReleaseID: { type: String, require },
      releaseID: { type: String, require },
    },
  ],
});
ContractsEnSchema.plugin(require('mongoose-autopopulate'));
ContractsEnSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("contractEn", ContractsEnSchema);
