import asyncHandler from "express-async-handler";
import BlogModel from "../models/blog.js";

export const createBlog = asyncHandler(async (req, res) => {
    const { title, body, comments } = req.body;
  

  const titleExists = await BlogModel.findOne({ title });

  if (titleExists) {
    res.status(400);
    throw new Error("Title already exists");
  }

    const blog = await BlogModel.create({
      title,
      body,
      comments,
    });
    if (blog) {
      res.status(200).json({
        _id: blog._id,
        title: blog.title,
        body: blog.body,
        comments: blog.comments,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  });