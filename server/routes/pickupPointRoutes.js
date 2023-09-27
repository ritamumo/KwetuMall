import express from 'express'
import { getPickupPoints,
    getPickupPoint, 
    createPickupPoint, 
    updatePickupPoint,
    deletePickupPoint,
} from '../controllers/pickupPointController.js';


const router = express.Router()

router.get('/pickup-points', getPickupPoints);
router.get('/pickup-points/:id', getPickupPoint);
router.post('/pickup-points/create', createPickupPoint);
router.post('/pickup-points/update/:id', updatePickupPoint);
router.post('/pickup-points/delete/:id', deletePickupPoint);

export default router;