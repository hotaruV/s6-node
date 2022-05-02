const { response } = require('express');
const { JWTgenerate } = require('../helpers/jwt');
const Hospital = require('../models/hospital');
const moment = require('moment');
let fecha = moment().format('YYYY-MM-DD HH:mm:ss');


const HospitalController = {
    getHospital: async(req, res = response) => {
        const hospital = await Hospital.find({}, '_updated_at _created_at nombre usuario ').populate('usuario', 'nombre img')

        res.status('200').json({
            ok: true,
            Hospital: hospital
        })
    },
    createHospital: async(req, res = response) => {
        const uid = req.uid
        const hospital = new Hospital({ usuario: uid, ...req.body });
        //console.log(hospital.usuario);

        try {
            const hospitalDB = hospital.save()
            res.status('200').json({
                ok: true,
                hospital: hospital
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }


    },
    updateHospital: async(req, res = response) => {
        const id = req.params.id;
        const uid = req.uid

        try {
            const hospitalDB = await Hospital.findById(id);
            if (!hospitalDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "El Hospital No existe"
                })
            }
            const cambiosHospital = {
                ...req.body,
                usuario: uid,
                _updated_at: fecha
            }
            const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })
            res.status('200').json({
                ok: true,
                hospital: hospitalActualizado
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }
    },
    deleteHospital: async(req, res = response) => {
        const id = req.params.id;


        try {
            const hospitalDB = await Hospital.findById(id);
            if (!hospitalDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "El Hospital No existe"
                })
            }

            await Hospital.findByIdAndDelete(id)
            res.status('200').json({
                ok: true,
                msg: "Hospital Eliminado con Exito"
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error Inesperado-... revisar logs"
            })
        }
    }

}

module.exports = HospitalController;