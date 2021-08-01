import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
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
          trackId: Number,
          title: String,
        },
      ],
}, { timestamps: true })


const UserModel = mongoose.model('User', userSchema)

export default UserModel