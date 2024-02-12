import { promises as fs} from 'fs'

export class ProductManager {

    constructor(){
        this.path = 'products.json';
        this.products = []
    }

    async addProduct ({title, description, price, thumbnail, code, stock, status}){

        const id = this.productIdCount++;

        let newProduct = (id, title, description, price, thumbnail, code, stock, status)

        this.products= await this.getProducts();

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }

    async getProducts (){
        const response = await fs.readFile(this.path, 'utf-8')
        const responseJSON = JSON.parse(response)

        return responseJSON;
    }

    async getProductById(id){
        const response = await this.getProducts()

        const product = response.find(product => product.id === id)

        if (product){
            return product
        } else {
            console.log("Producto no encontrado")
        }
    }

//revisado ok
    async updateProduct (id, {...data}){
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if(index !== -1){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(products))
            return products [index]
        } else{
            console.log("Producto no encontrado")
        }
    } 

//revisado ok
    async deleteProduct (id){
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id === id)

        if(index !== -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("Producto no encontrado")
        }
    }
}