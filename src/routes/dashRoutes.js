const { isAuth } = require('../controllers/loginController')

const express = require('express'),
        // const { router } = require('../app.js')
        // app = require('../app'),
        loginController = require('../controllers/loginController'),
        signupController = require('../controllers/signupController'),
        panelController = require('../controllers/panelController'),
        conexion = require('../database/connection')

// ruta controladores
routes = express.Router()

/* routes.get('/', loginController.isAuth, (req, res) => {
    res.render('index')
})
 */
// routes.get('/login', loginController.list)
routes.get('/login', (req, res) => {
    res.render('login', { alert:false })
})
routes.post('/login', loginController.login)
routes.get('/logout', loginController.logout)

routes.get('/home', panelController.panelHome)
routes.get('/panelE', panelController.panelEmp, (req, res) => {
    res.render('panelEmpleados',{Nombre: row.nombres, titleWeb: 'Control'})
})
routes.get('/data', panelController.panerEmpData)
routes.get('/panelCreate', panelController.panelCreate)
routes.post('/save', panelController.createNewEmpleado)
routes.get('/update/:idUsuario', panelController.edit)
routes.get('/delete/:idUsuario', panelController.deleteEmpleados)
routes.post('/update', panelController.updateEmpleados, (req, res) => {
    res.render('panelEmpleados');
})

routes.get('/signup', (req, res) => {
    res.render('signup', { alert:false })
})
routes.get('/signup', signupController.view)
routes.post('/signup', signupController.save)

module.exports = routes
