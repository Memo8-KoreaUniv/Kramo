import { prop, plugin } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { PopulatedUser, User } from './user'
import { Category, PopulatedCategory } from './category'

@plugin(mongooseAutoPopulate)
export class Memo {
  @prop({ autopopulate: true, ref: () => User })
  public user!: PopulatedUser

  @prop({ autopopulate: true, ref: () => Category })
  public category!: PopulatedCategory

  @prop({ type: () => Date })
  public createdAt!: Date
}

export interface PopulatedMemo {
  _id?: string
  user?: PopulatedUser
  category?: PopulatedCategory
}
