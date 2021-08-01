import express from 'express';
import { createBlog } from '../controllers/blog.js';

const router = express.Router();

router.get('/create', createBlog)

export default router;