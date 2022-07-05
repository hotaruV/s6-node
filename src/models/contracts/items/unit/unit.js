import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const unitSchema = Schema({
  id: { type: String, require },
  name: { type: String, require },
  values: { type: Schema.Types.ObjectId, require,ref: "contract.item.unit.value"}
});

unitSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("contract.item.unit", unitSchema);
