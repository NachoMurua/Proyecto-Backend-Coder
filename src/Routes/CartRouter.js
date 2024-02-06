const express = require('express');
const CartManager = require('../CartManager');
const io = require('../socket');

const router = express.Router();
const cartManager = new CartManager();

router.get('/:cartId/products', async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const cartProducts = await cartManager.getCartProducts(cartId);
        res.json(cartProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    try {
        const result = await cartManager.addOrUpdateProductInCart(cartId, productId, quantity);

        if (result.success) {
            io.emit('cartUpdate', { cartId, products: await cartManager.getCartProducts(cartId) }); // Emitir evento WebSocket cuando se actualiza el carrito
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.delete('/:cartId/products/:productId', async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    try {
        const result = await cartManager.removeProductFromCart(cartId, productId);

        if (result.success) {
            io.emit('cartUpdate', { cartId, products: await cartManager.getCartProducts(cartId) }); // Emitir evento WebSocket cuando se actualiza el carrito
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const result = await cartManager.createCart();

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;