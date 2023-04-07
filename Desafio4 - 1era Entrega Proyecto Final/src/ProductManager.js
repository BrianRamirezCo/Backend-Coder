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
            throw error;
        }
    }

    getAll = async(limit) => {
        try {
            const prod = await this.accessDb();
            if (limit) {
                return prod.slice(0, limit);
            } else {
                return prod;
            }
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (newProd) => {
        try {
            const product = await this.accessDb();
                if (
                    typeof newProd.title !== 'string' ||
                    typeof newProd.description !== 'string' ||
                    isNaN(newProd.price) ||
                    typeof newProd.thumbnail !== 'string' ||
                    typeof newProd.code !== 'string' ||
                    typeof newProd.stock !== 'number'
                ) {
                    return "Missing required fields"
                }
                
                const prod = product.find(product => product.code === newProd.code)
                if (prod) {
                    return "Product already exists with code "
                }
                if (product.length == 0) {
                    product.push( {id: 1, status: true, ...newProd } )
                }else {
                    product.push( {id: product[product.length-1].id + 1  , status: true , ...newProd } )
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
            console.log('Error to Get Product');
            }
        }
        
        updateProduct = async (id, updateObj) => {
            try {
            const products = await this.accessDb();
            const productToUpdate = products.find((product) => product.id === id);

            if (!productToUpdate) {
            console.log("Product not found with id");
                return;
            }

            Object.keys(updateObj).forEach((key) => {
                productToUpdate[key] = updateObj[key];
            });

            await fs.writeFile(this.url, JSON.stringify(products, null, 2));
            console.log("Product updated");
            } catch (error) {
            console.log(error);
            }
        };
        
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

export default ProductManager;

