import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

export async function getFavorites(userId: number) {
  return prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    include: {
      book: {
        select: {
          name: true,
          description: true,
          author: {
            select: {
              name: true,
              bio: true,
            },
          },
          genre: {
            select: {
              name: true,
            },
          },
          publisher: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function addBookToFavorites(userId: number, bookId: number) {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) throw createHttpError(404, 'User not found.');

  const existingBook = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (!existingBook) throw createHttpError(404, 'Book not found.');

  const bookInFavorites = await prisma.favorite.findFirst({
    where: {
      bookId: bookId,
      userId: userId,
    },
  });

  if (bookInFavorites) throw createHttpError(400, 'Book already in favorites.');

  return await prisma.favorite.create({
    data: {
      userId: userId,
      bookId: bookId,
    },
  });
}

export async function removeBookFromFavorites(userId: number, bookId: number) {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) throw createHttpError(404, 'User not found.');

  const existingBook = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (!existingBook) throw createHttpError(404, 'Book not found.');

  const bookInFavorites = await prisma.favorite.findFirst({
    where: {
      bookId: bookId,
      userId: userId,
    },
  });

  if (!bookInFavorites) throw createHttpError(400, 'Book not in favorites.');

  try {
    await prisma.favorite.delete({
      where: {
        id: bookInFavorites.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, 'An error occurred while deleting the author.');
  }
}
