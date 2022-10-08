import Mongoose from 'mongoose'

const User = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

export const UserModel = Mongoose.model('UserModel', User)