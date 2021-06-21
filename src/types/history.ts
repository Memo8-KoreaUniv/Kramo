import { CategoryInfo } from 'src/types/category'
import { MemoInfo } from 'src/types/memo'
import { UserInfo } from 'src/types/user'

import { GPS, Weather } from './index';

export interface HistoryInfo {
  _id?: string
  user: UserInfo
  category: CategoryInfo
  memo: MemoInfo
  text: string
  createdAt?: Date
  weather: Weather
  gps: GPS
}
