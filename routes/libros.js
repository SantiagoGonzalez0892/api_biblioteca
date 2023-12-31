const express = require('express');
const Libro = require('../models/Libro');
const { requiredScopes } = require('express-oauth2-jwt-bearer');


const router = express.Router();


router.get('/', requiredScopes("read:libros"), async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al obtener los libros" });
  }
});

router.post('/', requiredScopes("write:libros"), async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Libro" });
  }
});

router.put('/:id', requiredScopes("write:libros"), async (req, res) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
});

router.delete('/:id', requiredScopes("write:libros"), async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json("Libro eliminado correctamente");
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
});

// router.get('/:id', requiredScopes("read:libros"), async (req, res) => {
//   try {
//     const libro = await Libro.findById(req.params.id);
//     res.json(libro);
//   } catch (error) {
//     res.status(500).json({ error: "Error el libro" });
//   }
// });


module.exports = router;
