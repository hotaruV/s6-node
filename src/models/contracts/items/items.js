const { Schema, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const ItemsCSchema = Schema({
  id: { type: String, require },
  description: { type: String, require },
  classification: {
    type: Schema.Types.ObjectId,
    require,
    ref: "contract.item.classification",
    autopopulate: true
  },
  additionalClassifications: [
    {
      type: Schema.Types.ObjectId,
      require,
      ref: "contract.item.additionalClassifications",
      autopopulate: true
    },
  ],
  quantity: { type: Number, require },
  unit : { type: Schema.Types.ObjectId, require,ref: "contract.item.unit" }
});
ItemsCSchema.plugin(require('mongoose-autopopulate'));
ItemsCSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("contract.items", ItemsCSchema);
