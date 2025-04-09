import { PrismaClient } from '@prisma/client';
import { CreatePublisherBody } from '../zodSchemas/schemas';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

export async function getPublishers() {
  return await prisma.publisher.findMany();
}

export async function getPublisherById(publisherId: number) {
  return await prisma.publisher.findUnique({
    where: {
      id: publisherId,
    },
  });
}

export async function createPublisher(publisher: CreatePublisherBody) {
  const existingPublisher = await prisma.publisher.findUnique({
    where: {
      name: publisher.name,
    },
  });

  if (existingPublisher)
    throw createHttpError(400, 'Publisher with that name already exists.');

  return await prisma.publisher.create({
    data: {
      name: publisher.name,
    },
  });
}

export async function updatePublisher(
  publisherId: number,
  newPublisher: CreatePublisherBody
) {
  const existingPublisher = await prisma.publisher.findUnique({
    where: {
      id: publisherId,
    },
  });

  if (!existingPublisher)
    throw createHttpError(400, "Publisher doesn't exist.");

  const publisherWithSameName = await prisma.publisher.findFirst({
    where: {
      name: newPublisher.name,
      id: {
        not: publisherId,
      },
    },
  });

  if (publisherWithSameName)
    throw createHttpError(400, 'Publisher with that name already exists.');

  return await prisma.publisher.update({
    where: {
      id: publisherId,
    },
    data: {
      name: newPublisher.name,
    },
  });
}

export async function deletePublisher(publisherId: number) {
  const existingPublisher = await prisma.publisher.findUnique({
    where: {
      id: publisherId,
    },
  });

  if (!existingPublisher)
    throw createHttpError(400, "Publisher doesn't exist.");

  try {
    await prisma.publisher.delete({
      where: {
        id: publisherId,
      },
    });
  } catch (error) {
    console.error(error);
    createHttpError(500, 'An error occurred while deleting the publisher.');
  }
}
