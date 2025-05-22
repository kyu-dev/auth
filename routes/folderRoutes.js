import express from 'express';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import { createFolder } from '../controller/folderController.js';

const router = express.Router();

router.post('/create', ensureAuthenticated, createFolder);

export default router;
