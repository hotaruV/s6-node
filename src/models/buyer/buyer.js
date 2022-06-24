const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const Buyer = new Schema({
    id: { type: String, require ,autopopulate: true},
    name: { type: String, require ,autopopulate: true},
});

Buyer.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});
Buyer.plugin(require('mongoose-autopopulate'));
module.exports = model("buyer", Buyer);