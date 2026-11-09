import express from 'express';
import {
  deleteCat,
  getAllCats,
  getCatById,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';

// multer and sharp imports
import multer from 'multer';
import {createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

// Kaikki /api/v1/cats reitit
catRouter
  .route('/')
  .get(authenticateToken, getAllCats)
  .post(authenticateToken, upload.single('image'), createThumbnail, postCat);
// Kaikki /api/v1/cats/:id reitit
catRouter
  .route('/:id')
  .get(getCatById)
  .delete(authenticateToken, deleteCat)
  .put(authenticateToken, putCat);

export default catRouter;
