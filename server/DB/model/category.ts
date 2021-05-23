import { prop, plugin } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { PopulatedUser, User } from './user'

@plugin(mongooseAutoPopulate)
export class Category {
  @prop({ autopopulate: true, ref: () => User })
  public user?: PopulatedUser

  @prop({ type: () => String })
  public name!: string

  @prop({ type: () => Date })
  public createdAt!: Date
}

export interface PopulatedCategory {
  _id?: string
  name: string
  createdAt: Date
  user: PopulatedUser
}
