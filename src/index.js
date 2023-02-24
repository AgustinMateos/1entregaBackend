import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import { __dirname } from "./path.js"
import multer from 'multer'
import { engine } from "express-handlebars"//create para server mas complejos
import * as path from 'path'

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
//midelwares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine())//config de handlbars
app.set("view engine", "handlebars")//mis vistas van a ser archivos handlebars
app.set("views", path.resolve(__dirname, "./views"))// donde se alojan las vistas handlebars
console.log(path.resolve(__dirname, '/views'))
console.log(__dirname)
//routes
app.use("/static", express.static(__dirname + '/public'))
app.use("/products", productRouter)
app.use('/cart', cartRouter)

app.get('/static', (req, res) => {//se selecciona el componente home

    const user = {
        nombre: "seba",
        email: "seba@gmail.com",
        rol: "tutor",

    }

    const cursos = [{ numComision: 312423, dias: "lunes y viernes", horario: "20:00 a 22:00" },
    { numComision: 388923, dias: "martes y jueves", horario: "19:00 a 21:00" }]

    res.render("home", {
        titulo: "boca",
        mensaje: " juniors",
        isTutor: user.rol === "tutor",
        user,
        cursos

    })
})

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

app.listen(PORT, () => {
    console.log(`Servidor Express on Port ${PORT}`)
})