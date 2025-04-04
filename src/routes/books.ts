import express from 'express';
import * as BooksController from '../controllers/books';

const router = express.Router();

router.get('/', BooksController.getBooks);

export default router;
