const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const productManager = new ProductManager();
const cartManager = new CartManager();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { products: productManager.getProducts() });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: productManager.getProducts() });
});

app.get('/cart/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    const cartProducts = await cartManager.getCartProducts(cartId);
    res.render('cart', { cartId, cartProducts });
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('createCart', async () => {
        const newCart = await cartManager.createCart();
        socket.emit('cartCreated', newCart);
    });

    socket.on('addProductToCart', async ({ cartId, productId, quantity }) => {
        const result = await cartManager.addOrUpdateProductInCart(cartId, productId, quantity);
        if (result.success) {
            io.emit('cartUpdate', { cartId, products: await cartManager.getCartProducts(cartId) });
        }
    });

    socket.on('addProduct', async (data) => {
        await productManager.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock);
        io.emit('productListUpdate', productManager.getProducts());
    });

    socket.on('deleteProduct', async (productId) => {
        await productManager.deleteProduct(productId);
        io.emit('productListUpdate', productManager.getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${8080}`);
});