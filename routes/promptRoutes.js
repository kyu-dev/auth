import express from 'express';
import { createPrompt } from '../controller/promptController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/creat', ensureAuthenticated, createPrompt);

export default router;
