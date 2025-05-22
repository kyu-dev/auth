import express from 'express';
import {
  createPrompt,
  getPrompt,
  editPrompt,
  deletePrompt,
} from '../controller/promptController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create', ensureAuthenticated, createPrompt);
router.get('/get', ensureAuthenticated, getPrompt);
router.put('/edit', ensureAuthenticated, editPrompt);
router.delete('/delete', ensureAuthenticated, deletePrompt);

export default router;
