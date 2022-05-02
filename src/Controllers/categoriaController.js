const validator = require('validator');
const Categorias = require('../Models/categorias');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss')



let CategoriasController = {
    test: (req, res) => {
        return res.status(200).send({
            message: 'Probando categoria'
        });
    },
    save: (req, res) => {
        const params = req.body;
        try {
            let valiNombre = !validator.isEmpty(params.nombre);
            if (valiNombre) {
                //crear objeto a guardar, asignar valores
                let categoria = new Categorias;
                categoria.nombre = params.nombre;
                categoria.descripcion = params.descripcion
                    //guardar el topic
                categoria.save((err, categoriaStore) => {
                    if (err || !categoriaStore) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se pudo guardar informacion en la base de datos',
                            err
                        });
                    }
                    //devolver una respuesta
                    return res.status(200).send({
                        status: 'success',
                        categorias: categoriaStore
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
    getCategories: (req, res) => {
        let page;
        if (!req.params.page || req.params.page == null || req.params.page == 0 || req.params.page == '0' || req.params.page == undefined) {
            page = 1;
        } else {
            page = parseInt(req.params.page)
        }
        //indicar las opciones de paginacion
        options = {
            sort: { date: -1 },
            limit: 5,
            page
        }
        Categorias.paginate({}, options, (err, categorias) => {
            if (err) {
                return res.status(200).send({
                    message: 'Error al obtener la paginación',
                });
            }
            return res.status(200).send({
                status: "success",
                categorias: categorias.docs,
                Total: categorias.totalDocs,
                totalPages: categorias.totalPages
            });
        })
    },
    getOnceCategorie: (req, res) => {
        //sacar el id del topic de la url
        let Categorie_id = req.params.id
            //find por id del topic
        Categorias.findById(Categorie_id).exec((err, categorias) => {
                if (err) {
                    return res.status(200).send({
                        message: 'No hay categorias que mostrar',
                    });
                }
                return res.status(200).send({
                    status: "Success",
                    categorias
                });
            })
            //devolver el resultado


    },
    update: async(req, res) => {
        // recoger el id del topic
        let categoriaID = req.params.id;
        // recoger los datos que llegan de post
        let params = req.body;
        // validar datos
        try {
            let valiNombre = !validator.isEmpty(params.nombre);


            let update = {
                nombre: params.nombre,
                descripcion: params.descripcion,
                _updated_at: fecha
            }
            if (valiNombre) {
                await Categorias.findOneAndUpdate({ _id: categoriaID }, update, { new: true }, (err, categorieUpdate) => {
                    if (err) {
                        return res.status(200).json({
                            message: 'Error en la peticion',
                        });
                    }
                    if (!categorieUpdate) {
                        return res.status(404).json({
                            message: 'No se ha actualizado la Categoria',
                        });
                    }
                    return res.status(200).json({
                        status: "success",
                        categorieUpdate
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
    delete: async(req, res) => {
        // recoger el id del topic
        let categoriaID = req.params.id;
        await Categorias.findOneAndDelete({ _id: categoriaID }, (err, CategoriaBorrada) => {
            if (err) {
                return res.status(200).json({
                    message: 'Error en la peticion',
                });
            }
            if (!CategoriaBorrada) {
                return res.status(200).json({
                    message: 'La Categoria No Existe',
                });
            }
            return res.status(200).json({
                status: "success",
                topic: CategoriaBorrada
            })

        })

    },
}

module.exports = CategoriasController