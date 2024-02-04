const fs = require('fs/promises');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath || "./Productos.json";
        this.products = [];
        this.productIdCount = 1;
        this.loadFromFile();
    }

    async loadFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
            this.productIdCount = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
        } catch (error) {
            console.error('Error al cargar productos:', error.message);
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            console.error('Error al guardar productos:', error.message);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.warn('Campos obligatorios');
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.log('Código ya introducido. Elegir otro');
            return;
        }

        const newProduct = {
            id: this.productIdCount++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        await this.saveToFile(); 
        console.log('Producto agregado:', newProduct);
    }

    async updateProduct(productId, updatedProduct) {
        const index = this.products.findIndex(product => product.id === productId);

        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            await this.saveToFile();
            console.log('Producto actualizado:', this.products[index]);
        } else {
            console.error('Producto no encontrado');
        }
    }

    async deleteProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        await this.saveToFile();
        console.log('Producto eliminado:', productId);
    }

    getProducts() {
        return this.products;
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('Producto no encontrado');
            return null;
        }
    }
}

module.exports = ProductManager;