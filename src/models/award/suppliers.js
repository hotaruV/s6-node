import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const suppliersSchema = Schema({
  id: {type: String, require},
  name: {type: String, require}
});

suppliersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("awards.suppliers", suppliersSchema);