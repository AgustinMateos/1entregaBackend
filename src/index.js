import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import __dirname from "./path.js"
import multer from 'multer'
import {engine} from "express-handlebars"

//const upload=multer({dest:'src/public/img'}) imagenes sin formato
const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'src/public/img')
        },  
        filename:(req,file,cb)=>{
            cb(null, `${Date.now()}--${file.originalname}`)
    }
})
const upload=multer({storage:storage})


    const app=express()
    const PORT=8080
//midelwares
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.engine("handlerbars",engine())
    app.set("view engine","handlerbars")
    
//routes
    app.use("/static",express.static(__dirname + '/public'))
    app.use("/products",productRouter)
    app.use('/cart',cartRouter)
    

    app.post('/upload',upload.single('product'),(req,res)=>{
        try {
         console.log(req.file)
         console.log(req.body)
         res.send("imagen cargada")
        } catch (error) {
            console.log(error)
            return res.send({message: error.message})
        }
         }) 

app.listen(PORT,()=>{
    console.log(`Servidor Express on Port ${PORT}`)
})