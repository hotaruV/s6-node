const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const PartyRoles = {
    values: ['buyer','procuringEntity','supplier','tenderer','funder','enquirer','payer','payee',
            'reviewBody','interestedParty'],
    message: '{VALUE} No es un Rol Permitido'
}

const PartiesSchema = new Schema({
    identifier: { type: Schema.Types.ObjectId, require, ref: 'edca_parties.identifier' },
    name: { type: String, require },
    address: { type: Schema.Types.ObjectId, require, ref: 'edca_parties.address' },
    contactPoint: { type: Schema.Types.ObjectId, require, ref: 'edca_parties.contactPoint' },
    roles: [
        {
            type: Object, enum: PartyRoles,
        }
    ],
    id: { type: String, require },
});

PartiesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("edca_partie", PartiesSchema);