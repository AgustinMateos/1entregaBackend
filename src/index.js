import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import { fileURLToPath } from 'url'
import { dirname } from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

    const app=express()
    const PORT=8080
//midelwares
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    
//routes
    app.use("/static",express.static(__dirname+'/public'))
    app.use("/products",productRouter)
    app.use("/cart",cartRouter)


app.listen(PORT,()=>{
    console.log(`Servidor Express on Port ${PORT}`)
})