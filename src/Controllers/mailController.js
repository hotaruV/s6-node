const transporter = require('../services/mailerService')
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');
const buscador = require('../Models/mailBuscadoc');
const agenda = require('../Models/mailAgenda');
const convenios = require('../Models/mailConvenios');
let MailerController = {

    findDoctor: async(req, res) => {
        const params = req.body;
        try {
            let Buscadoc = new buscador(params);
            let sexo = params.sexo;
            let edad = params.edad;
            let molestia = params.molestia;
            let tmolestia = params.tmolestia;
            let email = params.email;
            let celular = params.celular;
            let tservicio = params.tservicio;


            let info = {
                from: 'administracion@hospitalolga.com', // sender address
                to: 'administracion@hospitalolga.com', // list of receivers
                subject: "Solicitud de consulta", // Subject line
                html: `
              <p>Datos enviados desde formulario de pagina web donde paciente de sexo <b>${sexo}</b>
              de edad entre <b>${edad}</b> presenta
              <ul>
                <li>Molestias en: <b>${molestia}</b></li>
                <li>Tipo de molestia: <b>${tmolestia}</b></li>
              </ul>
              Solicita servicio de <b>${tservicio}</b>.
              </p>
              <h2>Numero de Celular: </h2>${celular}
              <h2>Correo Electrónico: </h2>${email}   
            `
            };
            Buscadoc.save((err, emailBuscaDoc) => {
                if (err || !emailBuscaDoc) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Se deben llenar todos los campos del formulario',
                        err
                    });
                }
                transporter.sendMail(info, (err, result) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.status(200).json({
                        status: "ok",
                        message: "Email Enviado Con exito",
                        emailBuscaDoc,
                        result
                    });

                })
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs",
            })
        }
    },
    conveniosForm: async(req, res) => {
        const params = req.body;
        try {
            let Covenios = new convenios(params);
            let nombre_empresa = params.nombre_empresa;
            let nombre_solicitante = params.nombre_solicitante;
            let no_trabajadores = params.no_trabajadores;
            let email = params.email;
            let telefono = params.telefono;


            let info = {
                from: 'administracion@hospitalolga.com', // sender address
                to: 'administracion@hospitalolga.com', // list of receivers
                subject: "Solicitud de Convenio", // Subject line
                html: `
              <p>Datos enviados desde formulario de pagina web de convenios, la empresa <b>${nombre_empresa}</b>
              solicita convenio dejando los siguientes datos:
              <ul>
                <li>Nombre del solicitante: <b>${nombre_solicitante}</b></li>
                <li>No. de Trabajadores: <b>${no_trabajadores}</b></li>
                <li>Teléfono: <b>${telefono}</b></li>
                <li>Email: <b>${email}</b></li>
              </ul>
             
            `
            };
            Covenios.save((err, emailConvenio) => {
                if (err || !emailConvenio) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Se deben llenar todos los campos del formulario',
                        err
                    });
                }
                transporter.sendMail(info, (err, result) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.status(200).json({
                        status: "ok",
                        message: "Email Enviado Con exito",
                        emailConvenio,
                        result
                    });
                })
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs",
            })
        }
    },
    AgendaForm: async(req, res) => {
        const params = req.body;
        try {
            let Agenda = new agenda(params);
            let nombre = params.nombre;
            let profesion = params.profesion;
            let cedula = params.cedula;
            let puesto = params.puesto;
            let especialidad = params.especialidad;
            let domicilio = params.domicilio;
            let email = params.email;
            let materiales = params.materiales;
            let telefono = params.telefono;
            let f_apartado = params.f_apartado;


            let info = ({
                from: 'administracion@hospitalolga.com', // sender address
                to: 'administracion@hospitalolga.com', // list of receivers
                cc: email,
                subject: "Solicitud de Apartado de Sala de Quirófano", // Subject line
                html: `
              <p>Datos enviados desde formulario de pagina web de Agenda, la El medico <b>${nombre}</b>
              solicita apartado del servicios dejando los siguientes datos:
              <ul>
                <li>Profesión: <b>${profesion}</b></li>
                <li>Cedula:<b>${cedula}</b></li>
                <li>Puesto: <b>${puesto}</b></li>
                <li>Especialidad: <b>${especialidad}</b></li>
                <li>Domicilio: <b>${domicilio}</b></li>
                <li>Email: <b>${email}</b></li>
                <li>Materiales necesarios: <b>${materiales}</b></li>
                <li>Télefono: <b>${telefono}</b></li>
                <li>Fecha de apartado: <b>${f_apartado}</b></li>
                <li>Email: <b>${email}</b></li>
              </ul>     
            `
            });

            Agenda.save((err, emailAgenda) => {
                if (err || !emailAgenda) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Se deben llenar todos los campos del formulario',
                        err
                    });
                }
                transporter.sendMail(info, (err, result) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.status(200).json({
                        status: "ok",
                        message: "Email Enviado Con exito",
                        emailAgenda,
                        result
                    });

                })

            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs",
            })
        }
    }

}

module.exports = MailerController;