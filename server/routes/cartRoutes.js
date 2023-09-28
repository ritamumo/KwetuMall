import express from 'express';
import checkAuth from '../controllers/auth/checkAuth.js'
import { addToCart, getCartItems, removeCartItem, checkOut} from'../controllers/cartController.js'

const router = express.Router();

router.post('/add-to-cart', checkAuth, addToCart);
router.get('/get-cart-items', checkAuth, getCartItems);
router.post('/remove-cart-item', checkAuth, removeCartItem);
router.post('/clear-cart', checkAuth, checkOut);

export default router