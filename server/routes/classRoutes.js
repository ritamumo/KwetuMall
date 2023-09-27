import express, { Router } from 'express'
import { getStudentData, hello } from '../controllers/classController.js';

const router = express.Router();

router.get('/students', getStudentData);

router.get('/', hello)
//get ->sending data from backend
//post ->receiving data eg a user has filled a form
//put -> updating/editing data in the database
//delete -> deleting data from the database
// '/' ->path or endpoint
//(req, res)=>{} ->req: request(used when receiving data)
//                  res: response(data being sent), used like return

export default router