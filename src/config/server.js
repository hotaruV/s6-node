const express = require('express');
const app = express();
const cors = require('cors')
const { dbConect } = require('../config/database')


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("Escuchando puerto", app.get('port'));
    dbConect()
})
app.use(express.json())
app.use(cors())

//directorio publico
app.use(express.static('./src/public'));

//archivos de rutas
app.use('/api/users', require('../routes/usuarios.routes'));
app.use('/api/login', require('../routes/login.routes'));
app.use('/api/hospitales', require('../routes/hospitales.routes'));
app.use('/api/medicos', require('../routes/medico.routes'));
app.use('/api/todo', require('../routes/busquedas.routes'));
app.use('/api/upload', require('../routes/uploadsFiles.routes'));
module.exports = app