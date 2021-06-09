import { prop, plugin } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import { PopulatedUser, User } from './user'

@plugin(uniqueValidator)
@plugin(mongooseAutoPopulate)
export class Category {
  @prop({ autopopulate: true, ref: () => User })
  public user?: PopulatedUser

  @prop({ type: () => String, unique: true })
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
