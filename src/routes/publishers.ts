import express from 'express';
import * as PublishersController from '../controllers/publishers';
import { validateData } from '../middlewares/validateData';
import {
  createPublisherSchema,
  updatePublisherSchema,
} from '../zodSchemas/schemas';

const router = express.Router();

router.get('/', PublishersController.index);

router.get('/:publisherId', PublishersController.show);

router.post(
  '/',
  validateData(createPublisherSchema),
  PublishersController.store
);

router.put(
  '/:publisherId',
  validateData(updatePublisherSchema),
  PublishersController.update
);

router.delete('/:publisherId', PublishersController.destroy);

export default router;
