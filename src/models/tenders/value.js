import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const valueSchema = Schema({
  id: { type: String, require },
  amount: { type: Number, require },
  currency: { type: String, require },
});

valueSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("tender.value", valueSchema);
