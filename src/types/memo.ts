import { GPS, Weather } from './index';
import { UserInfo } from './user';

export interface MemoInfo {
    _id: string
    category?: string
    memo: any
    text: string
    user: UserInfo
    gps: GPS
    weather: Weather
    createdAt?: Date
    updatedAt?: Date
  }
  