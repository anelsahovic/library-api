import { PrismaClient } from '@prisma/client';
import { CreateAuthorBody, UpdateAuthorBody } from '../zodSchemas/schemas';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

export async function getAuthors() {
  return await prisma.author.findMany();
}

export async function getAuthorById(authorId: number) {
  return await prisma.author.findUnique({
    where: {
      id: authorId,
    },
  });
}

export async function createAuthor(author: CreateAuthorBody) {
  const existingAuthor = await prisma.author.findUnique({
    where: {
      name: author.name,
    },
  });

  if (existingAuthor)
    throw createHttpError(400, 'Author with that name already exists.');

  return await prisma.author.create({
    data: {
      name: author.name,
      bio: author.bio,
    },
  });
}

export async function updateAuthor(
  authorIdToUpdate: number,
  newAuthor: UpdateAuthorBody
) {
  const existingAuthor = await prisma.author.findUnique({
    where: {
      id: authorIdToUpdate,
    },
  });

  if (!existingAuthor) throw createHttpError(404, "Author doesn't exist.");

  return prisma.author.update({
    where: {
      id: authorIdToUpdate,
    },
    data: {
      name: newAuthor.name,
      bio: newAuthor.bio,
    },
  });
}

export async function deleteAuthor(authorId: number) {
  const existingAuthor = await prisma.author.findUnique({
    where: {
      id: authorId,
    },
  });

  if (!existingAuthor) throw createHttpError(404, "Author doesn't exist.");

  try {
    await prisma.author.delete({
      where: {
        id: authorId,
      },
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, 'An error occurred while deleting the author.');
  }
}
