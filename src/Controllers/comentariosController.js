const validator = require('validator');
const Topic = require('../Models/topic');

const Controller = {
    add: async (req, res) => {
        // recoger el topic de la url 
        let topicID = req.params.topicId;
        const params = req.body;
        // find por id  del topic
        await Topic.findById(topicID).exec((err, topic) => {
            if (err) {
                return res.status(200).json({
                    status: "error",
                    message: "El Topic no existe"
                });
            }
            if (!topic) {
                return res.status(200).json({
                    status: "error",
                    message: "Error en la peticion"
                });
            }
            // comprobar objeto usuario y validar datos
            if (params.contenido !== undefined) {
                try {
                    let vali_content = !validator.isEmpty(params.contenido);

                    if (vali_content) {
                        let coment = {
                            user: req.user.sub,
                            content: req.body.contenido,
                        }

                        // en la propiedad coments del objeto resultante hacer push 
                        topic.coments.push(coment)
                        // guardar el topic completo 
                        topic.save((err) => {
                            if (err) {
                                return res.status(200).send({
                                    message: 'Error en la peticion del topic',
                                });
                            }
                            // devolver respuesta
                            return res.status(200).json({
                                status: "Success",
                                topic
                            });
                        })


                    } else {
                        return res.status(200).send({
                            status: 'error',
                            message: 'Faltan datos por enviar',
                        });
                    }
                } catch (error) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error en la peticion del catch',
                    });
                }
            } else {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error en la peticion del if de validacion de campo',
                });
            }

        })
    },
    update: async (req, res) => {
        //conseguir el comentario por url
        let comentarioId = req.params.comentarioId
        //recoger datos y validar
        var params = req.body
        try {
            let vali_content = !validator.isEmpty(params.contenido);
            if (vali_content) {
                // find and update de subdocumento 
                await Topic.findOneAndUpdate(
                    { "coments._id": comentarioId },
                    {
                        "$set": {
                            "coments.$.content": params.contenido
                        }
                    },
                    { new: true },
                    (err, topicActual) => {
                        if (err) {
                            return res.status(200).send({
                                message: 'Error en la peticion del topic',
                            });
                        };
                        return res.status(200).json({
                            status: "Success",
                            topicActual
                        });
                    }
                )
            }
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'Error en la peticion del catch',
            });
        }


    },
    delete: (req, res) => {
        //sacar el id del topic y el comentario
        let topicID = req.params.topicId
        let comentarioID = req.params.comentarioId
        //buscar el topic
        Topic.findById(topicID, (err, topic) => {
            if (err) {
                return res.status(200).json({
                    status: "error",
                    message: "El Topic no existe"
                });
            }
            if (!topic) {
                return res.status(200).json({
                    status: "error",
                    message: "Error en la peticion"
                });
            }
            //seleccionar el comentario
            let comentario = topic.coments.id(comentarioID);
            if (comentario) {
                //borrar el comentario
                comentario.remove();
                //guardar el topic
                topic.save((err) => {
                    if (err) {
                        return res.status(200).json({
                            status: "error",
                            message: "No Existe el Comentario"
                        });
                    }
                    //devolver resultado
                    return res.status(200).json({
                        status: 'success',
                        topic
                    });
                })
            } else {
                return res.status(200).json({
                    status: "error",
                    message: "No Existe el Comentario"
                });
            }
        })

    }
};
module.exports = Controller;