import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
  },
  lastmail: {
    type: Date,
    default: null,
  },
  totalmail: {
    type: Number,
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)
export default User
