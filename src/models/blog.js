import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {
        type: 'String',
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
          title: String,
        },
      ],
}, { timestamps: true })


const BlogModel = mongoose.model('Blog', blogSchema)

export default BlogModel