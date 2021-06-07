import { UserInfo } from 'src/types/user'
import { CategoryInfo } from 'src/types/category'
import { MemoInfo } from 'src/types/memo'

export interface HistoryInfo {
  _id: string
  user: UserInfo
  category: CategoryInfo
  memo: MemoInfo
  text: string
  createdAt?: Date
  weather: any
  gps: any
}