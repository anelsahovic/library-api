import { RequestHandler } from 'express';
import {
  createPublisher,
  deletePublisher,
  getPublisherById,
  getPublishers,
  updatePublisher,
} from '../services/publishers';
import createHttpError from 'http-errors';
import {
  DeletePublisherParams,
  ShowPublisherParams,
  UpdatePublisherParams,
} from '../types';
import {
  CreatePublisherBody,
  UpdatePublisherBody,
} from '../zodSchemas/schemas';

export const index: RequestHandler = async (req, res, next) => {
  try {
    const publishers = await getPublishers();

    if (!publishers) throw createHttpError(404, 'No publishers found.');

    res.status(200).json(publishers);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const show: RequestHandler<
  ShowPublisherParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const publisherId = parseInt(req.params.publisherId);

  try {
    if (isNaN(publisherId)) throw createHttpError(400, 'Invalid publisher ID.');

    const publisher = await getPublisherById(publisherId);

    if (!publisher) throw createHttpError(404, 'No publisher found.');

    res.status(200).json(publisher);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const store: RequestHandler<
  unknown,
  unknown,
  CreatePublisherBody,
  unknown
> = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newPublisher = await createPublisher({ name });

    res.status(201).json(newPublisher);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const update: RequestHandler<
  UpdatePublisherParams,
  unknown,
  UpdatePublisherBody,
  unknown
> = async (req, res, next) => {
  const publisherId = parseInt(req.params.publisherId);
  const { name } = req.body;
  try {
    if (!publisherId)
      throw createHttpError(404, 'Please provide publisher to update.');

    if (isNaN(publisherId)) throw createHttpError(400, 'Invalid publisher ID.');

    const updatedPublisher = await updatePublisher(publisherId, { name });

    res.status(200).json(updatedPublisher);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const destroy: RequestHandler<
  DeletePublisherParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const publisherId = parseInt(req.params.publisherId);
  try {
    if (!publisherId)
      throw createHttpError(404, 'Please provide publisher to update.');

    if (isNaN(publisherId)) throw createHttpError(400, 'Invalid publisher ID.');

    await deletePublisher(publisherId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
