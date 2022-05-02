const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        nombre: user.nombre,
        apellido_pa: user.apellido_pa,
        apellido_ma: user.apellido_ma,
        rol: user.rol,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payload, 'n1kt3H4yd33#');
}