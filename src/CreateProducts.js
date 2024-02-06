const express = require('express');
const ProductManager = require('../ProductManager');
const io = require('../socket'); 

const router = express.Router();
const productManager = new ProductManager();

router.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;

    try {
        await productManager.addProduct(title, description, price, thumbnail, code, stock);
        const newProduct = await productManager.getProductByCode(code); 
        io.emit('productAdded', newProduct); 
        res.json({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear el producto:', error.message);
        res.status(500).json({ error: 'Error del servidor al crear el producto' });
    }
});

module.exports = router;