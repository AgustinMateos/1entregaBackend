import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import { io } from "../index.js";


const socketRouter = Router();
const productAll = new ProductManager();

//Websockets
socketRouter.get("/", async (req, res) => {


    //se recibe peticion de coneccion Cliente
    io.on("connection", (socket) => {
        socket.on("messaje", (data) => {
            console.log(data);
            //Mensaje del Servidor
            io.sockets.emit("estado", "Servidor Conectado por Sockets");
        });

        //se recibe peticion de Eliminar producto
        socket.on("deleteProduct", async (data) => {
            let deleteProduct = await productAll.deleteProducts(data);
            io.sockets.emit("deleteProduct", {
                messaje: deleteProduct,
                products: await productAll.readProducts(),
            });
        });
    });

    //Render por defecto
    let products = await productAll.readProducts();
    res.render("realTimeProducts", {
        title: "Websockets",
        products,
    });
});

export default socketRouter;
