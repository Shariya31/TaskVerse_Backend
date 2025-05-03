import express from 'express';
import { login, register } from '../controllers/authControllers.js';
import { validate } from '../middleware/validate.js';
import { userSchema } from '../validators/userValidator.js';

const router = express.Router();

router.post('/register', validate(userSchema), register);
router.post('/login', login);

export default router;
