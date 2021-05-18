import { User } from './user'
import { Category } from './category'
import { getModelForClass } from '@typegoose/typegoose'

export const UserModel = getModelForClass(User)
export const CategoryModel = getModelForClass(Category)
