class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1; // Para generar IDs autoincrementables
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
        console.log("Error: Todos los campos son obligatorios.");
        return;
      }
  
      if (this.products.some((product) => product.code === code)) {
        console.log("Error: El campo 'code' ya existe para otro producto.");
        return;
      }
  
      const product = {
        id: this.nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Error: Producto no encontrado");
      }
    }
  }
  
  const productManager = new ProductManager();
  
  productManager.addProduct("Producto 1", "Descripción del Producto 1", 10.99, "imagen1.jpg", "P1", 50);
  productManager.addProduct("Producto 2", "Descripción del Producto 2", 15.99, "imagen2.jpg", "P2", 30);
  
  console.log(productManager.getProducts());
  
  const product = productManager.getProductById(1);
  console.log("Producto encontrado:", product);
  
  const nonExistentProduct = productManager.getProductById(3); // Intenta buscar un producto inexistente
  
