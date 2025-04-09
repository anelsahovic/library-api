import express from 'express';
import { validateData } from '../middlewares/validateData';
import { loginUserSchema, registerUserSchema } from '../zodSchemas/schemas';
import * as AuthController from '../controllers/auth';

const router = express.Router();

router.get('/', AuthController.getAuthUser);

router.post(
  '/register',
  validateData(registerUserSchema),
  AuthController.register
);

router.post('/login', validateData(loginUserSchema), AuthController.login);

router.post('/logout', AuthController.logout);

export default router;
