import { getModelForClass } from '@typegoose/typegoose'

import { Category } from './category'
import { History } from './history'
import { Memo } from './memo'
import { User } from './user'

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
export const CategoryModel = getModelForClass(Category, {
  schemaOptions: { timestamps: true },
})
export const MemoModel = getModelForClass(Memo, {
  schemaOptions: { timestamps: true },
})
export const HistoryModel = getModelForClass(History, {
  schemaOptions: { timestamps: true },
})
