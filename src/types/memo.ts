import { GPS } from 'src/types/index'
import { WeatherInfo } from 'src/utils/weather'
import { UserInfo } from 'src/types/user'

export interface MemoInfo {
  _id: string
  category?: string
  memo: any
  text: string
  user: UserInfo
  gps: GPS
  weather: WeatherInfo
  createdAt?: Date
  updatedAt?: Date
}
