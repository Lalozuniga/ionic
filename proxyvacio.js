const express = require('express');
const app = express();
const port = 4000;

var categorias = [];
app.get('/categoria', (req, res) => {
    res.json(categorias);
});

app.post('/categoria', (req, res) => {
    var nombre = req.query.nombre;
    var categoria = req.query.categoria;
    const datos = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        completada:false
    };
    categorias.push({...datos});
    res.json('Datos guardados');
});

app.put('/categoria/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).send('El ID proporcionado no es válido.');
        return;
    }

    const nuevacat = categorias.find(t => t.id === id);
    if (!nuevacat) {
        res.status(404).send('No se encontró la categoría con el ID proporcionado.');
        return;
    }
    nuevacat.nombre = req.query.nombre ||nuevacat.nombre;
    nuevacat.categoria = req.query.categoria ||nuevacat.categoria;
    nuevacat.completado = req.query.completada ||nuevacat.completada;


    res.status(200).json({ message: 'Categoría actualizada con éxito', categoria: nuevacat });
    res.json(nuevacat);
});

app.delete('/categoria/:id', (req, res) => {
    const id = parseInt(req.params.id);
    categorias = categorias.filter(cat => cat.id !== id);
    res.send('Categoría eliminada');
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
