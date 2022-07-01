const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const contactPointSchema = Schema({
    name: { type: String, require},
    email: { type: String, require},
    telephone: { type: String, require},
    faxNumber: { type: String, require},
    url: { type: String, require},
    id: { type: Number}
});

contactPointSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("parties.contactPoint", contactPointSchema);