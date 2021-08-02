const asyncHandler = require("express-async-handler");
const BlogModel = require("../models/blog.js");
const mongoose = require('mongoose');

// create a blog post
exports.createBlog = asyncHandler(async (req, res) => {
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
    return res.status(400).json({ message: error.message })
  }
});

// get all blog posts  
exports.getAllBlogPost = asyncHandler(async (req, res) => {
  try {
    const posts = await BlogModel.find();

    if (posts) {
      return res.status(200).json({ message: 'Success', posts: posts });
    } else {
      return res.status(400).json({ message: 'No Posts found' })

    }

  } catch (error) {
    return res.status(400).json({ message: error.message })

  }
})

// get a single blog post  
exports.getABlogPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Id' })
    }
    const post = await BlogModel.findById(id);

    if (post) {
      return res.status(200).json({ message: 'Success', post: post });
    } else {
      return res.status(400).json({ message: 'Post not found' })
    }

  } catch (error) {
    return res.status(400).json({ message: error.message })

  }
})

// get all blog postswith pagination  
exports.getAllPosts = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 3;
    const page = Number(req.query.size) || 1;

    const count = await BlogModel.countDocuments();
    const posts = await BlogModel.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res
      .status(200)
      .json({ page, pages: Math.ceil(count / pageSize), data: posts });
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// delete  a blog post

exports.deletePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Id' })
    }

    const post = await BlogModel.findByIdAndRemove(id);

    if (post) {
      return res.status(200).json({ message: 'Deleted Successfully' });
    } else {
      return res.status(400).json({ message: 'Post not found' })
    }

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// update a blog post

exports.updateAPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Id' })
    }

    const updatePost = await BlogModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ message: 'success', data: updatePost });
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// add comment to post

exports.commentOnPost = asyncHandler(async (req, res) => {
  try {
    const { commentId, comment } = req.body;
    const toComment = await BlogModel.findOne({
      _id: req.params.id
    }).exec();

    if (toComment) {
      const addedComment = await BlogModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: { commentId, comment } } },
        { new: true }
      ).exec();
      if (addedComment) {
        const newData = {
          data: addedComment,
        };
        return res.status(200).json({ message: 'success', data: newData });

      }
      return res.status(400).json({ message: 'failed' })

    }
    return res.status(400).json({ message: error.message })

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})


// get all comments on a post

exports.getAllComments = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogModel.findById(id).select('comments')

    if (post) {
      return res.status(200).json({ message: 'Success', data: post })
    } else {
      return res.status(400).json({ message: 'No comment found' })

    }
  } catch (error) {
    return res.status(400).json({ message: error.message })

  }
})

// get a single comment on a post

exports.getAComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = req.body.commentId

    const post = await BlogModel.findById(id)

    if (post) {
      const commentIndex = await post.comments.findIndex((comment) => {
        if (comment !== null) {
          return comment._id == commentId
        };
      });
      const comment = await post.comments[commentIndex];
      return res.status(200).json({ message: 'Success', data: comment })
    } else {
      return res.status(400).json({ message: 'No comment found' })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// update a comment

exports.updateComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = req.body.commentId

    const post = await BlogModel.findById(id)

    if (post) {
      const commentIndex = await post.comments.findIndex((comment) => {
        if (comment !== null) {
          return comment._id == commentId
        };
      });
      let comment = await post.comments[commentIndex];
      post.comments[commentIndex] = { ...comment, ...req.body }
      await post.save();

      return res.status(200).json({ message: 'success', data: post.comments[commentIndex] });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

// delete a comment on a post

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = req.body.commentId

    const post = await BlogModel.findById(id)

    if (post) {
      const commentIndex = await post.comments.findIndex((comment) => {
        if (comment !== null) {
          return comment._id == commentId
        };
      });
       await post.comments.splice([commentIndex],1);
      return res.status(200).json({ message: 'Successfully Deleted' })
    } else {
      return res.status(400).json({ message: 'No comment found' })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})