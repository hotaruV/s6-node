const { response } = require("express");
const Usuario = require("../models/usuario");


const isAdminRole  = async (req, res = response, next) => {
    //console.log(req.uid);
    const usuariodb = await Usuario.findById(req.uid);
    //console.log(usuariodb);
    if(!usuariodb){
        return res.status(400).json({
            msg: "el usuario no tiene rol correcto"
        })
    }
    const {role, email} = usuariodb;
    if(role !== "admin_sea"){
        return res.status(401).json({
            msg: `el usuario no es administrador`
        })
    }
    next()
}

module.exports = {
    isAdminRole
}