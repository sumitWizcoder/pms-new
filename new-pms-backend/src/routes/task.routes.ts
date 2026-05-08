import { Router } from 'express';
import { createTask, updateTaskStatus, getTasks } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Protect all task routes
router.use(authMiddleware);

// Path: GET /api/tasks
router.get('/', getTasks);

// Path: POST /api/tasks
router.post('/', createTask);

// Path: PATCH /api/tasks/:id
router.patch('/:id', updateTaskStatus);

export default router;
