import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const authRouter = express.Router();

authRouter
  .route('/login')
  .post(
    body('username').trim().notEmpty(),
    body('password').notEmpty(),
    validationErrors,
    postLogin
  );
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
