import { getModelForClass } from '@typegoose/typegoose'

import { User } from './user'
import { Category } from './category'
import { Memo } from './memo'
import { History } from './history'

export const UserModel = getModelForClass(User)
export const CategoryModel = getModelForClass(Category)
export const MemoModel = getModelForClass(Memo)
export const HistoryModel = getModelForClass(History)
