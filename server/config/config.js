/* =========
Puerto
========= */

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://andreseguanipa1:8TmuM8cgbYgkboVI@cafe.x6bjp.mongodb.net/cafe';
}

process.env.URLDB = urlDB;