import express from 'express';
import checkAuth from '../controllers/auth/checkAuth.js'
import { addToCart, getCartItems} from'../controllers/cartController.js'

const router = express.Router();

router.post('/add-to-cart', checkAuth, addToCart);
router.get('/get-cart-items', checkAuth, getCartItems);

export default router