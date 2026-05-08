import { Router } from 'express';
import { createTask, updateTaskStatus } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Protect all task routes
router.use(authMiddleware);

// Path: POST /api/tasks
router.post('/', createTask);

// Path: PATCH /api/tasks/:id
// We use PATCH because we are only updating ONE part of the task (the status)
router.patch('/:id', updateTaskStatus);

export default router;
