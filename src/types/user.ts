export interface UserInfo {
  _id?: string
  naverId?: string
  name: string
  nickname: string
  email: string
  mobile: string
  createdAt?: Date
}

export interface CategoryInfo {
  _id: string
  name: string
  user: UserInfo
  createdAt?: Date
  updatedAt?: Date
}

export interface MemoInfo {
  _id: string
  user: UserInfo
  category: CategoryInfo
  createdAt?: Date
  updatedAt?: Date
}

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