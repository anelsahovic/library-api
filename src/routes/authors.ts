import express from 'express';
import * as AuthorsController from '../controllers/authors';
import { validateData } from '../middlewares/validateData';
import { createAuthorSchema, updateAuthorSchema } from '../zodSchemas/schemas';

const router = express.Router();

router.get('/', AuthorsController.index);

router.get('/:authorId', AuthorsController.show);

router.post('/', validateData(createAuthorSchema), AuthorsController.store);

router.put(
  '/:authorId',
  validateData(updateAuthorSchema),
  AuthorsController.update
);

router.delete('/:authorId', AuthorsController.destroy);

export default router;
