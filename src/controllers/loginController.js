const conexion = require('../database/connection')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginController = {}

loginController.list = (req, res) => {
    conexion.query('select * from usuario', (err, result) => {
        if (err) {
            res.json(err);
        }
        // console.log(result)
        res.render('login')
    })
}

loginController.login = (req, res) => {
    const usuario = req.body.user,
            contrasena = req.body.pssw;
    conexion.query('select * from usuario where usuario = ?', { usuario }, (err, results) => {
        
    })
}

// loginController.login = (req, res) => {
//     // const data = req.body
//     // console.log(data)

//     let user = req.body.user
//     let pssw = req.body.pssw

//     conexion.query('select * from usuario where = ?', [user], (err, empleado) => {

//         if (empleado.length > 0) {
//             // bcrypt.compare(data.pssw, empleado.contrasena, (err, isMatch) => {
//                 // if (!isMatch) {
//                     // res.render('login', { err: 'Error: contraseña incorrecta'})
//                     // console.log('contraseña incorrecta')
//                 // } else {
//                     // console.log('Holi')
//                 // }
                
//             // })
//             console.log(empleado)
//         } else {
//             console.log('usuario incorrecto')
//         }
//         // console.log(empleado)
//     })
// }


// loginController.login = async (req, res) => {
//     try {
//         const { user, pssw } = req.body
//         if (!user || !pssw) {
//             return res.status(400).render('login'), {
//                 message: "Ingresa usuario y contraseña"
//             }
//         } conexion.query('select * from usuario where usuario = ?', [user], async (err, results) => {
//             console.log(results)

//             console.log(req.body)
//             if (!results || !pssw, results[0].pssw) {
//                 res.status(401).send('login', (req, res) => {
//                     console.log(results)
                    
//                 })
//                 // res.status(401).send('login', {
//                 //     message: 'Eror'
//                 // })
//             } else {
//                 const id = results[0].id

//                 // const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//                 //     expiresIn: process.env.JWT_EXPIRES_IN
//                 // })

//                 // console.log('El token is ' + token)

//                 // const cookieOptions = {
//                 //     expires: new Date(
//                 //         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//                 //     ),
//                 //     httpOnly: true
//                 // }
//                 // res.cookie('userSave', token, cookieOptions)
//                 // res.status(200).redirect('/')
//                 res.send('jala')
//             }
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }

module.exports = loginController