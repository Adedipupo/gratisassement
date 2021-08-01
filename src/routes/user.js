const express = require('express');

const router = express.Router();

router.get('/allUsers', getAllUsers)

export default router;