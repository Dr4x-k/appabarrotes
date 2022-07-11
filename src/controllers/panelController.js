const conexion = require('../database/connection')

const panelController = {}

panelController.panelHome = (req, res) => {
    res.render('panel/controlPanel')
}

panelController.panelEmp = (req, res) => {
    conexion.query('SELECT * FROM abarrotes.viewusuarios', (err, empleados) => {
        if(err) {
            res.json(err)
        } else {
            res.render('panel/panelEmpleados', { data:empleados })
            // console.log(empleados)
        }
    })
    
}

panelController.panerEmpData = (req, res) => {
    conexion.query('select * from usuario', (err, empleados) => {
        if (err) {
            res.json(err)
        } else {
            data = JSON.stringify(empleados)
            // res.send(data)
        }
    })
}

panelController.createNewCliente = (req, res) => {
    // const idUsuario = 0;
    const nombres = req.body.name,
            apellidoPaterno = req.body.apPaterno,
            apellidoMaterno = req.body.apMaterno
            telefono = req.body.cel, 
            // ciudad = req.body.city,
            // colonia = req.body.colony,
            // calle = req.body.street,
            // codigoPostal = req.body.cp,
            usuario = req.body.user, 
            contrasena = req.body.pssw
            fk_rol = req.body.rol;

    conexion.query('insert into usuario (nombres, apellidoPaterno, apellidoMaterno, telefono, usuario, contrasena) set ?', { nombres, apellidoPaterno, apellidoMaterno, telefono, usuario, contrasena, fk_rol }, (err, empleados) => {
        if (err) {
            // res.json(err)
            throw err;
        } 
        res.redirect('panel/panelEmpleados')
    })
        // console.log(data)
}

panelController.edit = (req, res) => {
    const idUsuario = req.params.idUsuario;

    conexion.query('select * from usuario where idUsuario = ?', {idUsuario}, (err, results) => {
        if (err) {
            throw err;
        } else {
            res.render('panel/panelUpdate', { data:results[0] });
        }
    })
}

panelController.updateEmpleados = (req, res) => {
    const idUsuario = req.body.idUsuario
    const nombres = req.body.name,
            apellidoPaterno = req.body.apPaterno,
            apellidoMaterno = req.body.apMaterno
            telefono = req.body.cel,
            usuario = req.body.user, 
            contrasena = req.body.pssw
            fk_rol = req.body.rol;
    
    conexion.query('update usuario set ? where idUsuario = ?', [ { nombres, apellidoPaterno, apellidoMaterno, telefono, usuario, contrasena }, idUsuario], (err, empleados) => {
        if (err) {
            throw err;
        } else {
            // res.render('panel/panelEmpleados', { data : empleados[0] })
            // console.log(idUsuario)
            res.redirect('/panelE')
        }
    })
}

panelController.deleteEmpleados = (req, res) => {
    const idUsuario = req.params.idUsuario;

    conexion.query('delete from usuario where idUsuario = ?', [idUsuario], (err, results) => {
        if (err) {
            throw(err);
        } else {
            res.redirect('/panelE');
        }
    })
}


module.exports = panelController