import asyncHandler from "express-async-handler";
import BlogModel from "../models/blog.js";

export const createBlog = asyncHandler(async (req, res) => {
    const { title, body, comments } = req.body;
  
    const blog = await BlogModel.create({
      title,
      body,
      comments,
    });
    if (blog) {
      res.status(200).json({
        _id: blog._id,
        body: blog.body,
        comments: blog.comments,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  });