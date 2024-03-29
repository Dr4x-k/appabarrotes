const conexion = require('../database/connection'),
        bcrypt = require('bcryptjs')

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

panelController.panelCreate = (req, res) => {
    res.render('panel/panelCreate')
}

panelController.createNewEmpleado = (req, res) => {
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
            fk_rol = req.body.typeUser;
            // let 
        
            // if (req.body.typeUser == 'Administrador')

    conexion.query('insert into usuario set ?', { nombres, apellidoPaterno, apellidoMaterno, telefono, usuario, contrasena, fk_rol }, (err, empleados) => {
        if (err) {
            // res.json(err)
            throw err;
        } 
        res.redirect('/panelE')
    })
        // console.log(fk_rol)
}

panelController.edit = (req, res) => {
    const idUsuario = req.params.idUsuario;

    conexion.query('select * from usuario where idUsuario = ?', [idUsuario], (err, results) => {
        if (err) {
            throw err;
        } else {
            res.render('panel/panelUpdate', { data : results[0] });
            
            // console.log({data:results})
        }
    })
}

panelController.updateEmpleados = async (req, res) => {
    const idUsuario = req.body.idUsuario
    const nombres = req.body.name,
            apellidoPaterno = req.body.apPaterno,
            apellidoMaterno = req.body.apMaterno
            telefono = req.body.cel,
            usuario = req.body.user, 
            contrasena = req.body.pssw
            fk_rol = req.body.typeUser;
    let pssHash = await bcrypt.hash(contrasena, 8);
    
    conexion.query('update usuario set ? where idUsuario = ?', [ { nombres, apellidoPaterno, apellidoMaterno, telefono, usuario, contrasena : pssHash, fk_rol }, idUsuario], (err, empleados) => {
        if (err) {
            throw err;
        } else {
            // res.render('panel/panelEmpleados', { data : empleados[0] })
            // console.log(idUsuario)
            res.render('panel/update:idUsuario', {
                // position: 'top-end',
                alertIcon: 'success',
                alertTitle: 'El usuario se actualizó correctamente',
                showConfirmButton: false,
                timer: 1500
            })
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

// Meter la cookie para no poder entrar -- pendiente

module.exports = panelController