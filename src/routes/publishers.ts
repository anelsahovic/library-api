import express, { RequestHandler } from 'express';
import * as PublishersController from '../controllers/publishers';
import { validateData } from '../middlewares/validateData';
import {
  createPublisherSchema,
  updatePublisherSchema,
} from '../zodSchemas/schemas';
import { requireAdmin } from '../middlewares/auth';
import { DeletePublisherParams, UpdatePublisherParams } from '../types';

const router = express.Router();

router.get('/', PublishersController.index);

router.get('/:publisherId', PublishersController.show);

router.post(
  '/',
  requireAdmin,
  validateData(createPublisherSchema),
  PublishersController.store
);

router.put(
  '/:publisherId',
  requireAdmin as unknown as RequestHandler<UpdatePublisherParams>,
  validateData(updatePublisherSchema),
  PublishersController.update
);

router.delete(
  '/:publisherId',
  requireAdmin as unknown as RequestHandler<DeletePublisherParams>,
  PublishersController.destroy
);

export default router;
