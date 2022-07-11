const express = require('express')
const {engine} = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

const dbSettings = require('./database/connection')
const routes = require('./routes/dashRoutes')
// const connection = require('./database/connection.js')





// rutas
app.use('/', routes)

// rutas estaticas
// app.use(express.static(path.join(__dirname, 'public/')))
app.use(express.static("public"))
app.set('views', path.join(__dirname, 'views/'))


// app.get('/signup', (req, res) => {
//     res.render('signup')
//     console.log(req.body)
// })

// app.post('/signup', (req, res) => {
//     const data = req.body
//     console.log(data)
// })

// configuracion dotenv
const dotenv = require('dotenv')
dotenv.config({ path : './.env'})

// configuracion servidor
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')

// app.engine('.ejs', engine({
//     extname: '.ejs'
// }))

// middlewares
app.use(morgan('dev'))




// librerias para conexion
// const mysql = require('mysql')
// const myConn = require('express-myconnection')

// intento de conexion con mysql
// app.use(myConn(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: 'toor',
//     port: '3306',
//     database: 'abarrotes'
// }, 'single'))

// segundo intento de conexion con mysql
// app.use(myConn(mysql, dbSettings, 'single'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.listen(app.get('port'), () => {
    console.log('Servidor funcionando')
})

module.exports = app