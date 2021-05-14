import bcrypt from 'bcryptjs'
import { Document, Model, model, Schema, Date, Types } from 'mongoose'
import { CategoryDocument } from './category'

/* https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1 */
// Schema
const UserSchema = new Schema<UserDocument, UserModel>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

export interface User {
  email: string
  nickname?: string
  password: string
  created_at: Date
  categories?: Array<Types.ObjectId> | Array<Record<string, unknown>>
}

interface UserBaseDocument extends User, Document {
  categories: Types.Array<CategoryDocument['_id']>
}
export interface UserDocument extends UserBaseDocument {}
export interface UserModel extends Model<UserDocument> {}
export interface UserPopulatedDocument extends UserBaseDocument {
  categories: Types.Array<CategoryDocument>
}

// Document middlewares
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Default export
export default model<UserDocument, UserModel>('User', UserSchema)
