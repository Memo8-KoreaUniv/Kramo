import { UserInfo } from 'src/types/user'
import { CategoryInfo } from 'src/types/category'


export interface MemoInfo {
  _id: string
  user: UserInfo
  category: CategoryInfo
  createdAt?: Date
  updatedAt?: Date
}
