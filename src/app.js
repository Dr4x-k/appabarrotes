const express = require('express')
const {engine} = require('express-handlebars')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(cookieParser())

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

// configuracion dotenv
const dotenv = require('dotenv')
const { cookie } = require('express-validator')
dotenv.config({ path : './.env'})

// configuracion servidor
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')

// app.engine('.ejs', engine({
//     extname: '.ejs'
// }))

// middlewares
app.use(morgan('dev'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.listen(app.get('port'), () => {
    console.log('Servidor funcionando')
})

module.exports = app