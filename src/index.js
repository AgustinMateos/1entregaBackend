import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import { __dirname } from "./utils.js"
import multer from 'multer'
import { engine } from "express-handlebars"//create para server mas complejos
import * as path from 'path'
import { Server } from "socket.io"
import ProductManager from "./controllers/ProductManager.js"

//const upload=multer({dest:'src/public/img'}) imagenes sin formato
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

const app = express()
const PORT = 8080


const server = app.listen(PORT, () => {
    console.log(`Servidor Express on Port ${PORT}`)
})


export const io = new Server(server);



//MIDELWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine())//config de handlbars
app.set("view engine", "handlebars")//mis vistas van a ser archivos handlebars
app.set("views", path.resolve(__dirname, "./views"))// donde se alojan las vistas handlebars
console.log(path.resolve(__dirname, '/views'))
console.log(__dirname)



// io.on("connection", (socket) => {
//     console.log("connection con socket");

//     socket.on("mensaje", info => {//captura info cliente
//         console.log(info)
//     })

//     socket.broadcast.emit('evento-admin', 'hola desde el server, sos el admin')//brodcast se va a poder escuchar en mi app menos en el socket actual

//     socket.emit('evento-general', 'hola a todos los usuarios')
// })


//ROUTES
app.use("/", express.static(__dirname + '/public'))
app.use("/products", productRouter)
app.use('/cart', cartRouter)


//LISTA DE PRODUCTOS
const productAll = new ProductManager();

app.get("/", async (req, res) => {
    let products = await productAll.readProducts();
    res.render("home", {
        products,
    });
});
//CARGA DE IMAGENES
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        console.log(req.body)
        res.send("imagen cargada")
    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })
    }
})

