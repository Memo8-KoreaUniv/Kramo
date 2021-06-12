import { UserInfo } from './user';

export interface MemoInfo {
    _id: string
    category?: string
    memo: string
    text: string
    pinned: boolean
    user: UserInfo
    createdAt?: Date
    updatedAt?: Date
  }
