import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import ProductManager from "./productManager/productManager.js";

const app = express();
const manager = new ProductManager(
  __dirname + "/productManager/productos.json"
);
app.use(express.static(__dirname + "/../public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/real-time-products,", viewsRouter);

const httpServer = app.listen(8080, () =>
  console.log(`Server listening to port 8080`)
);

let productList = await manager.getProducts();

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("New client connected!");
  socket.emit("product-list", productList);
  app.use((req, res, next) => {
    req.socketServer = socketServer;
    next();
  });
});
