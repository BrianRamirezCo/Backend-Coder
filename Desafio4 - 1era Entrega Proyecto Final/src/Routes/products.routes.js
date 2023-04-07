import {Router} from "express";
import ProductManager from "../ProductManager.js"


const productsRoutes = Router();
const products = new ProductManager('./products.json')

productsRoutes.get('/products', async  (req, res) => {
    const productData = await products.getAll();
    res.send(productData);
})

productsRoutes.get('/products/query', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const productData = await products.getAll(limit);
    res.send(productData);
})

productsRoutes.get('/products/:id', async (req, res) => {
    const productById = parseInt(req.params.id);
    const productData= await products.getProductById(productById);
    res.send(productData)
})
productsRoutes.post('/products', async (req, res) => {
    const newProd = req.body
    const productData = await products.addProduct(newProd);
    res.send(productData);
})

productsRoutes.put('/products/:id', async (req, res) => {
    const productById = parseInt(req.params.id)
    const updateObj = req.body
    console.log(updateObj);
    const productData = await products.updateProduct(productById,updateObj);
    res.send(productData)
})

productsRoutes.delete('/products/:id', async (req, res) =>{
    const productById = parseInt(req.params.id)
    const productData= await products.deleteProduct(productById);
    res.send(productData)
})
export default productsRoutes;