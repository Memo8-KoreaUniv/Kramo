import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  nickname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_at: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', UserSchema)
