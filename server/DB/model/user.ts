import bcrypt from 'bcryptjs'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import { prop, pre, DocumentType, plugin } from '@typegoose/typegoose'

import { Category, PopulatedCategory } from './category'

@plugin(mongooseAutoPopulate)
@pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
export class User {
  @prop({ type: () => String, required: true, unique: true })
  public email!: string

  @prop({ type: () => String, trim: true })
  public nickname!: string

  @prop({ type: () => String, select: false })
  public password!: string

  @prop({ type: () => Date, required: true, default: Date.now() })
  public createdAt!: Date

  @prop({ autopopulate: true, ref: () => Category })
  public categories?: PopulatedCategory[]

  public async checkPassword(
    this: DocumentType<User>,
    enteredPassword: string,
  ) {
    const result = await bcrypt.compare(enteredPassword, this.password)
    return result
  }
}

export interface PopulatedUser {
  _id?: string
  email: string
  nickname: string
  password: string
  createdAt: Date
  categories?: PopulatedCategory[]
}
