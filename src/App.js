const express = require('express');
const fs = require('fs/promises'); 
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);

    try {
        const products = await productManager.getAllProducts();

        if (limit) {
            res.json({ products: products.slice(0, limit) });
        } else {
            res.json({ products });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);

    try {
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${8080}`);
});
