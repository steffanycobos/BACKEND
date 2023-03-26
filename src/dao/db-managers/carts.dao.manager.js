import { json } from "express";
import cartsModel from "../models/carts.models.js";

 class CartManager {
  constructor() {
    console.log("Working with Carts using database");
  }

  getCart = async () => {
 let  carts = await cartsModel.find().lean();
    return carts;
  };

  async addCart(products){
    let cart= await cartsModel.create({products})
    return cart;
  };

  async checkCart(id){
    const cart = await cartsModel.find({ _id: id });
    return cart;
  };

 
addProductToCart = async (cartID, product) => {
   
  const cart = await (cartsModel.find({_id:cartID}));
  console.log( cart,'<= Cart', typeof cart)
  console.log(cart[0],'<=cart[0]')

  const productExiste = cart[0].products.id === product[0].id;
//console.log(productExiste,'sss', product[0].id, typeof product)

  if (productExiste) {
    productExiste.quantity= productExiste.quantity+1
    return [cart];
  }
  else {
 let newProducts={id: product[0].id,quantity:1}
 console.log(newProducts,'<= newProducts', typeof newProducts)
 console.log(cart[0].products, '<= Productos de cart[0]')
let newCart= cart[0].products.push(newProducts)
    
 console.log(newCart)
  return newCart;}
}
 }
 
export default  CartManager;