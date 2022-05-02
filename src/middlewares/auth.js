const jwt = require('jwt-simple');
const moment = require('moment');
var secret_key = 'n1kt3H4yd33#'

exports.auth = function(req, res, next) {
    //Comprobar si llega la autorización
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'la peticion no tiene la cabezera de autorizacion'
        })
    }
    //limpiar el token y limpiar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        //decodificar el token
        var payload = jwt.decode(token, secret_key);

        //comprobar si el token ha espirado
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'El token no ha expirado'
            });
        }
    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es valido'
        });
    }
    //adjuntar usuario identificado a la request
    req.user = payload
        //pasar a la accion
    next();
};