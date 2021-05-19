import { prop, plugin } from '@typegoose/typegoose'
import { PopulatedUser, User } from './user'
import mongooseAutoPopulate from 'mongoose-autopopulate'

@plugin(mongooseAutoPopulate)
export class Category {
  @prop({ type: () => String })
  public name!: string

  @prop({ type: () => Date })
  public createdAt!: Date

  @prop({ autopopulate: true, ref: () => User })
  public user?: PopulatedUser
}

export interface PopulatedCategory {
  _id?: string
  name: string
  createdAt: Date
  user: PopulatedUser
}
