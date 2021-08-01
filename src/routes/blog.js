import express from 'express';
import { commentOnPost, createBlog, deletePost, getABlogPost, getAllBlogPost, getAllComments, getAllPosts, updateAPost, updateComment } from '../controllers/blog.js';

const router = express.Router();

router.post('/create', createBlog)
router.get('/allposts', getAllBlogPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getABlogPost)
router.delete('/delete/:id', deletePost)
router.patch('/edit/:id', updateAPost)
router.put('/comment/:id', commentOnPost)
router.put('/post/:id/comment/:id', updateComment)
router.get('/post/:id/allcomments', getAllComments)

export default router;