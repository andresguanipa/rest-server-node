const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();
const Producto = require('../models/producto');
const _ = require('underscore');

/* ======================
Obtiene los productos
========================= */

app.get('/producto', verificaToken, (req, res) => {

    Producto.find({ disponible: true })
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            if (!productoDB) {
                return res.status(404).json({
                    ok: false,
                    err: err
                });
            }

            Producto.countDocuments({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    producto: productoDB,
                    total: conteo
                })
            });

        });

});

/* ==========================
Obtiene los productos por ID
============================= */

app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById({ id })
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (!productoDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe'
                    }
                });
            }

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        });

});

/* ================================
Obtiene los productos por Buscador
=================================== */

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i'); //Funciona como expresion regular, es decir, se utilizan para hacer coincidir combinaciones de caracteres en cadenas

    Producto.find({ nombre: regex, disponible: true })
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            if (!productoDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe'
                    }
                });
            }

            res.json({
                ok: true,
                productos: productoDB
            })

        });

});

/* ==========================
Agrega un nuevo producto
============================= */

app.post('/producto', [verificaToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id,
    })

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    })

});

/* ==========================
Actualizar el producto
============================= */

app.put('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);
    body.usuario = req.usuario._id;

    console.log(body);

    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    });

});

/* ==========================
Delete el producto
============================= */

app.delete('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    });

});

module.exports = app;