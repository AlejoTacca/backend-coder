//----------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio N°1 (Clases)
/*
class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
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
  
  console.log(productManager.getProducts()); // en caso de queres saber todos los productos
  
  const product = productManager.getProductById(1); // en caso de encontrarlo
  console.log("Producto encontrado:", product);
  
  const nonExistentProduct = productManager.getProductById(3); // en caso de que de error
  */
//----------------------------------------------------------------------------------------------------------------------------------------------
//Calculadora de Edad





//----------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio N°2
const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Método para cargar productos desde el archivo
  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
      return [];
    }
  }

  // Método para calcular el próximo ID basándose en los productos cargados
  calculateNextId() {
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  // Método para guardar productos en el archivo
  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.filePath, data);
    } catch (error) {
      console.error('Error al guardar productos:', error.message);
    }
  }

  // Método para agregar un producto
  addProduct(product) {
    this.products = this.loadProducts();
    product.id = this.calculateNextId();
    this.products.push(product);
    this.saveProducts();
  }

  // Método para obtener todos los productos
  getProducts() {
    return this.loadProducts();
  }

  // Método para obtener un producto por su ID
  getProductById(id) {
    const products = this.loadProducts();
    return products.find((product) => product.id === id);
  }

  // Método para actualizar un producto por su ID
  updateProduct(id, updatedProduct) {
    const products = this.loadProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      this.products = products;
      this.saveProducts();
    }
  }

  // Método para eliminar un producto por su ID
  deleteProduct(id) {
    const products = this.loadProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      products.splice(index, 1);
      this.products = products;
      this.saveProducts();
    }
  }
}

// Ejemplo de uso:
const productManager = new ProductManager('productos.json');

// Agregar un producto
productManager.addProduct({
  title: 'Producto1',
  description: 'descripción del Nuevo Producto',
  price: 19.99,
  thumbnail: 'imagen_nueva.jpg',
  code: 'NP1',
  stock: 10,
});

// Consultar todos los productos
console.log('Todos los productos:', productManager.getProducts());

// Consultar un producto por ID
const productId = 1;
const productById = productManager.getProductById(productId);
console.log(`Producto con ID ${productId}:`, productById);

// Modificar un producto por ID
productManager.updateProduct(productId, { price: 24.99 });
console.log(`Producto modificado con ID ${productId}:`, productManager.getProductById(productId));

// Eliminar un producto por ID
productManager.deleteProduct(productId);
console.log('Todos los productos después de eliminar:', productManager.getProducts());

