listProducts=[
    {
        id: 01,
        title:"producto prueba3",
        description:"Este es un producto prueba",
        price:200,
        thumbnail:"Sin imagen",
        code:"001",
        stock:25
    }
]


class ProductManager{
    constructor(){
    this.products = listProducts;}

getProducts(){
        return this.products;
}

addProduct(newProd){
    const prod = this.products.find(product => product.code === newProd.code)
    if (prod) {
        return "Product already exists with code "
    }

    if (this.products.length === 0) {
        this.products.push( {id: 1, ...newProd } )
    } else {
        this.products.push( {id: this.products[this.products.length-1].id + 1  , ...newProd } )
    }
    }



getProductById(id){
    const prod = this.products;
    const product = prod.find(x => x.id === id)

    if(product.id !== id){
    console.log("Id not found");
    }else{
        return product;
    }
    }
}

const manegeProducts = new ProductManager()

console.log(manegeProducts.addProduct({
    title:"producto prueba2",
    description:"Este es un producto prueba2",
    price:200,
    thumbnail:"Sin imagen",
    code:"002",
    stock:25
}));
console.log(manegeProducts.getProducts());