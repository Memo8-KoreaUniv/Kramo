import { GPS, Weather } from './index';
import { UserInfo } from './user';

export interface MemoInfo {
    _id: string
    category?: string
    memo: string
    text: string
    pinned: boolean
    user: UserInfo
    gps: GPS
    weather: Weather
    createdAt?: Date
    updatedAt?: Date
  }
  