const express = require('express');
const ProductManager = require('../ProductManager');
const io = require('../socket'); 

const router = express.Router();
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    try {
        await productManager.addProduct(title, description, price, thumbnail, code, stock);
        const newProduct = await productManager.getProductByCode(code); 
        io.emit('productAdded', newProduct);
        res.json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.delete('/products/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId);
    try {
        await productManager.deleteProduct(productId);
        io.emit('productRemoved', productId);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;