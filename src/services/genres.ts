import { PrismaClient } from '@prisma/client';
import { CreateGenreBody } from '../zodSchemas/schemas';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

export async function getGenres() {
  return await prisma.genre.findMany();
}

export async function getGenreById(genreId: number) {
  return await prisma.genre.findUnique({
    where: {
      id: genreId,
    },
  });
}

export async function createGenre(genre: CreateGenreBody) {
  const existingGenre = await prisma.genre.findUnique({
    where: {
      name: genre.name,
    },
  });

  if (existingGenre)
    throw createHttpError(400, 'Genre with that name already exists.');

  return await prisma.genre.create({
    data: {
      name: genre.name,
    },
  });
}

export async function updateGenre(genreId: number, newGenre: CreateGenreBody) {
  const existingGenre = await prisma.genre.findUnique({
    where: {
      id: genreId,
    },
  });

  if (!existingGenre) throw createHttpError(400, "Genre doesn't exist.");

  const genreWithSameName = await prisma.genre.findFirst({
    where: {
      name: newGenre.name,
      id: {
        not: genreId,
      },
    },
  });

  if (genreWithSameName)
    throw createHttpError(400, 'Genre with that name already exists.');

  return await prisma.genre.update({
    where: {
      id: genreId,
    },
    data: {
      name: newGenre.name,
    },
  });
}

export async function deleteGenre(genreId: number) {
  const existingGenre = await prisma.genre.findUnique({
    where: {
      id: genreId,
    },
  });

  if (!existingGenre) throw createHttpError(400, "Genre doesn't exist.");

  try {
    await prisma.genre.delete({
      where: {
        id: genreId,
      },
    });
  } catch (error) {
    console.error(error);
    createHttpError(500, 'An error occurred while deleting the genre.');
  }
}
