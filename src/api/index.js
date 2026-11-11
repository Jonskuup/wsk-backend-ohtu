import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';

const router = express.Router();

// bind base url for all cat routes to catRouter
router.use('/cats', catRouter);
// TODO: use use userRouter for all /user endpoints
router.use('/users', userRouter);

router.use('/auth', authRouter);

export default router;
