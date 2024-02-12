import { Router } from "express";
import { cartManager } from "../index.js";

const cartsRouter = Router();

cartsRouter.post('/', async(req, res)=>{
    try {
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send("error al crear carrito")
    }
})

cartsRouter.get('/:cid', async(req, res)=>{
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send("error al cargar productos al carrito")
    }
})

cartsRouter.post('/:cid/products/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    try {
        await cartManager.addProductCart(cid, pid)
        res.send("producto agregado")
    } catch (error) {
        res.send("error al guardar producto en carrito")
    }
})

export {cartsRouter}