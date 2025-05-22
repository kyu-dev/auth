import express from 'express';
import { createPrompt, getPrompt } from '../controller/promptController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create', ensureAuthenticated, createPrompt);
router.get('/get', ensureAuthenticated, getPrompt);

export default router;
