import bcrypt from 'bcryptjs'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import { prop, pre, DocumentType, plugin } from '@typegoose/typegoose'

import { Category, PopulatedCategory } from './category'
import { CategoryModel } from '.'

@plugin(mongooseAutoPopulate)
@pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  if (!process.env.SALT_NUMBER) {
    throw 'process.env.SALT_NUMBER not exist!'
  }
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_NUMBER))
  this.password = await bcrypt.hash(this.password, salt)
})
export class User {
  @prop({ type: () => String, required: true, unique: true })
  public email!: string

  @prop({ type: () => String, trim: true })
  public nickname!: string

  @prop({ type: () => String, select: false })
  public password!: string

  @prop({ autopopulate: true, ref: () => Category })
  public categories?: PopulatedCategory[]

  public async checkPassword(
    this: DocumentType<User>,
    enteredPassword: string,
  ) {
    const result = await bcrypt.compare(enteredPassword, this.password)
    return result
  }

  public async getCategories(
    this: DocumentType<User>,
  ): Promise<DocumentType<Category>[]> {
    const result = await CategoryModel.find({ user: this._id })
    return result
  }
}

export interface PopulatedUser {
  _id?: string
  email: string
  nickname: string
  password: string
  createdAt: Date
  updatedAt?: Date
  categories?: PopulatedCategory[]
}
