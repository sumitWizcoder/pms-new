import { Router } from 'express';
import { register, login, getUsers } from '../controllers/auth.controller';

const router = Router();

// 1. Path: http://localhost:5000/api/auth/register
router.post('/register', register);

// 2. Path: http://localhost:5000/api/auth/login
router.post('/login', login);

// 3. Path: http://localhost:5000/api/auth/users (To see who we can assign tasks to)
router.get('/users', getUsers);

export default router;
