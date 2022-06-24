const { Schema, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const ItemsSchema = Schema({
  description: { type: String, require },
  classification: {
    type: Schema.Types.ObjectId,
    require,
    ref: "tender.item.classification",
  },
  additionalClassifications: [
    {
      type: Schema.Types.ObjectId,
      require,
      ref: "tender.item.additionalClassifications",
      autopopulate: true
    },
  ],
  quantity: { type: Number, require },
  unit : { type: Schema.Types.ObjectId, require,ref: "tender.item.unit" }
});
ItemsSchema.plugin(require('mongoose-autopopulate'));
ItemsSchema.methods.toJSON = function () {
  const { __v, _id, ...item } = this.toObject();
  return item;
};

module.exports = model("tender.items", ItemsSchema);
