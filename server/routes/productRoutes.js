import express from "express";
import multer from 'multer';
import {getProducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/productController.js';

const router = express.Router();

const upload = multer({dest: 'uploads'});
const uploadProductImage = upload.fields([
    {name: 'image', maxcount: 1}
])
//

// getting att the product
router.get('/products', getProducts);
//getting one product
router.get('/products/:id', getProduct);
//creating one product
router.post('/products/create', uploadProductImage, createProduct);
//
router.post('/products/update/:id',uploadProductImage, updateProduct);
router.post('/products/delete/:id', deleteProduct);

export default router;