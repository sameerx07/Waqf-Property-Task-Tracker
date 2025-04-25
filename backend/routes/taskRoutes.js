import express from 'express';
import { getTasks, createTask, updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id/status').put(updateTaskStatus);

export default router;