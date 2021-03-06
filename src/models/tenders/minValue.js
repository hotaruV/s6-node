import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const minValueSchema = Schema({
  id: { type: String, require },
  amount: { type: Number, require },
  currency: { type: String, require },
});

minValueSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("tender.minValue", minValueSchema);
