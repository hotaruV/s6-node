const { Schema, Model, model } = require("mongoose");
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
    },
  ],
  quantity: { type: Number, require },
  unit : { type: Schema.Types.ObjectId, require,ref: "tender.item.unit"}
});

ItemsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("tender.items", ItemsSchema);
