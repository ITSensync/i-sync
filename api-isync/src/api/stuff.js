import { Router } from 'express';
import stuffController from '../controllers/stuff.controller.js';

const router = Router();

router.get('/', stuffController.getAllStuff);
router.get('/:id', stuffController.getStuffById);
router.post('/', stuffController.createStuff)
router.patch('/:id', stuffController.updateStuff)
router.delete('/:id', stuffController.deleteStuff)

export default router
