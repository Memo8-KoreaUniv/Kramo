import { pre, prop, plugin, Ref } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { PopulatedUser, User } from './user'
import { Category, PopulatedCategory } from './category'
import { Memo, PopulatedMemo } from './memo'

@plugin(mongooseAutoPopulate)
export class History {
  @prop({ autopopulate: true, ref: () => User })
  public user?: PopulatedUser

  @prop({ autopopulate: true, ref: () => Category })
  public category?: PopulatedCategory

  @prop({ ref: () => Memo })
  public memo?: Ref<Memo>

  @prop({ type: () => String })
  public text?: string

  @prop({ type: () => Date })
  public createdAt!: Date

  @prop({ type: () => String })
  public weather!: string

  @prop({ type: () => String })
  public gps!: string
}

export interface PopulatedHistory {
  _id?: string
  memo?: PopulatedMemo
  text?: string
  createdAt: Date
  weather?: string
  gps?: string
}
