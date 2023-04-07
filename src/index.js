import express from "express";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import socketRouter from "./routes/socket.routes.js";
import __dirname, { uploader } from "./utils.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { Server } from "socket.io";
import ProductManager from "./controllers/ProductManager.js";
import userRouter from "./routes/users.routes.js";
import mongoose from "mongoose";



//Creando Server Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

//connection mongoose  
const Url='mongodb+srv://agustinrotondomateos:mfELPN6qwv7kRxev@cluster1.ulef6fa.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(Url,{useNewUrlParser: true, useUnifiedTopology:true})
.then(mensaje => console.log("DB Atlas esta conectado") )
.catch(error=>console.log(error.mensaje)) 

//Archivos Staticos
app.use("/", express.static(__dirname + "/public"));

//Creando Loacal host 8080
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Express por Local host ${server.address().port}`)
);

export const io = new Server(server);


const productAll = new ProductManager();
app.get("/", async (req, res) => {
  let products = await productAll.readProducts();
  res.render("home", {
    title: "Backend | Express",
    products,
  });
});

//Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/realTimeProducts", socketRouter);
app.use("/users", userRouter);
