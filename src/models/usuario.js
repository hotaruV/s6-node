const { Schema, Model, model } = require('mongoose');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const RolesValidos = {
    values: ['superadministrador','seseaadmin','funcionario','ciudadano'],
    message: '{VALUE} No es un Rol Permitido'
}

const UsuarioSchema = Schema({
    nombres: { type: String, required },
    primer_apellido: { type: String, required },
    segundo_apellido: { type: String },
    curp: { type: String },
    rfc: { type: String, required },
    rfc_homoclave: { type: String },
    ente_publico: { type: String },
    email:  { type: String, required, unique: true },
    password: { type: String },
    role: { type: String, require: true, default: 'funcionario', enum: RolesValidos },
    fist_login: { type: Boolean, default: true },
    id_ente_publico: { type: Boolean, default: true },
    created_at: { type: String,  default: fecha },
    updated_at: { type: String,  default: null },
});
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id
    return object
})

module.exports = model('edca_users', UsuarioSchema)