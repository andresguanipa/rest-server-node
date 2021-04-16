/* =========
Puerto
========= */

process.env.PORT = process.env.PORT || 3000;

/* =========
Entorno
========= */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* ====================
Vencimiento del token
======================= */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/* ====================
SEED de Autenticación
======================= */

process.env.SEED = process.env.SEED || 'token-SEED'


// BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;