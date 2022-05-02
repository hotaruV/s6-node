const validator = require('validator');
const Topic = require('../Models/topic');
const Categoria = require('../Models/categorias')
const paginate = require('mongoose-paginate-v2');
const  slug  =  require ( 'slug' ) 

let TopicController = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'Probando topic'
        });
    },
    save: (req, res) => {
        // recoger parametros por post
        const params = req.body;
        //validar los datos
        try {
            let vali_title = !validator.isEmpty(params.titulo);
            let vali_content = !validator.isEmpty(params.contenido);
            let vali_lang = !validator.isEmpty(params.tema);

            if (vali_title && vali_content && vali_lang) {
                //crear objeto a guardar, asignar valores
                let topic = new Topic;
                topic.user = req.user.sub;
                topic.categoria_id = params.categoria_id
                topic.title = params.titulo;
                topic.content = params.contenido;
                topic.slug = slug(params.titulo)
                topic.theme = params.tema;
                //guardar el topic
                topic.save((err, topicStore) => {
                    if (err || !topicStore) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se pudo guardar informacion en la base de datos',
                            err
                        });
                    }
                    //devolver una respuesta
                    return res.status(200).send({
                        status: 'success',
                        topic: topicStore
                    });

                })

            } else {
                return res.status(200).send({
                    message: 'Los campos no deben de estar vacios',
                    err
                });
            }

        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar',
            });
        }
    },
    getTopics: (req, res) => {
        //cargar libreria de paginacion()
        let page;
        //recoger la pagina actual
        if (!req.params.page || req.params.page == null || req.params.page == 0 || req.params.page == '0' || req.params.page == undefined) {
            page = 1;
        } else {
            page = parseInt(req.params.page)
        }
        //indicar las opciones de paginacion
        options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 5,
            page
        }
        //hacer find paginado
        Topic.paginate({}, options, (err, topics) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error al obtener la paginación',
                });
            }
            return res.status(200).send({
                status: "success",
                topics: topics.docs,
                Total: topics.totalDocs,
                totalPages: topics.totalPages
            });
        })
        //devolver resultado (topics , total de documentos, total de paginas)
    },
    getTopicByUser: (req, res) => {
        // conseguir el id del usuario
        let userID = req.params.user
        //find con la condicion de usuario
        Topic.find({ user: userID }).sort([['_created_at', 'descending']]).exec((err, topics) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la peticion',
                });
            }
            if (!topics) {
                return res.status(500).send({
                    message: 'No hay topics que mostrar',
                });
            }
            //devolver resultado
            return res.status(200).send({
                status: "Success",
                topics
            })
        })
    },
    getTopicByCategorie: (req, res) => {
        // conseguir el id del usuario
        let categoriaID = req.params.categoria
        //find con la condicion de usuario
        Topic.find({ categoria_id: categoriaID }).populate(['user', 'categoria_id']).sort([['_created_at', 'descending']]).exec((err, topics) => {
            if (err) {
                return res.status(500).send({
                    message: 'Error en la peticion',
                });
            }
            if (!topics) {
                return res.status(500).send({
                    message: 'No hay topics que mostrar',
                });
            }
            //devolver resultado
            return res.status(200).send({
                status: "Success",
                topics
            })
        })
    },
    getOneTopic: (req, res) => {
        //sacar el id del topic de la url
        let topicID = req.params.id
        //find por id del topic
        Topic.findById(topicID).populate(['user', 'categoria_id']).exec((err, topic) => {
            if (err) {
                return res.status(500).send({
                    message: 'No hay topics que mostrar',
                });
            }
            return res.status(200).send({
                status: "Success",
                topic
            });
        })
        //devolver el resultado


    },
    update: async (req, res) => {
        // recoger el id del topic
        let topicID = req.params.id;
        // recoger los datos que llegan de post
        let params = req.body;
        // validar datos
        try {
            let vali_title = !validator.isEmpty(params.titulo);
            let vali_content = !validator.isEmpty(params.contenido);
            let vali_lang = !validator.isEmpty(params.tema);

            let update = {
                title: params.titulo,
                content: params.contenido,
                slug: slug(params.titulo),
                theme: params.tema
            }
            if (vali_title && vali_content && vali_lang) {
                await Topic.findOneAndUpdate({ _id: topicID, user: req.user.sub }, update, { new: true }, (err, topicUpdate) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error en la peticion',
                        });
                    }
                    if (!topicUpdate) {
                        return res.status(404).json({
                            message: 'No se ha actualizado el tema',
                        });
                    }
                    return res.status(200).json({
                        status: "success",
                        topicUpdate
                    })
                })

            }

        } catch (error) {
            return res.status(200).send({
                message: "Faltan datos por enviar"
            })
        }


        // montar un json con datos modificables
        // findandupdate del topic con su id y por id de usuario


    },
    delete: async (req, res) => {
        // recoger el id del topic
        let topicID = req.params.id;
        await Topic.findOneAndDelete({ _id: topicID, user: req.user.sub }, (err, topicBorrado) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error en la peticion',
                });
            }
            if (!topicBorrado) {
                return res.status(500).json({
                    message: 'El Topic No Existe',
                });
            }
            return res.status(200).json({
                status: "success",
                topic: topicBorrado
            })

        })

    },
    search: (req, res) => {

        // sacar string a buscar
        let searchString = req.params.search;
        //find con un operador or
        Topic.find({
            '$or': [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } },
                { "theme": { "$regex": searchString, "$options": "i" } },
                { "slug": { "$regex": searchString, "$options": "i" } }

            ]
        })
        .sort([['date', 'descending']])
        .exec((err, topics) => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: 'Error en la peticion',
                    err
                });
            }
            if (err) {
                return res.status(404).json({
                    status: "error",
                    message: 'No hay temas disponibles',
                });
            }
            return res.status(200).json({
                status: "success",
                topics
            })

        })
        //devolver el resultado

    },
    uploadImagesTopic: (req, res) => {

        //configurar el modulo para habilitar la subida de ficheros routers/usersRoutes.js

        //recoger el fichero de la peticion
        let file_name = "Foto no actualizada";
        var formatos = ["jpg", "png", "PNG", "jpge", "jpe", "JPG", "gif"];

        if (!req.files) {
            return res.status(404).send({
                status: 'Error',
                message: 'Error a actualizar post',
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
}
module.exports = TopicController