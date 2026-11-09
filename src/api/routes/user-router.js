import express from 'express';
import {postUser, removeUser} from '../controllers/user-controller.js';
import {getCatsByUserId} from '../controllers/cat-controller.js';

const userRouter = express.Router();

userRouter.route('/').post(postUser);
userRouter.route('/:id').delete(removeUser);
userRouter.route('/:id/cats').get(getCatsByUserId);

export default userRouter;
