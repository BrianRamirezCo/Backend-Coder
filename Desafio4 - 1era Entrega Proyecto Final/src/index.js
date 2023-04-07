import express from 'express';
import productsRoutes from './Routes/products.routes.js';
import bodyParser from 'body-parser';
import cartRouter from './Routes/cart.routes.js';



const app = express();
const PORT = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(bodyParser.json());



//Routes
app.get('/healthcheck', (req, res,) => {
    res.send("ok")
})
app.use('/api',productsRoutes)
app.use('/api/carts' , cartRouter)



app.listen(PORT , (err) =>{
    if (err) return console.log('Error listening', err);
    
    console.log(`Server listening on port ${PORT}`);
})

