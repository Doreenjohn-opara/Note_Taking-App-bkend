import express, { Router } from 'express';
import { registerUser, login } from '../controllers/auth.controllers';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);

export default router;
