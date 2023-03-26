import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import messageRouter from "./routes/messages.routes.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
//import ProductManager from "./dao/files-manager/productManager.js";
import ProductManager from "./dao/db-managers/products.dao.manager.js";

const app = express();
const messages = []
const manager= new ProductManager()
/*const manager = new ProductManager(
  __dirname + "/productManager/productos.json"
);*/
app.use(express.static(__dirname + "/../public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


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
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/real-time-products,", viewsRouter);
app.use("/api/messages", messageRouter);



mongoose.connect('mongodb+srv://cobosleandra2:171294@cluster0.ydfb7m6.mongodb.net/?retryWrites=true&w=majority').then(
  (conn)=> {
    console.log("Connected to DB!")
  }
)
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("chat-message", (data) => {
    messages.push(data);

    io.emit("messages", messages);
  });

  socket.on("new-user", (username) => {
    socket.emit("messages", messages);

    socket.broadcast.emit("new-user", username);
  });
});
