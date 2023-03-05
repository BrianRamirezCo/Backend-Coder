class ProductManager{

    products = [];

getProducts(){
    let listProducts = this.products;
    if (listProducts.length === -1) {
        return [];
    } else {
        return listProducts;
    }
    
}

addProduct(product){
    let listProducts = this.products;
    let newId;

    if(listProducts.length == 0){
        newId = 1
    }else {
        newId = listProducts[listProducts.length - 1].id + 1;
    }

    const newProducto = {id: newId, ...product}
    listProducts.push(newProducto);
    return newId;
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

//console.log(manegeProducts.getProducts());

console.log(manegeProducts.addProduct({title:"producto prueba",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",
code:"abc123",stock:25}));
console.log(manegeProducts.addProduct({title:"producto prueba2",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",
code:"abc123",stock:25}));
console.log(manegeProducts.addProduct({title:"producto prueba3",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",
code:"abc123",stock:25}));


console.log(manegeProducts.getProducts());
console.log(manegeProducts.getProductById(3));