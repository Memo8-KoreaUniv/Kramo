import { Types } from 'mongoose'

import { GPS } from 'src/types'

/**
 * USER1 더미데이터
 * @_id {email}
 */
export const USER1_EMAIL = 'test@naver.com'
export const USER1_PASSWORD = 'password'
export const USER1_CREATEDAT = new Date('2021-05-22T13:01:45+09:00')
export const USER1_ID = new Types.ObjectId('60a9e08a2e4b3029bfc68332')
export const USER1 = {
  _id: USER1_ID,
  email: USER1_EMAIL,
  nickname: 'user1',
  password: USER1_PASSWORD,
  createdAt: USER1_CREATEDAT,
}

/**
 * CATEGORY1 더미 데이터
 * @relation USER1
 * @_id {user}:{name}
 */

export const CATEGORY1_NAME = 'category1'
export const CATEGORY1_CREATEDAT = new Date('2021-05-23T13:01:45+09:00')
export const CATEGORY1_ID_STRING = '60a9e0b11c2d48401e4461a8'
export const CATEGORY1_ID = new Types.ObjectId(CATEGORY1_ID_STRING)
export const CATEGORY1 = {
  _id: CATEGORY1_ID,
  name: CATEGORY1_NAME,
  user: USER1_ID as any,
  createdAt: CATEGORY1_CREATEDAT,
}

/**
 * MEMO1 더미 데이터
 * @relation USER1
 * @relation CATEGORY1
 * @_id {user}:{category}:{createdAt}
 */
export const MEMO1_CREATEDAT = new Date('2021-05-23T13:02:45+09:00')
export const MEMO1_ID = new Types.ObjectId('60a9e0be2c6a430a9634d6b9')
export const MEMO1 = {
  _id: MEMO1_ID,
  category: CATEGORY1_ID as any,
  user: USER1_ID as any,
  createdAt: MEMO1_CREATEDAT,
}

/**
 * MEMO1 더미 데이터
 * @relation USER1
 * @relation CATEGORY1
 * @_id {user}:{category}:{createdAt}
 */
export const MEMO2_CREATEDAT = new Date('2021-05-23T13:03:45+09:00')
export const MEMO2_ID = new Types.ObjectId('60a9e0be2c6a430a9634d6c9')
export const MEMO2 = {
  _id: MEMO2_ID,
  category: CATEGORY1_ID as any,
  user: USER1_ID as any,
  createdAt: MEMO2_CREATEDAT,
}

const DUMMY_GPS: GPS = {
  latitude: 17.1,
  longitude: 120,
}

/**
 * HISTORY1 더미 데이터
 * @relation USER1
 * @relation CATEGORY1
 * @relation MEMO1
 * @_id {memo}:{createdAt}
 */
export const HISTORY1_CREATEDAT = new Date('Sun May 23 2021 13:19:43 GMT+0900')
export const HISTORY1_ID_STRING = '60a9e0db2183479d02922eda'
export const HISTORY1_ID = new Types.ObjectId(HISTORY1_ID_STRING)

export const HISTORY1 = {
  _id: HISTORY1_ID,
  user: USER1_ID,
  category: CATEGORY1_ID,
  memo: MEMO1_ID,
  text: 'history1',
  weather: 'test_weather',
  gps: DUMMY_GPS,
  createdAt: HISTORY1_CREATEDAT,
}

export const HISTORY2_CREATEDAT = new Date('Sun May 23 2021 14:19:43 GMT+0900')
export const HISTORY2_ID_STRING = '60a9e0db2183479d02922edb'
export const HISTORY2_ID = new Types.ObjectId(HISTORY2_ID_STRING)

export const HISTORY2 = {
  _id: HISTORY2_ID,
  user: USER1_ID,
  category: CATEGORY1_ID,
  memo: MEMO1_ID,
  text: 'history2',
  weather: 'test_weather',
  gps: DUMMY_GPS,
  createdAt: HISTORY2_CREATEDAT,
}

export const HISTORY3_CREATEDAT = new Date('Sun May 23 2021 15:19:43 GMT+0900')
export const HISTORY3_ID_STRING = '60a9e0db2183479d02922edc'
export const HISTORY3_ID = new Types.ObjectId(HISTORY3_ID_STRING)

export const HISTORY3 = {
  _id: HISTORY3_ID,
  user: USER1_ID,
  category: CATEGORY1_ID,
  memo: MEMO1_ID,
  text: 'history3',
  weather: 'test_weather',
  gps: DUMMY_GPS,
  createdAt: HISTORY3_CREATEDAT,
}

export const HISTORY4_CREATEDAT = new Date('Sun May 23 2021 20:19:43 GMT+0900')
export const HISTORY4_ID_STRING = '60a9e0db2183479d02922edd'
export const HISTORY4_ID = new Types.ObjectId(HISTORY4_ID_STRING)

export const HISTORY4 = {
  _id: HISTORY4_ID,
  user: USER1_ID,
  category: CATEGORY1_ID,
  memo: MEMO2_ID,
  text: 'history4',
  weather: 'test_weather',
  gps: DUMMY_GPS,
  createdAt: HISTORY4_CREATEDAT,
}

export const HISTORIES = [HISTORY1, HISTORY2, HISTORY3, HISTORY4]
