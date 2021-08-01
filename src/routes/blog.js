import express from 'express';

const router = express.Router();

router.get('/allUsers', getAllUsers)

export default router;