const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");


const procuringEntitySchema = Schema({
    id: { type: String, require},
    name: { type: String, require},
  });
  
  procuringEntitySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
  });
  
  module.exports = model("edca_tender.procuringentity", procuringEntitySchema);