const   { validationResult, check } = require('express-validator'),
        conexion = require('../database/connection'),
        // {promisify} = require('util'),
        bodyParser = require('body-parser');


// Datos


const signupController = {}

signupController.view = (req, res) => {
    conexion.query('select * from usuario', (err, empleados) => {
        if (err) {
            res.json(err)
        }
        res.render('signup', { data: empleados })
    })
}

signupController.save = (req, res) => {
    const idUsuario = 0;
    const nombres = req.body.name,
            apellidoPaterno = req.body.apPaterno,
            apellidoMaterno = req.body.apMaterno
            telefono = req.body.cel, 
            ciudad = req.body.city,
            colonia = req.body.colony,
            calle = req.body.street,
            codigoPostal = req.body.cp,
            usuario = req.body.user, 
            contrasena = req.body.pssw;
    const fk_rol = 3;

    conexion.query('insert into usuario set ?', { idUsuario, nombres, apellidoPaterno, apellidoMaterno, telefono, ciudad, colonia, calle, codigoPostal, usuario, contrasena, fk_rol }, (err, results) => {
        if (err) {
            // res.json(err)
            throw err;
        } 
        res.redirect('/panelE')
    })
        // console.log(data)
}



module.exports = signupController