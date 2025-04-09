import { RequestHandler } from 'express';
import { LoginUserBody, RegisterUserBody } from '../zodSchemas/schemas';
import { getUserFromDb, loginUser, registerUser } from '../services/auth';
import createHttpError from 'http-errors';

export const getAuthUser: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;

  try {
    if (!authUserId) throw createHttpError(401, 'User not authenticated.');

    const user = await getUserFromDb(authUserId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterUserBody,
  unknown
> = async (req, res, next) => {
  const { name, username, email, password } = req.body;
  try {
    const newUser = await registerUser({ name, username, email, password });

    req.session.userId = newUser.id;

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginUserBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username) throw createHttpError(400, 'Username is required.');
    if (!password) throw createHttpError(400, 'Password is required.');

    const user = await loginUser({ username, password });

    req.session.userId = user.id;
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
