import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager;
class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
    }


    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id)
    }
    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid()
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "cart created"
    }
    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if (!cartById) return "cart not found"
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if (!cartById) return "carrito not created"
        let productById = await productAll.exist(productId)
        if (!productById) return "product not created"
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)
        if (cartById.products.some((prod) => prod.id === productId)) {
            let productInCart = cartById.products.find(
                (prod) => prod.id === productId
            );
            productInCart.quantity++;
            console.log(productInCart.quantity)
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat);
            return "product was added"
        }

        let cartsConcat = [{ id: cartId, products: [{ id: productById.id, quantity: 1 }] }, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return " successfully added product"

    }

}

export default CartManager
