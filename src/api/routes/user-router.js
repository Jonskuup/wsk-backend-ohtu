import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  postUser,
  putUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Kaikki /api/v1/users reitit
userRouter.route('/').get(getAllUsers).post(postUser);

// Kaikki /api/v1/users/:id reitit
userRouter.route('/:id').get(getUserById).delete(deleteUser).put(putUser);

export default userRouter;
