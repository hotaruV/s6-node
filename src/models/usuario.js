const { Schema, Model, model } = require('mongoose');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const RolesValidos = {
    values: ['superadministrador','admin_sea','funcionario','ciudadano'],
    message: '{VALUE} No es un Rol Permitido'
}

const UsuarioSchema = Schema({
    nombres: { type: String, required: true },
    primer_apellido: { type: String, required: true },
    segundo_apellido: { type: String, required: false },
    curp: { type: String, required: false },
    rfc: { type: String, required: true },
    rfc_homoclave: { type: String, required: false },
    ente_publico: { type: String, required: false },
    email:  { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, require: true, default: 'funcionario', enum: RolesValidos },
    fist_login: { type: Boolean, default: true },
    id_ente_publico: { type: Boolean, default: true },
    created_at: { type: String, require: true, default: fecha },
    updated_at: { type: String, require: true, default: null },
});
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id
    return object
})

module.exports = model('edca_users', UsuarioSchema)