'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


// Ejecutar express
const app = express();
app.use(morgan('dev'));

//Cargar Archivos De Rutas
const cliente_routes = require('./routers/userRoutes')
const Topic_routes = require('./routers/topicRoutes');
const comentario_routers = require('./routers/comentariosRoutes');
const categorias_routers = require('./routers/categoriasRoutes');
const mailer_routers = require('./routers/mailerRooutes')

//middleWares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
//Cors

//Rescribir Rutas
app.use('/api', [Topic_routes, cliente_routes, comentario_routers, categorias_routers, mailer_routers]);
//Exportar modulos
module.exports = app;




