import express from 'express'
import {getCategories, getCategory, createCategory, updateCategory, deleteCategory} from '../controllers/categoryController.js';


const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategory)
router.post('/categories/create', createCategory)
router.post('/categories/update/:id',updateCategory)
router.post('/categories/delete/:id',deleteCategory)

export default router