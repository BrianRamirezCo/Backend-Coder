import { promises as fs } from 'fs';

class ProductManager{
    constructor(url){
        this.url = url
    }
    accessDb = async() => {
        try {
            const prod = await fs.readFile(this.url , 'utf-8')
            return JSON.parse(prod)
        } catch (error) {
            console.log("error access db");
        }
    }

    getAll = async() => {
        try {
            const prod = await this.accessDb();
            return prod;
        } catch (error) {
            console.log(error);
        }
    }

        
    addProduct = async (newProd) => {
        try {
            const product = await this.accessDb();
                if (
                    !newProd.title ||
                    !newProd.description ||
                    !newProd.price ||
                    !newProd.thumbnail ||
                    !newProd.code ||
                    !newProd.stock
                ) {
                    return "Missing required fields"
                }
                
                const prod = product.find(product => product.code === newProd.code)
                if (prod) {
                    return "Product already exists with code "
                }

                if (product.length == 0) {
                    product.push( {id: 1, ...newProd } )
                }else {
                    product.push( {id: product[product.length-1].id + 1  , ...newProd } )
                }

                fs.writeFile(this.url ,JSON.stringify(product, null, 2))

            }catch (error) {
                console.log("Error to Add"); 
            }
        }

        getProductById = async (id) => {
            try {
                const prod = await this.accessDb();
                const product = prod.find(x => x.id === id)
                return product;
            } catch (error) {
            console.log();
            }
        }

        updateProduct = async (id, updateObj) => {
            try {
            const products = await this.accessDb();
            const productIndex = products.findIndex((product) => product.id === id);
                if (productIndex === -1) {
                console.log("Product not found with id");
            }
            products[productIndex] = {
                ...products[productIndex],
                ...updateObj,
                id: id,
            };
            await fs.writeFile(this.url, JSON.stringify(products, null, 2));
            console.log("Product updated");
            } catch (error) {
            console.log(error);
            }
        }

        deleteProduct = async (id) =>{try {
            const prod = await this.accessDb();
            const product = prod.findIndex(x => x.id === id)
            
            if(product == -1) {
                console.log("Product not find with id", id)
                return null
            }else
            { prod.splice(product, 1);
                console.log("Product deleted")
                await fs.writeFile(this.url , JSON.stringify(prod, null, 2))
            } 
        } catch (error) {
            console.log(error);
        }
        }
}

const products = new ProductManager('./DB/products.json')



// products.addProduct({
//     title: "producto prueba12",
//     description: "Este es un producto prueba54",
//     price:200,
//     thumbnail: "Sin imagen33",
//     code: "009",
//     stock:478
// })
// .then(resp => console.log(resp))
products.updateProduct(1 , {price: 1500})
.then(resp => resp)

products.getAll()
.then(resp => console.log(resp))


// products.deleteById(1)
// .then(resp =>console.log(resp))