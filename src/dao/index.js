import FileProductManager from "./files-manager/productManager.js";
import DbProductManager from "./db-managers/products.dao.manager.js";
import FileCartManager from "./files-manager/cartManager.js";
import DbCartManager from "./db-managers/carts.dao.manager.js";

const config = {
  persistenceType: "db",
};

let ProductManager, CartManager;

if (config.persistenceType === "db") {
  ProductManager =DbProductManager;
  CartManager =DbCartManager;
} else if (config.persistenceType === "file") {
  ProductManager = FileProductManager;
  CartManager = FileCartManager;
} else {
  throw new Error("Unknown persistence type");
}

export { ProductManager, CartManager };

