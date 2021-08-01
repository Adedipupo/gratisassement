import express from 'express';
import { createBlog,getAllBlogPost, getAllPosts } from '../controllers/blog.js';

const router = express.Router();

router.post('/create', createBlog)
router.get('/allposts', getAllBlogPost)
router.get('/posts', getAllPosts)

export default router;