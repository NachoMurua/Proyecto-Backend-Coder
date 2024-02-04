const fs = require('fs/promises');

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

class CartManager {
    constructor(filePath) {
        this.filePath = filePath || "./Cart.json";
        this.carts = [];
        this.loadFromFile();
    }

    async loadFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar el carrito:', error.message);
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2), 'utf8');
        } catch (error) {
            console.error('Error al guardar el carrito:', error.message);
        }
    }

    async getCartProducts(cartId) {
        const cart = this.carts.find(c => c.id === cartId);
        if (cart) {
            return cart.products;
        } else {
            console.error('Error al entrar al carrito');
            return [];
        }
    }

    async addOrUpdateProductInCart(cartId, productId, quantity) {
        const cartIndex = this.carts.findIndex(c => c.id === cartId);

        if (cartIndex !== -1) {
            const cart = this.carts[cartIndex];
            const productIndex = cart.products.findIndex(p => p.product === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await this.saveToFile();
            return { success: true, message: 'Producto agregado y/o actualizado en el carrito' };
        } else {
            console.error('Error al entrar al carrito');
            return { success: false, message: 'Error al agregar producto al carrito' };
        }
    }

    async createCart() {
        const newCart = {
            id: generateUniqueId(),
            products: [],
        };

        this.carts.push(newCart);
        await this.saveToFile();
        return newCart;
    }
}

module.exports = CartManager;