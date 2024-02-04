const express = require('express');
const ProductManager = require('../ProductManager');

const router = express.Router();
const productManager = new ProductManager();

router.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;

    try {
        await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.json({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear el producto:', error.message);
        res.status(500).json({ error: 'Error del servidor al crear el producto' });
    }
});

module.exports = router;