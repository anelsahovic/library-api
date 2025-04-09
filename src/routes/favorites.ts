import express from 'express';
import * as FavoritesController from '../controllers/favorites';

const router = express.Router();

router.get('/', FavoritesController.index);

router.post('/', FavoritesController.store);

router.delete('/:bookId', FavoritesController.destroy);

export default router;
