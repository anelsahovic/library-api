import express from 'express';
import * as BooksController from '../controllers/books';
import { validateData } from '../middlewares/validateData';
import { createBookSchema, updateBookSchema } from '../zodSchemas/schemas';

const router = express.Router();

router.get('/', BooksController.index);

router.get('/:bookId', BooksController.show);

router.post('/', validateData(createBookSchema), BooksController.store);

router.put('/:bookId', validateData(updateBookSchema), BooksController.update);

router.delete('/:bookId', BooksController.destroy);

export default router;
