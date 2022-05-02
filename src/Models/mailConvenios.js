const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const validator = require('mongoose-unique-validator');

let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

let convenioSchema = Schema({
    nombre_empresa: { type: String, required: [true, 'Todos los campos son requeridos'] },
    nombre_solicitante: { type: String, required: [true, 'Todos los campos son requeridos'] },
    no_trabajadores: { type: String, required: [true, 'Todos los campos son requeridos'] },
    email: { type: String, required: [true, 'Todos los campos son requeridos'] },
    telefono: { type: String, required: [true, 'Todos los campos son requeridos'] },
    activo: { type: String, require: [true], default: '0' },
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
});

convenioSchema.plugin(paginate);
convenioSchema.plugin(validator, { message: '{PATH} ya se encuentra registrado en el sistema' })
module.exports = mongoose.model('Convenios', convenioSchema);




