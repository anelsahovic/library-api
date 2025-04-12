import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { CreateReviewBody, UpdateReviewBody } from '../zodSchemas/schemas';

const prisma = new PrismaClient();

export async function getReviews() {
  return await prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });
}

export async function getReviewsByBook(bookId: number) {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) throw createHttpError(404, 'Book not found.');

  return await prisma.review.findMany({
    where: { bookId: bookId },
    include: {
      user: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });
}

export async function getReviewById(reviewId: number) {
  return await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      user: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });
}

export async function createReview(
  authUserId: number,
  review: CreateReviewBody
) {
  const book = await prisma.book.findUnique({
    where: {
      id: review.bookId,
    },
  });

  if (!book) throw createHttpError(404, 'Book does not exist.');

  return await prisma.review.create({
    data: {
      comment: review.comment,
      rating: review.rating,
      userId: authUserId,
      bookId: review.bookId,
    },
  });
}

export async function updateReview(
  authUserId: number,
  reviewIdToUpdate: number,
  updateData: UpdateReviewBody
) {
  const oldReview = await prisma.review.findUnique({
    where: {
      id: reviewIdToUpdate,
    },
  });

  if (!oldReview) throw createHttpError(404, 'Review not found.');
  if (oldReview.userId !== authUserId)
    throw createHttpError(401, "You can't update this review.");

  return await prisma.review.update({
    where: {
      id: reviewIdToUpdate,
    },
    data: {
      comment: updateData.comment,
      rating: updateData.rating,
      bookId: oldReview.bookId,
      userId: authUserId,
    },
  });
}

export async function deleteReview(
  authUserId: number,
  reviewIdToDelete: number
) {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewIdToDelete,
    },
  });

  if (!review) throw createHttpError(404, 'Review not found.');
  if (review.userId !== authUserId)
    throw createHttpError(401, "You can't delete this review.");

  try {
    return await prisma.review.delete({
      where: {
        id: reviewIdToDelete,
      },
    });
  } catch (error) {
    console.error(error);
    createHttpError(500, 'An error occurred while deleting the review.');
  }
}
