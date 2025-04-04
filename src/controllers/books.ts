import { RequestHandler } from 'express';

export const getBooks: RequestHandler = (req, res, next) => {
  console.log('Get Books Route');
  res.send('Get Books Route');
};
