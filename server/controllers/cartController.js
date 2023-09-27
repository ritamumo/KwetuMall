import userModel from "../models/userModel.js";
import productModel from '../models/productModel.js';

export const addToCart = async (req, res)=>{
    // Get the product id ant the quanity
    // 
    const user = await userModel.findOne({_id: req.user._id});
    const cart = user.cart;
    
    //check if product already exists in cart
    const productExists = cart.find((item) => item.productId === req.body.productId)
    //if it exists send a message to say already in cart
    if(productExists){
        res.send({
            message:'Product already exists'
        })
    }else{
        //if it doesn't store on the userModel in cart
        user.cart = [...user.cart, {productId: req.body.productId, quantity: req.body.quantity}]
        const newUser = await user.save()
        res.send({
            message: 'Added to cart',
            data: newUser.cart
        })
    }
    
}

export const getCartItems = async(req, res) =>{
    try {
        //get cart from req.user
        const cart = req.user.cart;
        //cart will give us an array of objects
        //Each object will have productID and quantity
        //for each productID we need to find the product
        let products = [];
        for(let i = 0; i < cart.length; i++){
            let product = await productModel.findOne({_id: cart[i].productId})
            products = [...products, {product: product, quantity: cart[i].quantity}]
        }
        //add all the products to one array and send
        res.send({
            message: 'Fetched cart items',
            data: products
        })
    } catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
}