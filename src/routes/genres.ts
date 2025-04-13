import express, { RequestHandler } from 'express';
import * as GenresController from '../controllers/genres';
import { validateData } from '../middlewares/validateData';
import { createGenreSchema, updateGenreSchema } from '../zodSchemas/schemas';
import { requireAdmin } from '../middlewares/auth';
import { DeleteGenreParams, UpdateGenreParams } from '../types';

const router = express.Router();

router.get('/', GenresController.index);

router.get('/:genreId', GenresController.show);

router.post(
  '/',
  requireAdmin,
  validateData(createGenreSchema),
  GenresController.store
);

router.put(
  '/:genreId',
  requireAdmin as unknown as RequestHandler<UpdateGenreParams>,
  validateData(updateGenreSchema),
  GenresController.update
);

router.delete(
  '/:genreId',
  requireAdmin as unknown as RequestHandler<DeleteGenreParams>,
  GenresController.destroy
);

export default router;
