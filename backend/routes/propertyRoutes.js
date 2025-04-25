import express from 'express';
import { getProperties, createProperty, getPropertyById } from '../controllers/propertyController.js';

const router = express.Router();

router.route('/').get(getProperties).post(createProperty);
router.route('/:id').get(getPropertyById);

export default router;