import express from 'express';
import { createBlog,getAllBlogPost } from '../controllers/blog.js';

const router = express.Router();

router.post('/create', createBlog)
router.get('/allposts', getAllBlogPost)

export default router;