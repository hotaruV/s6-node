const { Schema, Model, model } = require("mongoose");
const moment = require("moment");
let fecha = moment().format("YYYY-MM-DD HH:mm:ss");

const ReleaseTag = {
    values: ['planning','planningUpdate','tender','tenderAmendment','tenderUpdate','tenderCancellation',
            'award','awardUpdate','awardCancellation','contract','contractUpdate','contractAmendment',
            'implementation','implementationUpdate','contractTermination','compiled'],
    message: '{VALUE} No es un Rol Permitido'
}

const LicitacionSchema = new Schema({
    ocid: { type: String, require },
    id: { type: String, require },
    date: { type: String, require },
    language: { type: String, require },
    tag: [
        {
            type: Object, enum: ReleaseTag,
        }
    ],
    initiationType: { type: String, require },
    parties: { type: Schema.Types.ObjectId, require, ref: 'partie' },
    buyer: { type: Schema.Types.ObjectId, require, ref: 'buyer' },
    tender: { type: Schema.Types.ObjectId, require, ref: 'tender' },
});

LicitacionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("relase.licitacion", LicitacionSchema);