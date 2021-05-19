import { prop, plugin, Ref } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { PopulatedUser } from './user'
import { PopulatedCategory } from './category'
import { Memo, PopulatedMemo } from './memo'

@plugin(mongooseAutoPopulate)
export class History {
  @prop({ ref: () => Memo })
  public memo?: Ref<Memo>

  @prop({ autopopulate: true, ref: () => Memo })
  public user?: PopulatedUser

  @prop({ autopopulate: true, ref: () => Memo })
  public category?: PopulatedCategory

  @prop({ autopopulate: true, ref: () => String })
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
