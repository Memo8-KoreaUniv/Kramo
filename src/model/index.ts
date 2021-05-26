import { getModelForClass } from '@typegoose/typegoose'

import { User } from './user'
import { Category } from './category'
import { Memo } from './memo'
import { History } from './history'

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
