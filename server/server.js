require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CONFIGURACIÓN GLOBAL DE RUTAS
app.use(require('./routes/index'));

// Habilitar la carpeta public

app.use(express.static(path.resolve(__dirname, '../public')));


//Conexión con la base de datos
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})