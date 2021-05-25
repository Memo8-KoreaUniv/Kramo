import bcrypt from 'bcryptjs'
import { prop, pre, DocumentType, plugin } from '@typegoose/typegoose'
import { Category, PopulatedCategory } from './category'
import mongooseAutoPopulate from 'mongoose-autopopulate'

@plugin(mongooseAutoPopulate)
@pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
export class User {
  @prop({ type: () => String })
  public email!: string

  @prop({ type: () => String, trim: true })
  public nickname!: string

  @prop({ type: () => String })
  public password!: string

  @prop({ type: () => Date, required: true, default: Date.now() })
  public created_at!: Date

  @prop({ autopopulate: true, ref: () => Category })
  public categories?: PopulatedCategory[]

  public async checkPassword(
    this: DocumentType<User>,
    enteredPassword: string,
  ) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
}

export interface PopulatedUser {
  _id?: string
  email: string
  nickname: string
  password: string
  created_at: Date
  categories?: PopulatedCategory[]
}
