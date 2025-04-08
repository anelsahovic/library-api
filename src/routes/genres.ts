import express from 'express';
import * as GenresController from '../controllers/genres';
import { validateData } from '../middlewares/validateData';
import { createGenreSchema, updateGenreSchema } from '../zodSchemas/schemas';

const router = express.Router();

router.get('/', GenresController.index);

router.get('/:genreId', GenresController.show);

router.post('/', validateData(createGenreSchema), GenresController.store);

router.put(
  '/:genreId',
  validateData(updateGenreSchema),
  GenresController.update
);

router.delete('/:genreId', GenresController.destroy);

export default router;
