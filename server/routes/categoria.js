const express = require('express');
const Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();


/* =========================
Mostrar todas las categorias
============================ */
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion') //Ordena por orden alfabético según la descripción
        .populate('usuario', 'nombre email') //El populate nos devuelve la información del usuario medianre su id
        .exec((err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            Categoria.countDocuments((err, conteo) => {
                res.json({
                    ok: true,
                    categoriaDB,
                    cuantos: conteo

                })
            })

        })

});

/* =========================
Mostrar una categoria por ID
============================ */
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findOne({ _id: id }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: 'La categoría no existe'
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });

});

/* =========================
Crear nueva categoria
============================ */
app.post('/categoria', [verificaToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id,
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });

});

/* =========================
Actualiza la categoria
============================ */
app.put('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    const id = req.params.id;

    let newData = {
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    }

    Categoria.findByIdAndUpdate(id, newData, { new: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });

});

/* =========================
Actualiza la categoria
============================ */
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: 'La categoría no existe'
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

});


module.exports = app;