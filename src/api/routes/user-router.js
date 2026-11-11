import express from 'express';
import {postUser, removeUser, putUser} from '../controllers/user-controller.js';
import {getCatsByUserId} from '../controllers/cat-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .post(
    body('name').trim().notEmpty().isLength({min: 3, max: 200}),
    body('username')
      .trim()
      .notEmpty()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('required')
      .isEmail()
      .withMessage('must be valid email address'),
    body('password')
      .notEmpty()
      .withMessage('required')
      .isLength({min: 8})
      .withMessage('password must be at least 8 characters'),
    validationErrors,
    postUser
  );
userRouter
  .route('/:id')
  .delete(
    authenticateToken,
    param('id').isNumeric(),
    validationErrors,
    removeUser
  );
userRouter
  .route('/:id/cats')
  .get(
    authenticateToken,
    param('id').isNumeric(),
    validationErrors,
    getCatsByUserId
  );
userRouter
  .route('/:id')
  .put(
    authenticateToken,
    param('id').isNumeric(),
    body('name').optional().trim().notEmpty().isLength({min: 3, max: 200}),
    body('username')
      .optional()
      .trim()
      .notEmpty()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('email').optional().trim().notEmpty().isEmail(),
    body('password').optional().notEmpty().isLength({min: 8}),
    validationErrors,
    putUser
  );

export default userRouter;
