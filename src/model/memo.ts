import { prop, plugin, DocumentType } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { HistoryModel } from '.'
import { Category, PopulatedCategory } from './category'
import { History } from './history'
import { PopulatedUser, User } from './user'

@plugin(mongooseAutoPopulate)
export class Memo {
  @prop({ autopopulate: true, ref: () => User })
  public user!: PopulatedUser

  @prop({ autopopulate: true, ref: () => Category })
  public category!: PopulatedCategory

  public async getHistories(
    this: DocumentType<Memo>,
  ): Promise<DocumentType<History>[]> {
    const result = await HistoryModel.find({ memo: this._id })
    return result
  }
}

export interface PopulatedMemo {
  _id?: string
  user?: PopulatedUser
  category?: PopulatedCategory
}
