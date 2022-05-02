const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const validator = require('mongoose-unique-validator');

let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

let BusquedaSchema = Schema({
    sexo: { type: String, required: [true, 'Indique su sexo'] },
    edad: { type: String, required: [true, 'El campo edad es requerido'] },
    molestia: { type: String, required: [true, 'El campo molestia es requerido'] },
    email: { type: String, required: [true, 'El email es requerido'] },
    tmolestia:{ type: String, required: [true, 'El campo tipo de molesta es requerido'] },
    celular: { type: String, required: [true, 'El campo celular es requerido'] },
    tservicio: { type: String, required: [true, 'Indique el tiepo de servicio requerido'] },
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
});

BusquedaSchema.plugin(paginate);
BusquedaSchema.plugin(validator, { message: '{PATH} ya se encuentra registrado en el sistema' })
module.exports = mongoose.model('BuscaDoc', BusquedaSchema);


 

