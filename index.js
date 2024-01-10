class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCount = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.warn("Los campos son obligatorios");
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.log("Codigo ya introducido. Elejir otro");
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
        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado");
            return null;
        }
    }
}

const productManager = new ProductManager();

productManager.addProduct("Zapatillas Nike", "Zapatillas nike air max 1", 150.000, "https://sneakernews.com/wp-content/uploads/2021/10/Nike-Air-Max-90-NN-White-DH8010-100-4.jpg?w=1140", "AIRMAX1", 1);
productManager.addProduct("Zapatillas Adidas", "Zapatillas adidas ozweego white", 170.000, "https://untiedstore.com.ar/wp-content/uploads/2021/05/OZWEEGO-2-1.jpeg", "OZWEEGO1", 2);
productManager.addProduct("Zapatillas Puma", "Zapatillas Puma Slipstream", 120.000, "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_480,h_480/global/387544/02/sv01/fnd/ARG/fmt/png", "PUMA1", 3);

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(1);
console.log("Producto por ID:", productById);

const nonExistentProduct = productManager.getProductById(3);