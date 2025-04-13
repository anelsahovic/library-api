import express from 'express';
import { validateData } from '../middlewares/validateData';
import { loginUserSchema, registerUserSchema } from '../zodSchemas/schemas';
import * as AuthController from '../controllers/auth';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', requireAuth, AuthController.getAuthUser);

router.post(
  '/register',
  validateData(registerUserSchema),
  AuthController.register
);

router.post('/login', validateData(loginUserSchema), AuthController.login);

router.post('/logout', AuthController.logout);

export default router;
