import express from 'express';
import { createBlog,deletePost,getABlogPost,getAllBlogPost, getAllPosts, updateAPost } from '../controllers/blog.js';

const router = express.Router();

router.post('/create', createBlog)
router.get('/allposts', getAllBlogPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getABlogPost)
router.delete('/delete/:id', deletePost)
router.patch('/edit/:id', updateAPost)

export default router;