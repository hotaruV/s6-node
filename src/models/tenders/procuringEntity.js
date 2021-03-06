import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const procuringEntitySchema = Schema({
  id: { type: String, require },
  name: { type: String, require },
});

procuringEntitySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("tender.procuringentity", procuringEntitySchema);
