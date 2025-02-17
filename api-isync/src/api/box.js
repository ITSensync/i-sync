import { Router } from 'express';
import boxController from '../controllers/box.controller.js';
import middlewares from '../middlewares.js'

const router = Router();

router.get('/', boxController.getAllBox);
router.get('/:id', boxController.getBoxById);
router.post('/', boxController.createBox)
router.patch('/:id', boxController.updateBox)
router.delete('/:id', boxController.deleteBox)
router.get('/:id/populate', boxController.getBoxByIdAndPopulate)

export default router
