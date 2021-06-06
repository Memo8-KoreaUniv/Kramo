export interface UserInfo {
  _id: string
  naverId?: string
  name: string
  nickname: string
  email: string
  mobile: string
  updatedAt?: Date
  createdAt?: Date
}

export interface CategoryInfo {
  _id: string
  name: string
  user: UserInfo
  createdAt?: Date
  updatedAt?: Date
}
