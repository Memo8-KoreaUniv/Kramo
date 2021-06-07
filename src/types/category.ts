import { UserInfo } from './user'

export interface CategoryInfo {
  _id: string
  name: string
  user: UserInfo
  createdAt?: Date
  updatedAt?: Date
}
