import express from 'express';
import { productsRouter } from './routes/productRouter.js';
import { ProductManager } from './productManager.js';
import { CartManager } from './cartManager.js';
import { cartsRouter } from './routes/cartRouter.js';

const PORT = 8080;

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())
app.use ('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, (req, res)=> {
    console.log(`server escuchando en el puerto http://localhost:${PORT}`);
})
