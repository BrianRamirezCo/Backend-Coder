import { promises as fs } from 'fs';

class CartManager{
    constructor(url){
        this.url = url
    }

    accessDb = async() => {
        try {
            const cart = await fs.readFile(this.url , 'utf-8')
            return JSON.parse(cart)
        } catch (error) {
            console.log("error access db");
            throw error;
        }
    }

    createNewCart = async (cart) => {
        try {
            const carts = await this.accessDb();
            
            if (carts.length === 0) {
                carts.push( {id: 1, ...cart} )
            }else{
                carts.push( {id: carts[carts.length-1].id + 1  , ...cart} )
            }
            await fs.writeFile(this.url ,JSON.stringify(carts, null, 2), 'utf-8')
            return carts

        } catch (error) {
            console.log("error to create cart", error);
        }
    }

    getCartById = async (cid) => {
        try {
            const cart = await this.accessDb();
            const cartId= cart.find(x => x.id === cid)
            return cartId;
        } catch (error) {
        console.log('Error to Get Cart');
        }
    }

    addProductToCart = async (cid , pid) => {
        try {
            const carts = await this.accessDb();
            const idc = carts.findIndex(cart => cart.id === cid);
            if(idc === -1){
            return "The cart does not exist"}

            const idp = carts[idc].products.findIndex(prod => prod.id === pid);
            if(idp === -1){
                carts[idc].products.push({id: pid , quantity: 1})
            }else{
                carts[idc].products[idp].quantity++;
            }
            await fs.writeFile(this.url ,JSON.stringify(carts, null, 2), 'utf-8')
            return carts;
        }catch(error) {
            
        }
    }
}

export default CartManager;