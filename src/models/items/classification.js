import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const ClassificationsSchema = Schema({
  id: { type: String, require },
  scheme: { type: String, require },
  //endDate: { type: String, require },
  description: { type: String, default: "0" },
  uri: { type: String, require },
});

ClassificationsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model(
  "item.classification",
  ClassificationsSchema
);
