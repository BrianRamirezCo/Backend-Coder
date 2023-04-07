import {Router} from "express";
import CartManager from "../CartManager.js"


const cartRouter = Router();
const cart = new CartManager('./carts.json')

cartRouter.post('/', async (req , res) => {
    const cartData = await cart.createNewCart({ products: []} )
    res.send(cartData)
})

cartRouter.post('/:cid/products/:pid', async (req , res) => {
    const { cid , pid } = req.params
    const cartData = await cart.addProductToCart(parseInt(cid), parseInt(pid))
    res.send(cartData)
})

cartRouter.get('/:cid', async (req , res) => {
    const { cid } = req.params
    const cartData = await cart.getCartById(parseInt(cid))
    res.send(cartData)
})


export default cartRouter;