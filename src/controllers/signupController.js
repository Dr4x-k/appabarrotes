const   { validationResult, check } = require('express-validator'),
        conexion = require('../database/connection'),
        {promisify} = require('util'),
        bodyParser = require('body-parser'),
        bcrypt = require('bcryptjs'),
        jwt = require('jsonwebtoken');

const signupController = {}

signupController.view = (req, res) => {
    conexion.query('select * from usuario', (err, empleados) => {
        if (err) {
            res.json(err)
        }
        res.render('signup', { alert:false })
    })
}

signupController.save = async (req, res) => {
    
    try {
        // const idUsuario = 0;
        const nombres = req.body.name
        const apellidoPaterno = req.body.apPaterno
        const apellidoMaterno = req.body.apMaterno
        const telefono = req.body.cel
                // ciudad = req.body.city
                // colonia = req.body.colony,
                // calle = req.body.street,
                // codigoPostal = req.body.cp,
        const usuario = req.body.user
        const contrasena = req.body.pssw;
        let pssHash = await bcrypt.hash(contrasena, 8);
        const fk_rol = 3;

        conexion.query('insert into usuario set ?', { nombres, apellidoPaterno, apellidoMaterno, telefono, usuario, contrasena: pssHash, fk_rol }, (err, results) => {
            if (err) {
                // res.json(err)
                // throw err;
                res.render('signup', {
                    alert: true,
                    alertMessage: 'El usuario ya existe'
                })
            } else {
                res.redirect('/panelE')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = signupController