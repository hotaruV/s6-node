import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');

const RolesValidos = {
    values: ['seseaadmin','adminstrador_ente'],
    message: '{VALUE} No es un Rol Permitido'
}

const UsuarioSchema = Schema({
    nombres: { type: String, require},
    primer_apellido: { type: String, require},
    segundo_apellido: { type: String },
    curp: { type: String },
    rfc: { type: String, require},
    rfc_homoclave: { type: String },
    ente_publico: { type: String },
    email:  { type: String, require, unique: true },
    password: { type: String },
    role: { type: String, require, default: 'adminstrador_ente', enum: RolesValidos },
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

export default model('admin_users', UsuarioSchema)