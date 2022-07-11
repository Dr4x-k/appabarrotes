const express = require('express'),
        // const { router } = require('../app.js')
        // app = require('../app'),
        loginController = require('../controllers/loginController'),
        signupController = require('../controllers/signupController'),
        panelController = require('../controllers/panelController'),
// const { routes } = require('../app')
        conexion = require('../database/connection'),

// ruta controladores
// import controller from '../controllers/controller.js'

routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/login', loginController.list)
// routes.post('/login', loginController.login)

routes.get('/home', panelController.panelHome)
routes.get('/panelE', panelController.panelEmp)
routes.get('/data', panelController.panerEmpData)
routes.get('/update/:idUsuario', panelController.edit)
routes.get('/delete/:idUsuario', panelController.deleteEmpleados)
routes.post('/update', panelController.updateEmpleados)

routes.get('/signup', signupController.view)
routes.post('/save', signupController.save)


/* routes.get('/panelE', (req, res) => {
    conexion.query('select idUsuario, nombres, apellidoPaterno, apellidoMaterno, usuario from usuario', (err, results) => {
        if (err) {
            res.json(err)
        } else {
            res.render('controlPanel/controlPanelEmpleados', { data:results })
            console.log(results)
        }
    })
})

routes.get('/data', (req, res) => {
    conexion.query('select idUsuario, nombres, apellidoPaterno, apellidoMaterno, usuario from usuario', (err, results) => {
        if (err) {
            res.json(err)
        } else {
            data = JSON.stringify(results)
            res.send
        }
    })
}) */

module.exports = routes