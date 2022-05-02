const vali = require("validator");
const Usuario = require("../Models/client");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwtService");
const fs = require('fs');
const path = require('path');

const Controller = {
    probando: function (req, res) {
        return res.status(200).send({
            message: "Soy El metodo Probando"
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: "Soy El metodo Testeando"
        });
    },
    saveC: function (req, res) {
        //recoger los parametros de la peticion
        const params = req.body;

        //validar datos
        //expresion regular para contraseña con mays y minus 
        //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z@#$%&\d]{8,}$"
        try {
            var validate_nombre = !vali.isEmpty(params.nombre);
            var validate_apellido_pa = !vali.isEmpty(params.apellido_pa);
            //var validate_apellido_ma = !vali.isEmpty(params.apellido_ma);
            var validate_email = !vali.isEmpty(params.email) && vali.isEmail(params.email);
            var validate_password = !vali.isEmpty(params.password);
        } catch (Error) {
            return res.status(400).send({
                status: "Error",
                message: "faltan datos por enviar"
            });
        }
        if (
            validate_nombre &&
            validate_apellido_pa &&
            //validate_apellido_ma &&
            validate_email &&
            validate_password
        ) {
            //crear objeto de usuario
            const usuario = new Usuario();

            //asignar valores al objeto usuario
            usuario.nombre = params.nombre;
            usuario.apellido_pa = params.apellido_pa;
            usuario.apellido_ma = params.apellido_ma;
            usuario.email = params.email.toLowerCase();
            usuario.imgUser = null;
            usuario.imgLogo = null;
            //cliente.password = params.password;

            //comprobar si el usuario existe
            Usuario.findOne({ email: usuario.email }, (err, issetClient) => {
                if (err) {
                    return res.status(400).send({
                        status: "Error",
                        message: "Error al comprobar duplicidad de usuario"
                    });
                }
                if (!issetClient) {
                    //si no existe cifrar la contraseña guardarla
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        usuario.password = hash;
                        usuario.save((err, clienteGuard) => {
                            if (err) {
                                return res.status(400).send({
                                    status: "Error",
                                    message: "Error al Guardar El usuario"
                                });
                            }
                            if (!clienteGuard) {
                                return res.status(400).send({
                                    status: "Error",
                                    message: "Error! El usuario no se ha guardado"
                                });
                            } else {
                                res.status(200).send({
                                    status: "Success",
                                    cliente: clienteGuard
                                });
                            }
                        });
                    });

                    //devolver respuesta
                } else {
                    return res.status(200).send({
                        status: "Error",
                        message: "El email utilizado ya existe en el sistema"
                    });
                }
            });
        } else {
            return res.status(200).send({
                status: "Error",
                message: "Porfavor  Ingrese datos Correctos"
            });
        }
    },
    login: function (req, res) {
        //recoger los parametros de la peticion
        const params = req.body;
        //validar los datos
        try {
            var validate_email = !vali.isEmpty(params.email) && vali.isEmail(params.email);
            var validate_password = !vali.isEmpty(params.password);
        } catch (Error) {
            return res.status(200).send({
                status: "Error",
                message: "faltan datos por enviar"
            });
        }


        if (!validate_email || !validate_password) {
            return res.status(200).send({
                status: "Error",
                message: "Los Datos Son Incorrectos"
            });
        }

        //Buscar usuarios que coincidan con el email
        Usuario.findOne({ email: params.email.toLowerCase() }, (err, user) => {
            //si existe comprobar la coincidencia del email y la contraseña
            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al instentar identificarse"
                });
            }
            if (!user) {
                return res.status(200).send({
                    status: "Error",
                    message: "Nombre de usuario o contraseña incorrectos"
                });
            }
            bcrypt.compare(params.password, user.password, (err, check) => {
                //si es correcto
                if (check) {
                    //Generar el token de jwt y devolverlo
                    if (params.getToken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }
                    // limpiar el objeto antes de devolverlo
                    user.password = undefined;
                    user.__v = undefined;
                    //devolver los datos
                    return res.status(200).send({
                        status: "Success",
                        user
                    });
                } else {
                    return res.status(200).send({
                        status: "Error",
                        message: "Nombre de usuario o contraseña incorrectos"
                    });
                }
            });
        });
    },
    update: (req, res) => {
        //crear un middleware para comprobar el jwt, y ponerlo a la ruta
        //recoger los datos del usuario
        var params = req.body;
        //validar datos del usuario
        try {
            var validate_nombre = !vali.isEmpty(params.nombre);
            var validate_apellido_pa = !vali.isEmpty(params.apellido_pa);
            var validate_apellido_ma = !vali.isEmpty(params.apellido_ma);
            var validate_email = !vali.isEmpty(params.email) && vali.isEmail(params.email);
        } catch (erro) {
            return res.status(200).send({
                message: "faltan datos por enviar"
            });
        }
        //eliminar propiedades inecesarias
        delete params.password;
        var userID = req.user.sub;

        //comprobar si el email es unico
        if (req.user.email != params.email) {
            Usuario.findOne({ email: params.email.toLowerCase() }, (err, user) => {
                //si existe comprobar la coincidencia del email y la contraseña
                if (err) {
                    return res.status(500).send({
                        status: "Error",
                        message: "Error al instentar identificarse"
                    });
                }
                if (user && user.email == params.email) {
                    return res.status(404).send({
                        status: "Error",
                        message: "El email seleccionado ya existe en la base de datos"
                    });
                }
            });
        } else {
            //buscar y actualizar documento de la base de datos
            Usuario.findOneAndUpdate({ _id: userID }, params, { new: true }, (err, UserUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error a Actualizar usuario',
                    });
                }
                if (!UserUpdated) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error a Actualizar usuario',
                    });
                }
                return res.status(200).send({
                    status: 'Success',
                    cliente: UserUpdated
                });
            })
            //devolver una respuesta
        }
    },
    uploadPefil: (req, res) => {

        //configurar el modulo para habilitar la subida de ficheros routers/usersRoutes.js

        //recoger el fichero de la peticion
        let file_name = "Foto no actualizada";
        var formatos = ["jpg", "png", "PNG", "jpge", "jpe", "JPG", "gif"];

        if (!req.files) {
            return res.status(404).send({
                status: 'Error',
                message: 'Error a Actualizar usuario',
            });
        }
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //Nombre del archivo
        file_name = file_split[3]
        //nombre del archivo
        var ext_split = file_name.split('.')
        //conseguir el nombre y la extension del archivo subido


        var file_ext = ext_split[1];
        if (file_ext != 'jpg' && file_ext != 'png' && file_ext != 'jpge' && file_ext != 'jpe' && file_ext != 'JPG' && file_ext != 'gif') {
            //comprobar extension solo imagenes, si no es valido borrar fichero subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'Error',
                    message: "Extension del archivo invalido",
                })
            })
        } else {
            //sacar el id del usuario identificado
            var userID = req.user.sub;
            //buscar y actualizar documento
            Usuario.findOneAndUpdate({ _id: userID }, { imgUser: file_name }, { new: true }, (err, UserUpdated) => {
                if (err || !UserUpdated) {
                    fs.unlink(file_path, (err) => {
                        return res.status(500).send({
                            status: 'Error',
                            message: "Error al guardar el archivo",
                        })
                    })
                }
                return res.status(200).send({
                    status: 'Success',
                    usuario: UserUpdated,
                })
            })
            //devolver respuesta
        }
    },
    UserPicFile: (req, res) => {
        var fileName = req.params.perfil;
        var pathFile = "./src/uploads/users/" + fileName;
        console.log(pathFile)

        fs.exists(pathFile, (existe) => {
            if (existe) {
                return res.sendFile(path.resolve(pathFile))
            } else {
                return res.status(404).send({
                    message: "La Imangen no existe"
                })
            }
        })
    },
    getAllUsers: (req, res) => {
        Usuario.find().exec((err, usuarios) => {
            if (err || !usuarios) {
                return res.status(404).send({
                    status: 'Error',
                    message: "No hay usuarios que mostrar",
                })
            }
            return res.status(200).send({
                status: 'Success',
                usuarios,
            })
        })
    },
    getOneUsers: (req, res) => {
        var userID = req.params.id

        Usuario.findById(userID).exec((err, usuario) =>{
            if (err || !usuario) {
                return res.status(404).send({
                    status: 'Error',
                    message: "no existe el usuario",
                })
            }
            return res.status(200).send({
                status: 'Success',
                usuario,
            })
        })
    }
};

module.exports = Controller;