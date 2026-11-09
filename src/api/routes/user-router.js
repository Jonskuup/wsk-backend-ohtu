import express from 'express';
import {postUser, removeUser, putUser} from '../controllers/user-controller.js';
import {getCatsByUserId} from '../controllers/cat-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.route('/').post(postUser);
userRouter.route('/:id').delete(authenticateToken, removeUser);
userRouter.route('/:id/cats').get(authenticateToken, getCatsByUserId);
userRouter.route('/:id').put(authenticateToken, putUser);

export default userRouter;
