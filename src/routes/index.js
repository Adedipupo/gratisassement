import express from 'express';
import blogRoutes from './blog.js';

const router = express.Router();


router.use('/blog', blogRoutes)

export default router ;