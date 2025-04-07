import { RequestHandler } from 'express';
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from '../services/authors';
import createHttpError from 'http-errors';
import {
  DeleteAuthorParams,
  ShowAuthorParams,
  UpdateAuthorParams,
} from '../types';
import { CreateAuthorBody, UpdateAuthorBody } from '../zodSchemas/schemas';

export const index: RequestHandler = async (req, res, next) => {
  try {
    const authors = await getAuthors();

    if (!authors) throw createHttpError(404, 'No authors found.');

    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const show: RequestHandler<
  ShowAuthorParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authorId = parseInt(req.params.authorId);
  try {
    if (isNaN(authorId)) throw createHttpError(400, 'Invalid Author ID.');

    const author = await getAuthorById(authorId);

    if (!author) throw createHttpError(404, 'Author not found.');

    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const store: RequestHandler<
  unknown,
  unknown,
  CreateAuthorBody,
  unknown
> = async (req, res, next) => {
  const { name, bio } = req.body;
  try {
    // if (!name) throw createHttpError(400, 'Author name is required.');  <- this validation is done by zod already

    const newAuthor = await createAuthor({ name, bio });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const update: RequestHandler<
  UpdateAuthorParams,
  unknown,
  UpdateAuthorBody,
  unknown
> = async (req, res, next) => {
  const authorId = parseInt(req.params.authorId);
  const { name, bio } = req.body;
  try {
    if (!authorId)
      throw createHttpError(404, 'Please provide author to update.');

    if (isNaN(authorId)) throw createHttpError(400, 'Invalid author ID.');

    const updatedAuthor = await updateAuthor(authorId, { name, bio });

    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const destroy: RequestHandler<
  DeleteAuthorParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authorId = parseInt(req.params.authorId);

  try {
    if (!authorId)
      throw createHttpError(400, 'Please provide author to delete');

    if (isNaN(authorId)) throw createHttpError(400, 'Invalid author ID.');

    await deleteAuthor(authorId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
