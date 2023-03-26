import CartManager from "./files-manager/cartManager.js";
import ProductManager from "./files-manager/productManager.js";
import productsDBManager from "./db-managers/products.dao.manager.js";
import cartsDBManager from "./db-managers/carts.dao.manager.js";

const config = {
    persistenceType: "db",
  };

  let ProductManagerDB, CartManagerDB

  if (config.persistenceType === "db") {
   ProductManagerDB = productsDBManager;
    CartManagerDB = cartsDBManager;
  } else if (config.persistenceType === "file") {
    ProductManagerDB = CartManager;
    CartManagerDB = ProductManager;
  } else {
    throw new Error("Unknown persistence type");
  }
  
  export  {ProductManagerDB, CartManagerDB };