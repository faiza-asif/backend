import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/Controllers';
import { register, login } from '../controllers/authcontroller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Auth routes
router.post('/users/auth/register', register);
router.post('/users/auth/login', login);

// Protected user routes
router.get('/users', authMiddleware, getUsers);
router.post('/users', authMiddleware, createUser);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
