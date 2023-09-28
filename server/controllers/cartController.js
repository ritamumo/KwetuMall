import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import salesModel from '../models/salesModel.js';

export const addToCart = async (req, res) => {
  // Get the product id ant the quanity
  //
  const user = await userModel.findOne({ _id: req.user._id });
  const cart = user.cart;

  //check if product already exists in cart
  const productExists = cart.find((item) => item.productId === req.body.productId);
  //if it exists send a message to say already in cart
  if (productExists) {
    res.send({
      message: 'Product already exists',
    });
  } else {
    //if it doesn't store on the userModel in cart
    user.cart = [...user.cart, { productId: req.body.productId, quantity: req.body.quantity }];
    const newUser = await user.save();
    res.send({
      message: 'Added to cart',
      data: newUser.cart,
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    //get cart from req.user
    const cart = req.user.cart;
    //cart will give us an array of objects
    //Each object will have productID and quantity
    //for each productID we need to find the product
    let products = [];
    for (let i = 0; i < cart.length; i++) {
      let product = await productModel.findOne({ _id: cart[i].productId });
      products = [...products, { product: product, quantity: cart[i].quantity }];
    }
    //add all the products to one array and send
    res.send({
      message: 'Fetched cart items',
      data: products,
    });
  } catch (error) {
    res.send({
      message: 'Error occured',
      data: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    //get the cart from user
    const user = await userModel.findOne({ _id: req.user._id });
    const cart = user.cart;
    //filter out the product that is to be deleted
    let newCart = cart.filter((item) => item.productId !== req.body.productId);
    user.cart = newCart
    //save user
    const newUser = await user.save();
    res.send({
      message: 'item deleted from cart',
      data: newUser.cart,
    });
  } catch (error) {
    res.send({
      message: 'Error Occurred',
      data: error.message,
    });
  }
};

export const checkOut = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    const cart = user.cart;
    for (let i = 0; i < cart.length; i++) {
      //1. reduce stock on the product model
      const product = await productModel.findOne({ _id: cart[i].productId });
      product.stock = product.stock - cart[i].quantity;
      await product.save();
      //2. record the sale on sales model : productId userId quantity buyingPrice SellingPrice
      const newSale = new salesModel({
        productId: product._id,
        userId: user._id,
        quantity: cart[i].quantity,
        buyingPrice: product.buyingPrice,
        sellingPrice: product.sellingPrice,
      });
      await newSale.save();
    }

    //3. remove the cart items from user model
    user.cart = [];
    const newUser = await user.save();
    res.send({
      message: 'Successfully checked out',
    });
  } catch (error) {
    res.send({
      message: 'Error occurred',
      data: error.message,
    });
  }
};
