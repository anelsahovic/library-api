import { RequestHandler } from 'express';
import {
  createGenre,
  deleteGenre,
  getGenreById,
  getGenres,
  updateGenre,
} from '../services/genres';
import createHttpError from 'http-errors';
import {
  DeleteGenreParams,
  ShowGenreParams,
  UpdateGenreParams,
} from '../types';
import { CreateGenreBody, UpdateGenreBody } from '../zodSchemas/schemas';

export const index: RequestHandler = async (req, res, next) => {
  try {
    const genres = await getGenres();

    if (!genres) throw createHttpError(404, 'No genres found.');

    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const show: RequestHandler<
  ShowGenreParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const genreId = parseInt(req.params.genreId);

  try {
    if (isNaN(genreId)) throw createHttpError(400, 'Invalid genre ID.');

    const genre = await getGenreById(genreId);

    if (!genre) throw createHttpError(404, 'No genre found.');

    res.status(200).json(genre);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const store: RequestHandler<
  unknown,
  unknown,
  CreateGenreBody,
  unknown
> = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newGenre = await createGenre({ name });

    res.status(201).json(newGenre);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const update: RequestHandler<
  UpdateGenreParams,
  unknown,
  UpdateGenreBody,
  unknown
> = async (req, res, next) => {
  const genreId = parseInt(req.params.genreId);
  const { name } = req.body;
  try {
    if (!genreId) throw createHttpError(404, 'Please provide genre to update.');

    if (isNaN(genreId)) throw createHttpError(400, 'Invalid genre ID.');

    const updatedGenre = await updateGenre(genreId, { name });

    res.status(200).json(updatedGenre);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const destroy: RequestHandler<
  DeleteGenreParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const genreId = parseInt(req.params.genreId);
  try {
    if (!genreId) throw createHttpError(404, 'Please provide genre to update.');

    if (isNaN(genreId)) throw createHttpError(400, 'Invalid genre ID.');

    await deleteGenre(genreId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
