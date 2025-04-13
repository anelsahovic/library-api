import express, { RequestHandler } from 'express';
import * as AuthorsController from '../controllers/authors';
import { validateData } from '../middlewares/validateData';
import { createAuthorSchema, updateAuthorSchema } from '../zodSchemas/schemas';
import { DeleteAuthorParams, UpdateAuthorParams } from '../types';
import { requireAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', AuthorsController.index);

router.get('/:authorId', AuthorsController.show);

router.post(
  '/',
  requireAdmin,
  validateData(createAuthorSchema),
  AuthorsController.store
);

router.put(
  '/:authorId',
  requireAdmin as unknown as RequestHandler<UpdateAuthorParams>,
  validateData(updateAuthorSchema),
  AuthorsController.update
);

router.delete(
  '/:authorId',
  requireAdmin as unknown as RequestHandler<DeleteAuthorParams>,
  AuthorsController.destroy
);

export default router;
