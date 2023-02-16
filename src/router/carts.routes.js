import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartRouter=Router()

const carts= new CartManager
cartRouter.post("/",async(req,res)=>{
    res.send(await carts.addCarts())
})

cartRouter.get('/',async(req,res)=>{
    res.send(await carts.readCarts())
})

cartRouter.get('/:id',async(req,res)=>{
    res.send(await carts.getCartsById(req.params.id))
})

export default cartRouter