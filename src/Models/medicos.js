const mongoose = require('mongoose');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss')

const schema = mongoose.Schema;

let MedicoSchema = schema({
    
})

let medicos = mongoose.model('Medicos', MedicoSchema)