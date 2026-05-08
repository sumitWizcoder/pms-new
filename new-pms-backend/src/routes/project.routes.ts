import { Router } from 'express';
import { createProject, getProjects, deleteProject } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// 1. ALL routes in this file require the user to be logged in
router.use(authMiddleware);

// 2. Path: POST /api/projects
router.post('/', createProject);

// 3. Path: GET /api/projects
router.get('/', getProjects);

// 4. Path: DELETE /api/projects/:id
router.delete('/:id', deleteProject);

export default router;
