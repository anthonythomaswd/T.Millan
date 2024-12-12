const express = require('express'); 
const mysql = require('mysql'); 
const bodyParser = require('body-parser'); 
const app = express(); 
app.use(bodyParser.json()); 
const connection = mysql.createConnection({ 
host: 'localhost', 
user: 'root', 
password: '', 
database: 'productos_db' 
});

connection.connect((err) => { 
if (err) throw err; 
console.log('Connected to the database!'); 
}); 
app.listen(3000, () => { 
console.log('Server is running on port 3000'); 
}); 

app.use(express.static(__dirname)); 
app.get('/', (req, res) => { 
res.sendFile(__dirname + '/index.html'); 
});

app.post('/productos', (req, res) => { 
    const producto = req.body; 
    const sql = 'INSERT INTO productos (nombre_producto, cantidad, precio_entrada, precio_venta, iva) VALUES (?, ?, ?, ?, ?)'; 
    const values = [producto.nombre_producto, producto.cantidad, producto.precio_entrada, 
    producto.precio_venta, producto.iva]; 
    connection.query(sql, values, (err, result) => { 
    if (err) throw err; 
    res.send('Producto añadido con ID: ' + result.insertId); 
    }); 
    }); 
    // Ruta para obtener todos los productos 
    app.get('/productos', (req, res) => { 
    const sql = 'SELECT * FROM productos'; 
    connection.query(sql, (err, results) => { 
    if (err) throw err; 
    res.json(results); 
    }); 
    }); 
    // Ruta para actualizar un producto 
    app.put('/productos/:id', (req, res) => { 
    const id = req.params.id; 
    const producto = req.body; 
    const sql = 'UPDATE productos SET nombre_producto=?, cantidad=?, precio_entrada=?, precio_venta=?, iva=? WHERE id=?'; 
    const values = [producto.nombre_producto, producto.cantidad, producto.precio_entrada, 
    producto.precio_venta, producto.iva, id]; 
    connection.query(sql, values, (err, result) => { 
    if (err) throw err; 
    res.send('Producto actualizado con ID: ' + id); 
    }); 
    }); 
    // Ruta para eliminar un producto 
    app.delete('/productos/:id', (req, res) => { 
    const id = req.params.id; 
    const sql = 'DELETE FROM productos WHERE id=?'; 
    connection.query(sql, id, (err, result) => { 
    if (err) throw err; 
    res.send('Producto eliminado con ID: ' + id); 
    }); 
    }); 