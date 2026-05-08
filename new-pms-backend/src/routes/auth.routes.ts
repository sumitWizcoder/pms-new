import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// 1. Path: http://localhost:5000/api/auth/register
router.post('/register', register);

// 2. Path: http://localhost:5000/api/auth/login
router.post('/login', login);

export default router;
