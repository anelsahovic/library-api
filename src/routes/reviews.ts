import express from 'express';
import * as ReviewsController from '../controllers/reviews';
import { validateData } from '../middlewares/validateData';
import { createReviewSchema, updateReviewSchema } from '../zodSchemas/schemas';

const router = express.Router();

router.get('/', ReviewsController.all);

router.get('/book/:bookId', ReviewsController.index);

router.get('/:reviewId', ReviewsController.show);

router.post('/', validateData(createReviewSchema), ReviewsController.store);

router.put(
  '/:reviewId',
  validateData(updateReviewSchema),
  ReviewsController.update
);

router.delete('/:reviewId', ReviewsController.destroy);

export default router;
