import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {
        type: 'String',
        unique: true,
        required: true
    },
    body: {
        type: 'String',
        required: true,
        unique: true
    },
    comments: [
        {
          commentId: Number,
          comment: String,
        },
      ],
}, { timestamps: true })


const BlogModel = mongoose.model('Blog', blogSchema)

export default BlogModel