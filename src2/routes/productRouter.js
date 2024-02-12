import { Router } from 'express';
import { productManager } from '../index.js';

const productsRouter = Router()

//http://localhost:8080/products

productsRouter.get('/', async(req, res)=>{
    try {
        const {limit} = req.query;
        const products = await productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(products)

    } catch (error) {
        console.log(error)
        res.send("error al recibir productos")
    }
})

productsRouter.get('/:pid', async (req, res)=>{
    const {pid} = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.send("error al recibir el id del producto")
    }
})

productsRouter.post('/', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, status = true} = req.body
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status})
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send("error al agregar producto")
    }
})

productsRouter.put('/:pid', async (req, res) =>{
    const {pid} = req.params;
    try {
        const {title, description, price, thumbnail, code, stock, status = true} = req.body
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status})
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send("error al editar producto")
    }
})

productsRouter.delete('/:pid' , async (req, res) =>{
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(id)
        res.send("producto eliminado")
    } catch (error) {
        console.log(error)
        res.send("error al eliminar producto")
    }
})

export {productsRouter}