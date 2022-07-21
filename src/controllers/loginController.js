const conexion = require('../database/connection')
const bodyParser = require('body-parser')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const dotenv = require('dotenv')

const loginController = {}

loginController.list = loginController.isAuth, (req, res) => {
    conexion.query('select * from usuario', (err, result) => {
        if (err) {
            // res.json(err);
        }
        // console.log(result)
        res.render('login', { alert:false })
    })
}

loginController.login = async  (req, res) => {
    try {
        const usuario = req.body.user;
        const contrasena = req.body.pssw;

        if (!usuario || !contrasena) {
            res.render('login', {
                alert:true,
                alertTitle: 'Advertencia',
                alertMessage: 'Escribe tu usuario y contraseña',
                alertIcon: 'info',
                showConfirmButton: true,
                ruta: 'login'
            })
        } else {
            conexion.query('select * from usuario where usuario = ?', [usuario], async (err, results) => {
                if (results.length == 0 || !(await bcryptjs.compare(contrasena, results[0].contrasena))) {
                    res.render('login', {
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Usuario o contraseña incorrecta',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                } else {
                    const idUsuario = results[0].idUsuario;
                    const token = jwt.sign({ idUsuario:idUsuario }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRATION_TIME
                    })
                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert:true,
                        alertTitle: 'Conexión establecida',
                        alertMessage: 'Inicio de sesión correcto',
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: '/panelE'
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

loginController.isAuth = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decod = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            conexion.query('select * from usuario where idUsuario = ?', [decod.idUsuario], (err, results) => {
                if (!results) {
                    return next()
                }
                row = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/login')
    }
}

loginController.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}

module.exports = loginController