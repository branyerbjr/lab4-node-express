const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Conexión a la base de datos SQLite
const db = new sqlite3.Database(':memory:'); // En la memoria para este ejemplo, pero puede ser una ruta de archivo para una base de datos persistente

// Crear tablas para clientes y productos
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, email TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, precio REAL)");
});

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Rutas disponibles: <br> /clientes <br> /productos');
});

// Rutas para clientes
app.get('/clientes', (req, res) => {
    db.all("SELECT * FROM clientes", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error interno del servidor');
        } else {
            res.json(rows);
        }
    });
});

app.post('/clientes', (req, res) => {
    const { nombre, email } = req.body;
    db.run("INSERT INTO clientes (nombre, email) VALUES (?, ?)", [nombre, email], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(201).json({ id: this.lastID, nombre, email });
        }
    });
});

// Rutas para productos
app.get('/productos', (req, res) => {
    db.all("SELECT * FROM productos", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error interno del servidor');
        } else {
            res.json(rows);
        }
    });
});

app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    db.run("INSERT INTO productos (nombre, precio) VALUES (?, ?)", [nombre, precio], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(201).json({ id: this.lastID, nombre, precio });
        }
    });
});

app.listen(9000, () => {
    console.log('Servidor corriendo en el puerto 9000');
});
