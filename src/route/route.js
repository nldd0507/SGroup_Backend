import userRouter from './users.route.js';
import { Router } from 'express';
import authRouter from './auth.route.js';

const router = Router();
router.use('/auth', authRouter)
router.use('/users', userRouter);

export default router;