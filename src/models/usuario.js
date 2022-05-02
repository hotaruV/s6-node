const { Schema, Model, model } = require('mongoose');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const RolesValidos = {
    values: ['SUPER_ADMIN', 'ADMIN_GENERAL', 'ADMIN_HOSPITAL', 'MEDICO_ROL', 'VENDEDOR_ROL', 'ASISTENTE_ROL'],
    message: '{VALUE} No es un Rol Permitido'
}
const GeneroValido = {
    values: ['Masculino', 'Femenino'],
    message: '{VALUE} no es un genero Valido'
}


const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    rol: { type: String, require: true, default: 'MEDICO_ROL', enum: RolesValidos },
    google: { type: Boolean, default: false },
    genero: { type: String, require: false, enum: GeneroValido },
    activo: { type: Number, require: true, default: 1 },
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
});
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id
    return object
})

module.exports = model('Usuario', UsuarioSchema)