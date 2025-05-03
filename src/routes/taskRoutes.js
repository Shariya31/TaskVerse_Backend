import express from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from '../controllers/taskControllers.js';
import { validate } from '../middleware/validate.js';
import { taskSchema, updateTaskSchema } from '../validators/taskValidator.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', isAuthenticated, validate(taskSchema), createTask);
router.put('/:id', isAuthenticated, validate(updateTaskSchema), updateTask);
router.delete('/:id', isAuthenticated, deleteTask);
export default router;
