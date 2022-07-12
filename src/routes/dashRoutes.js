const express = require('express'),
        // const { router } = require('../app.js')
        // app = require('../app'),
        loginController = require('../controllers/loginController'),
        signupController = require('../controllers/signupController'),
        panelController = require('../controllers/panelController'),
        conexion = require('../database/connection'),

// ruta controladores
routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index')
})

routes.get('/login', loginController.list)
// routes.post('/login', loginController.login)

routes.get('/home', panelController.panelHome)
routes.get('/panelE', panelController.panelEmp)
routes.get('/data', panelController.panerEmpData)
routes.get('/panelCreate', panelController.panelCreate)
routes.post('/save', panelController.createNewEmpleado)
routes.get('/update/:idUsuario', panelController.edit)
routes.get('/delete/:idUsuario', panelController.deleteEmpleados)
routes.post('/update', panelController.updateEmpleados)

routes.get('/signup', signupController.view)
routes.post('/save', signupController.save)

module.exports = routes