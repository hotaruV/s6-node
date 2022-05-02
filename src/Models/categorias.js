const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const moment = require('moment');
const validator = require('mongoose-unique-validator');

let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

let CategoriaSchema = Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es requerido'] },
    descripcion: { type: String, require: false },
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
});

CategoriaSchema.plugin(paginate);
CategoriaSchema.plugin(validator, { message: '{PATH} ya se encuentra registrado en el sistema' })
module.exports = mongoose.model('Categoria', CategoriaSchema);