import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import {
  addBookToFavorites,
  getFavorites,
  removeBookFromFavorites,
} from '../services/favorites';
import { CreateFavoriteBody, DeleteFavoriteParams } from '../types';

export const index: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;

  try {
    const favorites = await getFavorites(authUserId!);

    if (!favorites) throw createHttpError(404, 'No favorites found.');

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const store: RequestHandler<
  unknown,
  unknown,
  CreateFavoriteBody,
  unknown
> = async (req, res, next) => {
  const authUserId = req.session.userId;
  const { bookId } = req.body;

  try {
    if (!bookId) throw createHttpError(400, 'No book selected.');

    const newFavoriteBook = await addBookToFavorites(authUserId!, bookId);

    res.status(201).json(newFavoriteBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const destroy: RequestHandler<
  DeleteFavoriteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authUserId = req.session.userId;
  const bookId = parseInt(req.params.bookId);

  try {
    if (!bookId) throw createHttpError(400, 'No book selected.');

    await removeBookFromFavorites(authUserId!, bookId);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
