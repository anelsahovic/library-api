import express, { RequestHandler } from 'express';
import * as BooksController from '../controllers/books';
import { validateData } from '../middlewares/validateData';
import { createBookSchema, updateBookSchema } from '../zodSchemas/schemas';
import { requireAdmin } from '../middlewares/auth';
import { DeleteBookParams, UpdateBookParams } from '../types';

const router = express.Router();

router.get('/', BooksController.index);

router.get('/:bookId', BooksController.show);

router.post(
  '/',
  requireAdmin,
  validateData(createBookSchema),
  BooksController.store
);

router.put(
  '/:bookId',
  requireAdmin as unknown as RequestHandler<UpdateBookParams>,
  validateData(updateBookSchema),
  BooksController.update
);

router.delete(
  '/:bookId',
  requireAdmin as unknown as RequestHandler<DeleteBookParams>,
  BooksController.destroy
);

export default router;
