const { response } = require('express');
const { JWTgenerate } = require('../helpers/jwt')
const Medico = require('../models/medicos');
const moment = require('moment');
const Hospital = require('../models/hospital');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');


const MedicoController = {
    getMedico: async(req, res = response) => {
        const medico = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img')

        res.status('200').json({
            ok: true,
            medico
        })
    },
    createMedico: async(req, res = response) => {
        const uid = req.uid
        const medico = new Medico({ usuario: uid, ...req.body });
        //console.log(hospital.usuario);

        try {
            const medicoDB = await medico.save()
            res.status('200').json({
                ok: true,
                medico: medicoDB
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }
    },
    updateMedico: async(req, res = response) => {
        //console.log(req.body);
        const id = req.params.id;
        const hid = req.body.hospital;
        const uid = req.uid
            //console.log(uid);
        try {
            const medicoDB = await Medico.findById(id);
            if (!medicoDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "El Medico No existe"
                })
            }

            const cambiosMedico = {
                ...req.body,
                usuario: uid,
                hospital: hid,
                _updated_at: fecha
            }
            const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })
            res.status('200').json({
                ok: true,
                medico: medicoActualizado
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }
    },
    deleteMedico: async(req, res = response) => {
        const id = req.params.id;
        try {
            const MedicoDB = await Medico.findById(id);
            if (!MedicoDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Medico No existe"
                })
            }

            await Medico.findByIdAndDelete(id)
            res.status('200').json({
                ok: true,
                msg: "Medico Eliminado con Exito"
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }
    }
}

module.exports = MedicoController;