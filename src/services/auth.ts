import { PrismaClient } from '@prisma/client';
import { LoginUserBody, RegisterUserBody } from '../zodSchemas/schemas';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getUserFromDb(authUserId: number) {
  return await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: {
      id: authUserId,
    },
  });
}

export async function registerUser(user: RegisterUserBody) {
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (existingEmail)
    throw createHttpError(
      409,
      'That email is already in use. Please log in instead.'
    );

  const existingUsername = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });
  if (existingUsername)
    throw createHttpError(
      409,
      'User with that username already exists. Please choose another one.'
    );

  const hashedPassword = await bcrypt.hash(user.password, 10);

  return await prisma.user.create({
    omit: {
      password: true,
    },
    data: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: hashedPassword,
    },
  });
}

export async function loginUser(user: LoginUserBody) {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });
  if (!existingUser)
    throw createHttpError(401, "User with that username doesn't exist.");

  const passwordMatch = await bcrypt.compare(
    user.password!,
    existingUser.password
  );

  if (!passwordMatch) throw createHttpError(401, 'Invalid password.');

  return existingUser;
}
