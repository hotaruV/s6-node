import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const ItemsSchema = Schema({
  id: { type: String, require },
  description: { type: String, require },
  classification: {
    type: Schema.Types.ObjectId,
    require,
    ref: "award.item.classification",
    autopopulate: true
  },
  additionalClassifications: [
    {
      type: Schema.Types.ObjectId,
      require,
      ref: "award.item.additionalClassifications",
      autopopulate: true
    },
  ],
  quantity: { type: Number, require },
  unit : { type: Schema.Types.ObjectId, require,ref: "award.item.unit", autopopulate: true}
});
ItemsSchema.plugin(require('mongoose-autopopulate'));
ItemsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("award.items", ItemsSchema);
