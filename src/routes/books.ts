import express from 'express';
import * as BooksController from '../controllers/books';

const router = express.Router();

router.get('/', BooksController.index);

router.get('/:bookId', BooksController.show);

router.post('/', BooksController.store);

router.put('/:bookId', BooksController.update);

router.delete('/:bookId', BooksController.destroy);

export default router;
