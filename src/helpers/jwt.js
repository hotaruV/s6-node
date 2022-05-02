const jwt = require('jsonwebtoken');

const JWTgenerate = (uid) => {
    return new Promise((resolve, reject) => {
        let payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se generó JWT')
            } else {
                resolve(token);
            }

        })
    })
}

module.exports = {JWTgenerate}