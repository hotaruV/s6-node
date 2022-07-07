import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const ReleaseTag = {
    values: ['planning','planningUpdate','tender','tenderAmendment','tenderUpdate','tenderCancellation',
            'award','awardUpdate','awardCancellation','contract','contractUpdate','contractAmendment',
            'implementation','implementationUpdate','contractTermination','compiled'],
    message: '{VALUE} No es un Rol Permitido'
}

const EnmiendaSchema = new Schema({
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
    parties: [{ type: Schema.Types.ObjectId, require, ref: 'partie' }],
    buyer: { type: Schema.Types.ObjectId, require, ref: 'buyer' },
    awards: [{ type: Schema.Types.ObjectId, require, ref: 'awards' }],
    contracts: [{ type: Schema.Types.ObjectId, require, ref: 'contractEn' }],
});

EnmiendaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("relase.enmienda", EnmiendaSchema);