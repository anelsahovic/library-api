import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '../services/books';
import { DeleteBookParams, ShowBookParams, UpdateBookParams } from '../types';
import { CreateBookBody, UpdateBookBody } from '../zodSchemas/schemas';

export const index: RequestHandler = async (req, res, next) => {
  try {
    const books = await getBooks();

    if (!books) throw createHttpError(404, 'No books found.');

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const show: RequestHandler<
  ShowBookParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const bookId = parseInt(req.params.bookId);
  try {
    if (isNaN(bookId)) throw createHttpError(400, 'Invalid Book ID.');

    const foundBook = await getBookById(bookId);

    if (!foundBook) throw createHttpError(404, 'Book not found.');

    res.status(200).json(foundBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const store: RequestHandler<
  unknown,
  unknown,
  CreateBookBody,
  unknown
> = async (req, res, next) => {
  const { name, description, authorId, genreId, publisherId } = req.body;

  try {
    // if (!name || !authorId || !genreId || !publisherId)
    //   throw createHttpError(400, 'Please fill out all the required fields.'); <- this validation is done by zod already

    const book = { name, description, authorId, genreId, publisherId };
    const newBook = await createBook(book);

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const update: RequestHandler<
  UpdateBookParams,
  unknown,
  UpdateBookBody,
  unknown
> = async (req, res, next) => {
  const bookIdToUpdate = parseInt(req.params.bookId);
  const { name, description, authorId, genreId, publisherId } = req.body;

  try {
    // if (!name || !authorId || !genreId || !publisherId)
    //   throw createHttpError(400, 'Please fill out all the required fields.'); <- this validation is done by zod already

    if (!bookIdToUpdate)
      throw createHttpError(404, 'Please provide book to update.');

    if (isNaN(bookIdToUpdate)) {
      throw createHttpError(400, 'Invalid book ID provided.');
    }

    const newBookData = { name, description, authorId, genreId, publisherId };
    const updatedBook = await updateBook(bookIdToUpdate, newBookData);

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);

    next(error);
  }
};

export const destroy: RequestHandler<
  DeleteBookParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const bookIdToDelete = parseInt(req.params.bookId);

  try {
    if (!bookIdToDelete)
      throw createHttpError(404, 'Please provide book to delete.');

    if (isNaN(bookIdToDelete)) {
      throw createHttpError(400, 'Invalid book ID provided.');
    }

    await deleteBook(bookIdToDelete);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);

    next(error);
  }
};
