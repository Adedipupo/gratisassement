import express from 'express';
import { createBlog,getABlogPost,getAllBlogPost, getAllPosts } from '../controllers/blog.js';

const router = express.Router();

router.post('/create', createBlog)
router.get('/allposts', getAllBlogPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getABlogPost)

export default router;