import { RequestHandler } from 'express';
import {
  DeleteReviewParams,
  GetReviewsParams,
  ShowReviewParams,
  UpdateReviewParams,
} from '../types';
import createHttpError from 'http-errors';
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  getReviewsByBook,
  updateReview,
} from '../services/reviews';
import { CreateReviewBody, UpdateReviewBody } from '../zodSchemas/schemas';

export const all: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await getReviews();

    if (!reviews || reviews.length === 0)
      throw createHttpError(404, 'No reviews found.');

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const index: RequestHandler<
  GetReviewsParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const bookId = parseInt(req.params.bookId);
  try {
    if (!bookId) throw createHttpError(400, 'Please provide book ID.');

    const reviews = await getReviewsByBook(bookId);

    if (!reviews || reviews.length === 0)
      throw createHttpError(404, 'No reviews found.');

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const show: RequestHandler<
  ShowReviewParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const reviewId = parseInt(req.params.reviewId);
  try {
    if (!reviewId) throw createHttpError(400, 'Please provide review ID.');

    const review = await getReviewById(reviewId);
    console.log(review);

    if (!review) throw createHttpError(404, 'Review not found.');

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const store: RequestHandler<
  unknown,
  unknown,
  CreateReviewBody,
  unknown
> = async (req, res, next) => {
  const authUserId = req.session.userId;

  const { comment, rating, bookId } = req.body;
  try {
    if (!authUserId) throw createHttpError(401, 'Not authenticated.');

    const review = await createReview(authUserId, {
      comment,
      rating,
      bookId,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const update: RequestHandler<
  UpdateReviewParams,
  unknown,
  UpdateReviewBody,
  unknown
> = async (req, res, next) => {
  const authUserId = req.session.userId;
  const reviewIdToUpdate = parseInt(req.params.reviewId);
  const { comment, rating } = req.body;

  try {
    if (!authUserId) throw createHttpError(401, 'Not authenticated.');

    if (!reviewIdToUpdate)
      throw createHttpError(400, 'Please provide review to be updated');

    const updatedReview = await updateReview(authUserId, reviewIdToUpdate, {
      comment,
      rating,
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const destroy: RequestHandler<
  DeleteReviewParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authUserId = req.session.userId;
  const reviewIdToDelete = parseInt(req.params.reviewId);

  try {
    if (!authUserId) throw createHttpError(401, 'Not authenticated.');

    if (!reviewIdToDelete)
      throw createHttpError(400, 'Please provide review to be updated');

    await deleteReview(authUserId, reviewIdToDelete);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
