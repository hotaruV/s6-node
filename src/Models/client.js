'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const moment = require('moment');

let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

var userSchema = Schema({
    nombre: String,
    apellido_pa: String,
    apellido_ma: String,
    email: String,
    password: String,
    imgUser: String,
    imgLogo: String,
    _created_at: { type: String, require: true, default: fecha },
    _updated_at: { type: String, require: true, default: null },
    
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};



module.exports = mongoose.model('User', userSchema);