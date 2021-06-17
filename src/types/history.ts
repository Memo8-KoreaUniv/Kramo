import { UserInfo } from 'src/types/user'
import { CategoryInfo } from 'src/types/category'
import { MemoInfo } from 'src/types/memo'
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

export interface AddHistoriesProps{
  user: string
  category: string
  text: string
  weather: Weather
  gps: GPS
}