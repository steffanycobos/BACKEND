import { Router, json } from "express";
import __dirname from "../utils.js";
import ProductManager from "../productManager/productManager.js";

const viewsRouter = Router();
viewsRouter.use(json());
let manager= new ProductManager(__dirname+'/productManager/productos.json')
let allProducts= await manager.getProducts()

viewsRouter.get("/",  async  (req,res)=>{
  res.render("home",{allProducts})
 
});

viewsRouter.get('/real-time-products', async  (req,res)=>{
  res.render('real_time_products',{allProducts})
 
 
})
export default viewsRouter;
 