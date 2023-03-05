import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import { io } from "../index.js";


const socketRouter = Router();
const productAll = new ProductManager();

socketRouter.get("/", async (req, res) => {
    //Websockets

    //se recibe peticion de coneccion Cliente
    io.on("connection", (socket) => {
        socket.on("messaje", (data) => {
            console.log(data);
            //Mensaje del Servidor
            io.sockets.emit("estado", " Servidor Conectado por Sockets");
        });

        //se recibe peticion de Consultar producto del cliente
        socket.on("getProduct", async (data) => {
            let byIdProducts = await productAll.getProductsById(data);
            if (data === "") {
                io.sockets.emit("getProduct", {
                    messaje: "Se consultaron todos los Productos",
                    products: await productAll.getProducts(),
                });
            } else if (byIdProducts === "Producto no Encontrado") {
                io.sockets.emit("getProduct", {
                    messaje: byIdProducts,
                    products: [],
                });
            } else {
                io.sockets.emit("getProduct", {
                    messaje: "Consulta Exitosa",
                    products: [byIdProducts],
                });
            }
        });

        //se recibe peticion de Agergar producto del cliente
        socket.on("addProduct", async (data) => {
            let addProduct = await productAll.addProduct(JSON.parse(data));
            io.sockets.emit("addProduct", {
                messaje: addProduct,
                products: await productAll.readProducts(),
            });
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
        title: " Websockets",
        products,
    });
});

export default socketRouter;
