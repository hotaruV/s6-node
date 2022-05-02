const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const validator = require('mongoose-unique-validator');

let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

let AgendaSchema = Schema({
    nombre: { type: String, required: [true, 'Indique su sexo'] },
    profesion: { type: String, required: [true, 'Todos los campos son requeridos'] },
    cedula: { type: String, required: [true, 'Todos los campos son requeridos'] },
    puesto: { type: String, required: [true, 'Todos los campos son requeridos'] },
    especialidad: { type: String, required: [true, 'Todos los campos son requeridos'] },
    domicilio: { type: String, required: [true, 'Todos los campos son requeridos'] },
    email: { type: String, required: [true, 'Todos los campos son requeridos'] },
    materiales: { type: String, required: [true, 'Todos los campos son requeridos'] },
    telefono: { type: String, required: [true, 'Todos los campos son requeridos'] },
    f_apartado: { type: String, required: [true, 'Todos los campos son requeridos'] },
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
});

AgendaSchema.plugin(paginate);
AgendaSchema.plugin(validator, { message: '{PATH} ya se encuentra registrado en el sistema' })
module.exports = mongoose.model('AgendaFOrm', AgendaSchema);




