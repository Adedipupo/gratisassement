import asyncHandler from "express-async-handler";
import BlogModel from "../models/blog.js";

export const createBlog = asyncHandler(async (req, res) => {
   try {
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
   } catch (error) {
     return res.status(400).json({message: error.message})
   }
  });

  export const getAllBlogPost = asyncHandler(async(req,res)=>{
    try {
      const posts = await BlogModel.find();

      if(posts){
        return res.status(200).json({message: 'Success',posts: posts});
      }else{
        return res.status(400).json({message: 'No Posts found'})

      }
  
    } catch (error) {
      return res.status(400).json({message: error.message})

    }
  })

  export const getABlogPost = asyncHandler(async(req,res)=>{
    try {
      const {id} = req.params;
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.failServerError("Invalid post Id");
      }
      const post = await BlogModel.findById(id);

      if(post){
        return res.status(200).json({message: 'Success',post: post});
      }else{
        return res.status(400).json({message: 'Post not found'})

      }
  
    } catch (error) {
      return res.status(400).json({message: error.message})

    }
  })

  export const getAllPosts = asyncHandler(async(req,res)=>{
    try {
      const pageSize = Number(req.query.pageSize) || 3;
      const page = Number(req.query.size) || 1;
  
      const count = await BlogModel.countDocuments();
      const posts = await BlogModel.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res
      .status(200)
      .json({page, pages: Math.ceil(count / pageSize),data: posts });
    } catch (error) {
      return res.status(400).json({message: error.message})

    }
  })