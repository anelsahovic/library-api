import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { CreateBookBody, UpdateBookBody } from '../zodSchemas/schemas';

const prisma = new PrismaClient();

export async function getBooks() {
  return await prisma.book.findMany();
}

export async function getBookById(bookId: number) {
  return await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });
}

export async function createBook(book: CreateBookBody) {
  const existingAuthor = await prisma.author.findUnique({
    where: {
      id: book.authorId,
    },
  });

  if (!existingAuthor) throw createHttpError(404, "Author doesn't exist.");

  const existingGenre = await prisma.genre.findUnique({
    where: {
      id: book.genreId,
    },
  });

  if (!existingGenre) throw createHttpError(404, "Genre doesn't exist.");

  const existingPublisher = await prisma.publisher.findUnique({
    where: {
      id: book.publisherId,
    },
  });

  if (!existingPublisher)
    throw createHttpError(404, "Publisher doesn't exist.");

  return await prisma.book.create({
    data: {
      name: book.name,
      description: book.description,
      authorId: book.authorId,
      genreId: book.genreId,
      publisherId: book.publisherId,
    },
  });
}

export async function updateBook(bookId: number, bookUpdate: UpdateBookBody) {
  const bookToUpdate = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });
  if (!bookToUpdate) throw createHttpError(404, "Book doesn't exist.");

  const existingAuthor = await prisma.author.findUnique({
    where: {
      id: bookUpdate.authorId,
    },
  });

  if (!existingAuthor) throw createHttpError(404, "Author doesn't exist.");

  const existingGenre = await prisma.genre.findUnique({
    where: {
      id: bookUpdate.genreId,
    },
  });

  if (!existingGenre) throw createHttpError(404, "Genre doesn't exist.");

  const existingPublisher = await prisma.publisher.findUnique({
    where: {
      id: bookUpdate.publisherId,
    },
  });

  if (!existingPublisher)
    throw createHttpError(404, "Publisher doesn't exist.");

  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      name: bookUpdate.name,
      description: bookUpdate.description,
      authorId: bookUpdate.authorId,
      genreId: bookUpdate.genreId,
      publisherId: bookUpdate.publisherId,
    },
  });
}

export async function deleteBook(bookId: number) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw createHttpError(404, "Book doesn't exist.");
    }

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, 'An error occurred while deleting the book.');
  }
}
