import express from 'express';
import {
  deleteCat,
  getAllCats,
  getCatById,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';

import {createThumbnail, upload} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

// Kaikki /api/v1/cats reitit
catRouter
  .route('/')
  .get(authenticateToken, getAllCats)
  .post(
    authenticateToken,
    upload.single('image'),
    body('cat_name').trim().notEmpty().isLength({min: 2, max: 90}),
    body('weight').isFloat({gt: 0}),
    body('birthdate').isDate(),
    validationErrors,
    createThumbnail,
    postCat
  );
// Kaikki /api/v1/cats/:id reitit
catRouter
  .route('/:id')
  .get(param('id').isNumeric(), validationErrors, getCatById)
  .delete(
    authenticateToken,
    param('id').isNumeric(),
    validationErrors,
    deleteCat
  )
  .put(
    authenticateToken,
    param('id').isNumeric(),
    body('cat_name').optional().trim().notEmpty().isLength({min: 2, max: 90}),
    body('weight').optional().isFloat({gt: 0}),
    body('birthdate').optional().isDate(),
    validationErrors,
    putCat
  );

export default catRouter;
