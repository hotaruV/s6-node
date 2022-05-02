const { Schema, Model, model } = require('mongoose');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const MedicosSchema = Schema({
    nombre: { type: String, required: true },
    img: { type: String },
    usuario: { required: true, type: Schema.Types.ObjectId, ref: 'Usuario' },
    hospital: { required: true, type: Schema.Types.ObjectId, ref: 'Hospital' },
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
})

MedicosSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.mid = _id
    return object
})
module.exports = model('Medico', MedicosSchema)