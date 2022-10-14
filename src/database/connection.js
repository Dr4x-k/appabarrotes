const app = require('../app.js')
const mysql = require('mysql')
const myConnection = require('express-myconnection')



// const mysql = require('mysql');
const conexion = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USER  || 'root',
    password : process.env.DB_PWD   || '300121',
    database : process.env.DB_NAME  || 'abarrotes'  
});

conexion.connect((error) => {
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('¡Conectado a la Base de Datos!');
});

module.exports = conexion;






// var dbSettings = {
//     host        :   'localhost',
//     user        :   process.env.DB_USER   || 'root',
//     password    :   process.env.DB_PWD    || 'toor',
//     database    :   process.env.DB_NAME   || 'abarrotes',
//     port        :   process.env.DB_PORT   || '3306'
// }

// var connection = mysql.createConnection({
//     host        :   'localhost',
//     user        :   process.env.DB_USER   || 'root',
//     password    :   process.env.DB_PWD    || 'toor',
//     database    :   process.env.DB_NAME   || 'abarrotes',
//     port        :   process.env.DB_PORT   || '3306'
// })


// connection.connect()

// dbSettings.connect()

// module.exports = dbSettings
// module.exports = connection