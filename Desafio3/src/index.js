import express from 'express';
const app = express();
const PORT = 4000;

import ProductManager from './ProductManager.js';
const products = new ProductManager('../DB/products.json')

//Routes

app.get('/healthcheck', (req, res,) => {
    res.send("ok")
})

app.get('/products', async (req, res) => {
    const productData = await products.getAll();
    res.send(productData);
    //res.json({ products: productData });
})

app.get('/products/query', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const productData = await products.getAll(limit);
    res.send(productData);
})

app.get('/products/:id', async (req, res) => {
    const productById = parseInt(req.params.id);
    const productData= await products.getProductById(productById);
    res.send(productData)
})

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.listen(PORT , (err) =>{
    if (err) return console.log('Error listening', err);
    
    console.log(`Server listening on port ${PORT}`);
})

