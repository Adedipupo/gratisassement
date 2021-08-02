const express = require('express');
const blogRoutes = require('./blog.js');

const router = express.Router();


router.use('/blog', blogRoutes)

module.exports =  router ;