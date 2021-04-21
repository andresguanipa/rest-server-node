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

process.env.CADUCIDAD_TOKEN = '48h';

/* ====================
SEED de Autenticación
======================= */

process.env.SEED = process.env.SEED || 'token-SEED'

/* ====================
BASE DE DATOS
======================= */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/* ====================
GOOGLE CLIENT
======================= */

process.env.CLIENT_ID = process.env.CLIENT_ID || '871033459105-td45p9ldihesqvdv26i16km8flm64lr6.apps.googleusercontent.com';