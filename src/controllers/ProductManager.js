import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'

 class ProductManager{
constructor(){
    this.path="./src/models/products.json"
}


readProducts=async()=>{
    let products=await fs.readFile(this.path,"utf-8")
    return JSON.parse(products)
}

writeProducts = async (product)=>{
    await fs.writeFile(this.path, JSON.stringify(product))
}

addProducts=async(product)=>{
    let productsOld=await this.readProducts();
    product.id=nanoid()
    let productAll=[...productsOld,product];
    await this.writeProducts(productAll);
    return "product was added"; 
}

getProducts=async()=>{
return await this.readProducts()
};

getProductById= async (id)=>{
    let productById=await this.exist(id)
    if(!productById)return "product not found"
    return productById
}

exist=async(id)=>{
    let products=await this.readProducts();
    return products.find(prod=>prod.id === id)
}

updateProduct= async(id,product)=>{
    let productById=await this.exist(id)
    if(!productById)return "product not found"
    await this.deleteProducts(id)
    let productOld=await this.readProducts()
    let products=[{...product,id:id},...productOld] 
    await this.writeProducts(products)
    return " updated product"
}

deleteProducts= async(id)=>{
    let products = await this.readProducts();
    let existProducts=  products.some(prod=>prod.id === id)
    if(existProducts){
        let filterProducts=products.filter(prod=>prod.id != id)
        await this.writeProducts(filterProducts)
        return "product deleted"
    }
    return"the product to be removed doesnt exist"

}

}



export default ProductManager