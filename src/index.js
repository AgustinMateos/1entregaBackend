import express from "express"
import productRouter from "./router/product.js"

const app=express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",productRouter)


app.listen(PORT,()=>{
    console.log(`Servidor Express on Port ${PORT}`)
})