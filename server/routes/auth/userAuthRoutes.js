import express from 'express';
import { register, login} from '../../controllers/auth/userAuthController.js'
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
export default router;