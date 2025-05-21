import express from 'express';
import { createPrompt } from '../controller/promptController.js';

const router = express.Router();

router.post('/creat', createPrompt);

export default router;
