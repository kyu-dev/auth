import ensureAuthenticated from '../middleware/authMiddleware.js';
import express from 'express';
import {
  createFolder,
  getFolder,
  editFolder,
  deleteFolder,
} from '../controller/folderController.js';

const router = express.Router();

router.post('/create', ensureAuthenticated, createFolder);
router.get('/get', ensureAuthenticated, getFolder);
router.put('/edit', ensureAuthenticated, editFolder);
router.delete('/delete', ensureAuthenticated, deleteFolder);
export default router;
