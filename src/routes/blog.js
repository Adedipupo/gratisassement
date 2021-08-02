import express from 'express';
import { commentOnPost, createBlog, deleteComment, deletePost, getABlogPost, getAComment, getAllBlogPost, getAllComments, getAllPosts, updateAPost, updateComment } from '../controllers/blog.js';

const router = express.Router();

router.post('/create', createBlog)
router.get('/allposts', getAllBlogPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getABlogPost)
router.delete('/delete/:id', deletePost)
router.patch('/edit/:id', updateAPost)
router.put('/comment/:id', commentOnPost)
router.put('/post/comment/:id', updateComment)
router.get('/post/:id/allcomments', getAllComments)
router.get('/post/comment/:id', getAComment)
router.delete('/post/comment/:id', deleteComment)

export default router;