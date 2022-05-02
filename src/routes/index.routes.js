const { Router } = require('express');


const route = Router();

route.get('/',(req, res) => {
    // console.log(process.env)
    res.json({
        version: 1.0
    });
});

route.post('/crear', (req, res) =>{
    res.json({
        'probando' : "Hola Mundo"
    })
});


module.exports = route;
