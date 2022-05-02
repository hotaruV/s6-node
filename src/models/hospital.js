const { Schema, Model, model } = require('mongoose');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');


const HospitalSchema = Schema({
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: { required: true, type: Schema.Types.ObjectId, ref: 'Usuario' },

    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },

}, { collection: 'hospitales' })

HospitalSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.hid = _id
    return object
})
module.exports = model('Hospital', HospitalSchema)