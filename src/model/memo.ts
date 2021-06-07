/* eslint-disable @typescript-eslint/no-unused-vars */
import { prop, plugin, DocumentType, pre } from '@typegoose/typegoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

import { HistoryModel } from '.'
import { Category, PopulatedCategory } from './category'
import { History } from './history'
import { PopulatedUser, User } from './user'

@pre<Memo>('save', async function (_) {
  this.pinned = this.pinned ? this.pinned : false
})
@plugin(mongooseAutoPopulate)
export class Memo {
  @prop({ autopopulate: true, ref: () => User })
  public user!: PopulatedUser

  @prop({ autopopulate: true, ref: () => Category })
  public category!: PopulatedCategory

  @prop({ type: () => Boolean })
  public pinned!: boolean

  @prop({ type: () => Date })
  public createdAt!: Date

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
