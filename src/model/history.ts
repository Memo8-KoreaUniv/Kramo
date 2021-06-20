import { prop, plugin, Ref } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { GPS as GPS_TYPE, Weather as WHEATHER_TYPE } from 'src/types'

import { Category, PopulatedCategory } from './category'
import { Memo, PopulatedMemo } from './memo'
import { PopulatedUser, User } from './user'

class Weather {
  @prop({ type: () => String })
  public main!: string

  @prop({ type: () => String })
  public description!: string

  @prop({ type: () => String })
  public icon!: string
}

class GPS {
  @prop({ type: () => Number })
  public latitude?: number

  @prop({ type: () => Number })
  public longitude?: number
}

@plugin(mongooseAutoPopulate)
export class History {
  @prop({ autopopulate: true, ref: () => User })
  public user?: PopulatedUser

  @prop({ autopopulate: true, ref: () => Category })
  public category?: PopulatedCategory

  @prop({ autopopulate: true, ref: () => Memo })
  public memo!: Ref<Memo>

  @prop({ type: () => String })
  public text?: string

  @prop({ type: () => Date })
  public createdAt!: Date

  @prop({ type: () => Weather })
  public weather!: WHEATHER_TYPE

  @prop({ type: () => GPS })
  public gps!: GPS_TYPE
}

export interface PopulatedHistory {
  _id?: string
  memo?: PopulatedMemo
  text?: string
  createdAt: Date
  weather?: any
  gps?: GPS_TYPE
}
