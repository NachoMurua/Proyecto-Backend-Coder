// aguardar correccion 

const express = require('express');
const CartManager = require('../CartManager'); 

const router = express.Router();
const cartManager = new CartManager();

router.post('/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    try {
        const result = await cartManager.addOrUpdateProductInCart(cartId, productId, quantity);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        console.error('Error al crear carrito:', error.message);
        res.status(500).json({ error: 'Error del servidor para crear el carrito' });
    }
});

module.exports = router;