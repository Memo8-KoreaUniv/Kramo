import { Types } from 'mongoose'

import { GPS } from 'src/types'
import { Weather } from 'src/types'

export const USER2_EMAIL = 'test2@naver.com'
export const USER2_CREATEDAT = new Date('2021-05-22T13:01:45+09:00')
export const USER2_ID = new Types.ObjectId('60b613257d8ac9f01d2410c7')
export const USER2 = {
  _id: USER2_ID,
  email: USER2_EMAIL,
  nickname: 'test2',
  createdAt: USER2_CREATEDAT,
}

export const USER3_EMAIL = 'test3@naver.com'
export const USER3_CREATEDAT = new Date('2021-05-22T13:01:45+09:00')
export const USER3_ID = new Types.ObjectId('60b6125547e31cad34281e05')
export const USER3 = {
  _id: USER3_ID,
  email: USER3_EMAIL,
  nickname: 'test3',
  createdAt: USER3_CREATEDAT,
}

export const USER4_EMAIL = 'test4@naver.com'
export const USER4_CREATEDAT = new Date('2021-05-22T13:01:45+09:00')
export const USER4_ID = new Types.ObjectId('60b60da3707ef33bc3d79a49')
export const USER4 = {
  _id: USER4_ID,
  email: USER4_EMAIL,
  nickname: 'test4',
  createdAt: USER4_CREATEDAT,
}

export const USER5_EMAIL = 'test5@naver.com'
export const USER5_CREATEDAT = new Date('2021-05-22T13:01:45+09:00')
export const USER5_ID = new Types.ObjectId('60b28b7b7038264918d3b42d')
export const USER5 = {
  _id: USER5_ID,
  email: USER5_EMAIL,
  nickname: 'test5',
  createdAt: USER5_CREATEDAT,
}

export const USERS = [USER2, USER3, USER4, USER5]
export const USERS_ID = [USER2_ID, USER3_ID, USER4_ID, USER5_ID]
/****************************************************************/
/**
 * CATEGORY2~5 더미 데이터
 * @relation USER2~5
 */

export const CATEGORY2_NAME = 'category2'
export const CATEGORY2_CREATEDAT = new Date('2021-05-05T13:01:45+09:00')
export const CATEGORY2_ID_STRING = '60c277daf565f6de20e923ff'
export const CATEGORY2_ID = new Types.ObjectId(CATEGORY2_ID_STRING)
export const CATEGORY2 = {
  _id: CATEGORY2_ID,
  name: CATEGORY2_NAME,
  user: USER2_ID as any,
  createdAt: CATEGORY2_CREATEDAT,
}

export const CATEGORY3_NAME = 'category3'
export const CATEGORY3_CREATEDAT = new Date('2021-05-06T13:01:45+09:00')
export const CATEGORY3_ID_STRING = '60c277edd69ce4a0787f105a'
export const CATEGORY3_ID = new Types.ObjectId(CATEGORY3_ID_STRING)
export const CATEGORY3 = {
  _id: CATEGORY3_ID,
  name: CATEGORY3_NAME,
  user: USER3_ID as any,
  createdAt: CATEGORY3_CREATEDAT,
}

export const CATEGORY4_NAME = 'category4'
export const CATEGORY4_CREATEDAT = new Date('2021-05-07T13:01:45+09:00')
export const CATEGORY4_ID_STRING = '60c277f5cac41fe0059ae350'
export const CATEGORY4_ID = new Types.ObjectId(CATEGORY4_ID_STRING)
export const CATEGORY4 = {
  _id: CATEGORY4_ID,
  name: CATEGORY4_NAME,
  user: USER4_ID as any,
  createdAt: CATEGORY4_CREATEDAT,
}

export const CATEGORY5_NAME = 'category5'
export const CATEGORY5_CREATEDAT = new Date('2021-05-08T13:01:45+09:00')
export const CATEGORY5_ID_STRING = '60c277fadc3705a18e878b6a'
export const CATEGORY5_ID = new Types.ObjectId(CATEGORY5_ID_STRING)
export const CATEGORY5 = {
  _id: CATEGORY5_ID,
  name: CATEGORY5_NAME,
  user: USER5_ID as any,
  createdAt: CATEGORY5_CREATEDAT,
}

export const CATEGORYS = [CATEGORY2, CATEGORY3, CATEGORY4, CATEGORY5]

/****************************************************************/
/**
 * USER2의 MEM21,MEM22 더미 데이터
 * @relation USER2
 * @relation CATEGORY2
 */
export const MEM21_CREATEDAT = new Date('2021-05-05T13:10:45+09:00')
export const MEM21_ID = new Types.ObjectId('60c27ae1cf0ada5f6370861d')
export const MEM21 = {
  _id: MEM21_ID,
  category: CATEGORY2_ID as any,
  user: USER2_ID as any,
  createdAt: MEM21_CREATEDAT,
}
export const MEM22_CREATEDAT = new Date('2021-05-05T13:13:45+09:00')
export const MEM22_ID = new Types.ObjectId('60c4abd7caa979beebca7839')
export const MEM22 = {
  _id: MEM22_ID,
  category: CATEGORY2_ID as any,
  user: USER2_ID as any,
  createdAt: MEM22_CREATEDAT,
}
/**
 * USER3의 MEM31,MEM32 더미 데이터
 * @relation USER3
 * @relation CATEGORY3
 */
export const MEM31_CREATEDAT = new Date('2021-05-06T14:45:45+09:00')
export const MEM31_ID = new Types.ObjectId('60c27b333b2fab3b576080cf')
export const MEM31 = {
  _id: MEM31_ID,
  category: CATEGORY3_ID as any,
  user: USER3_ID as any,
  createdAt: MEM31_CREATEDAT,
}
export const MEM32_CREATEDAT = new Date('2021-05-06T14:50:45+09:00')
export const MEM32_ID = new Types.ObjectId('60c27b37aaa806de5e3d3f6d')
export const MEM32 = {
  _id: MEM32_ID,
  category: CATEGORY3_ID as any,
  user: USER3_ID as any,
  createdAt: MEM32_CREATEDAT,
}

/**
 * USER4의 MEM41,MEM42 더미 데이터
 * @relation USER4
 * @relation CATEGORY4
 */
export const MEM41_CREATEDAT = new Date('2021-05-07T16:30:45+09:00')
export const MEM41_ID = new Types.ObjectId('60c27b6609fca59f1782b539')
export const MEM41 = {
  _id: MEM41_ID,
  category: CATEGORY4_ID as any,
  user: USER4_ID as any,
  createdAt: MEM41_CREATEDAT,
}
export const MEM42_CREATEDAT = new Date('2021-05-07T16:22:45+09:00')
export const MEM42_ID = new Types.ObjectId('60c4615c6470efa961225463')
export const MEM42 = {
  _id: MEM42_ID,
  category: CATEGORY4_ID as any,
  user: USER4_ID as any,
  createdAt: MEM42_CREATEDAT,
}

/**
 * USER5의 MEM51,MEM52 더미 데이터
 * @relation USER5
 * @relation CATEGORY5
 */
export const MEM51_CREATEDAT = new Date('2021-05-08T19:00:45+09:00')
export const MEM51_ID = new Types.ObjectId('60c4a76e9d59bf9e3f8dc890')
export const MEM51 = {
  _id: MEM51_ID,
  category: CATEGORY5_ID as any,
  user: USER5_ID as any,
  createdAt: MEM51_CREATEDAT,
}
export const MEM52_CREATEDAT = new Date('2021-05-08T19:50:45+09:00')
export const MEM52_ID = new Types.ObjectId('60c27ae6331ad5cb8f2d124b')
export const MEM52 = {
  _id: MEM52_ID,
  category: CATEGORY5_ID as any,
  user: USER5_ID as any,
  createdAt: MEM52_CREATEDAT,
}

export const MEMOS = [MEM21, MEM22, MEM31, MEM32, MEM41, MEM42, MEM51, MEM52]

/****************************************************************/
/**
 * MEM21의 HISTORY 더미 데이터
 * @relation USER2
 * @relation CATEGORY2
 * @relation MEM21
 */
const DUMMY_GPS2: GPS = {
  id: '60c46939478ca023861a4a33',
  latitude: 37.5908032,
  longitude: 127.0255886,
}

const WEATHER2: Weather = {
  id: '60c46a8aac2a6c1c66ff8d06',
  main: '날씨맑음',
  description: '날씨맑음',
  icon: '01d',
}

export const HISTORY21_CREATEDAT = new Date('Sun May 23 2021 13:19:43 GMT+0900')
export const HISTORY21_ID_STRING = '60c27eb8b2f0fb03024b13a0'
export const HISTORY21_ID = new Types.ObjectId(HISTORY21_ID_STRING)

export const HISTORY21 = {
  _id: HISTORY21_ID,
  user: USER2_ID,
  category: CATEGORY2_ID,
  memo: MEM21_ID,
  text: '첫 번째 히스토리입니다.',
  weather: WEATHER2,
  gps: DUMMY_GPS2,
  createdAt: HISTORY21_CREATEDAT,
}

export const HISTORY22_CREATEDAT = new Date('Sun May 23 2021 14:19:43 GMT+0900')
export const HISTORY22_ID_STRING = '60c27f72665a92541034a71f'
export const HISTORY22_ID = new Types.ObjectId(HISTORY22_ID_STRING)

export const HISTORY22 = {
  _id: HISTORY22_ID,
  user: USER2_ID,
  category: CATEGORY2_ID,
  memo: MEM21_ID,
  text: '두 번째 히스토리입니다.',
  weather: WEATHER2,
  gps: DUMMY_GPS2,
  createdAt: HISTORY22_CREATEDAT,
}

export const HISTORY23_CREATEDAT = new Date('Sun May 23 2021 15:19:43 GMT+0900')
export const HISTORY23_ID_STRING = '60c27f76b2710a46ad2ed0b1'
export const HISTORY23_ID = new Types.ObjectId(HISTORY23_ID_STRING)

export const HISTORY23 = {
  _id: HISTORY23_ID,
  user: USER2_ID,
  category: CATEGORY2_ID,
  memo: MEM21_ID,
  text: '세 번째 히스토리 입니다.',
  weather: WEATHER2,
  gps: DUMMY_GPS2,
  createdAt: HISTORY23_CREATEDAT,
}

export const HISTORY24_CREATEDAT = new Date('Sun May 23 2021 20:19:43 GMT+0900')
export const HISTORY24_ID_STRING = '60c27f7b058d823227557a6a'
export const HISTORY24_ID = new Types.ObjectId(HISTORY24_ID_STRING)

export const HISTORY24 = {
  _id: HISTORY24_ID,
  user: USER2_ID,
  category: CATEGORY2_ID,
  memo: MEM21_ID,
  text: '<p>메모는 마크다운을 지원합니다.</p>',
  weather: WEATHER2,
  gps: DUMMY_GPS2,
  createdAt: HISTORY24_CREATEDAT,
}

export const HISTORIES2 = [HISTORY21, HISTORY22, HISTORY23, HISTORY24]

/****************************************************************/
/**
 * MEM31의 HISTORY 더미 데이터
 * @relation USER3
 * @relation CATEGORY3
 * @relation MEM31
 */
const DUMMY_GPS3: GPS = {
  id: '60c46b3bd6491dce10d1258c',
  latitude: 37.539765,
  longitude: 127.053323,
}

const WEATHER3: Weather = {
  id: '60c46b416e80e31523702778',
  main: '날씨맑음',
  description: '날씨맑음',
  icon: '01d',
}

export const HISTORY31_CREATEDAT = new Date('Sun May 23 2021 13:19:43 GMT+0900')
export const HISTORY31_ID_STRING = '60c2806d677eb6c7dac0b15d'
export const HISTORY31_ID = new Types.ObjectId(HISTORY31_ID_STRING)

export const HISTORY31 = {
  _id: HISTORY31_ID,
  user: USER3_ID,
  category: CATEGORY3_ID,
  memo: MEM31_ID,
  text: '첫 번째 히스토리입니다.',
  weather: WEATHER3,
  gps: DUMMY_GPS3,
  createdAt: HISTORY31_CREATEDAT,
}

export const HISTORY32_CREATEDAT = new Date('Sun May 23 2021 14:19:43 GMT+0900')
export const HISTORY32_ID_STRING = '60c280c9256f9e4e3338d0b1'
export const HISTORY32_ID = new Types.ObjectId(HISTORY32_ID_STRING)

export const HISTORY32 = {
  _id: HISTORY32_ID,
  user: USER3_ID,
  category: CATEGORY3_ID,
  memo: MEM31_ID,
  text: '두 번째 히스토리 입니다.',
  weather: WEATHER3,
  gps: DUMMY_GPS3,
  createdAt: HISTORY32_CREATEDAT,
}

export const HISTORY33_CREATEDAT = new Date('Sun May 23 2021 15:19:43 GMT+0900')
export const HISTORY33_ID_STRING = '60c280bfd024fd54be6117e9'
export const HISTORY33_ID = new Types.ObjectId(HISTORY33_ID_STRING)

export const HISTORY33 = {
  _id: HISTORY33_ID,
  user: USER3_ID,
  category: CATEGORY3_ID,
  memo: MEM31_ID,
  text: '세 번째 히스토리 입니다.',
  weather: WEATHER3,
  gps: DUMMY_GPS3,
  createdAt: HISTORY33_CREATEDAT,
}

export const HISTORY34_CREATEDAT = new Date('Sun May 23 2021 20:19:43 GMT+0900')
export const HISTORY34_ID_STRING = '60c280c335c906085ca06cad'
export const HISTORY34_ID = new Types.ObjectId(HISTORY34_ID_STRING)

export const HISTORY34 = {
  _id: HISTORY34_ID,
  user: USER3_ID,
  category: CATEGORY3_ID,
  memo: MEM31_ID,
  text: '<p>메모는 마크다운을 지원합니다.</p>',
  weather: WEATHER3,
  gps: DUMMY_GPS3,
  createdAt: HISTORY34_CREATEDAT,
}

export const HISTORIES3 = [HISTORY31, HISTORY32, HISTORY33, HISTORY34]

/****************************************************************/
/**
 * MEM41의 HISTORY 더미 데이터
 * @relation USER4
 * @relation CATEGORY4
 * @relation MEM41
 */
const DUMMY_GPS4: GPS = {
  id: '60c46b6de66519a3fd6d66b5',
  latitude: 37.5215764,
  longitude: 127.0229765,
}

const WEATHER4: Weather = {
  id: '60c46b72788dacbc36764bdd',
  main: '날씨맑음',
  description: '날씨맑음',
  icon: '01d',
}

export const HISTORY41_CREATEDAT = new Date('Sun May 23 2021 13:19:43 GMT+0900')
export const HISTORY41_ID_STRING = '60c282b47ed0244d0da1c465'
export const HISTORY41_ID = new Types.ObjectId(HISTORY41_ID_STRING)

export const HISTORY41 = {
  _id: HISTORY41_ID,
  user: USER4_ID,
  category: CATEGORY4_ID,
  memo: MEM41_ID,
  text: '첫 번째 히스토리입니다.',
  weather: WEATHER4,
  gps: DUMMY_GPS4,
  createdAt: HISTORY41_CREATEDAT,
}

export const HISTORY42_CREATEDAT = new Date('Sun May 23 2021 14:19:43 GMT+0900')
export const HISTORY42_ID_STRING = '60c2833aab2eeb4693187c93'
export const HISTORY42_ID = new Types.ObjectId(HISTORY42_ID_STRING)

export const HISTORY42 = {
  _id: HISTORY42_ID,
  user: USER4_ID,
  category: CATEGORY4_ID,
  memo: MEM41_ID,
  text: '두 번째 히스토리입니다.',
  weather: WEATHER4,
  gps: DUMMY_GPS4,
  createdAt: HISTORY42_CREATEDAT,
}

export const HISTORY43_CREATEDAT = new Date('Sun May 23 2021 15:19:43 GMT+0900')
export const HISTORY43_ID_STRING = '60c28334a0ccca7456125ccd'
export const HISTORY43_ID = new Types.ObjectId(HISTORY43_ID_STRING)

export const HISTORY43 = {
  _id: HISTORY43_ID,
  user: USER4_ID,
  category: CATEGORY4_ID,
  memo: MEM41_ID,
  text: '세 번째 히스토리 입니다.',
  weather: WEATHER4,
  gps: DUMMY_GPS4,
  createdAt: HISTORY43_CREATEDAT,
}

export const HISTORY44_CREATEDAT = new Date('Sun May 23 2021 20:19:43 GMT+0900')
export const HISTORY44_ID_STRING = '60c2832f4a05a1adc2667222'
export const HISTORY44_ID = new Types.ObjectId(HISTORY44_ID_STRING)

export const HISTORY44 = {
  _id: HISTORY44_ID,
  user: USER4_ID,
  category: CATEGORY4_ID,
  memo: MEM41_ID,
  text: '<p>메모는 마크다운을 지원합니다.</p>',
  weather: WEATHER4,
  gps: DUMMY_GPS4,
  createdAt: HISTORY44_CREATEDAT,
}

export const HISTORIES4 = [HISTORY41, HISTORY42, HISTORY43, HISTORY44]

/****************************************************************/
/**
 * MEM51의 HISTORY 더미 데이터
 * @relation USER5
 * @relation CATEGORY5
 * @relation MEM51
 */
const DUMMY_GPS5: GPS = {
  id: '60c46b8b98629ab0cff89c16',
  latitude: 37.496421,
  longitude: 126.957439,
}

const WEATHER5: Weather = {
  id: '60c46b90b49f8b93e25a099c',
  main: '날씨맑음',
  description: '날씨맑음',
  icon: '01d',
}

export const HISTORY51_CREATEDAT = new Date('Sun May 23 2021 13:19:43 GMT+0900')
export const HISTORY51_ID_STRING = '60c284996410621a3beda2ab'
export const HISTORY51_ID = new Types.ObjectId(HISTORY51_ID_STRING)

export const HISTORY51 = {
  _id: HISTORY51_ID,
  user: USER5_ID,
  category: CATEGORY5_ID,
  memo: MEM51_ID,
  text: '첫 번째 히스토리입니다.',
  weather: WEATHER5,
  gps: DUMMY_GPS5,
  createdAt: HISTORY51_CREATEDAT,
}

export const HISTORY52_CREATEDAT = new Date('Sun May 23 2021 14:19:43 GMT+0900')
export const HISTORY52_ID_STRING = '60c28494359209da39493057'
export const HISTORY52_ID = new Types.ObjectId(HISTORY52_ID_STRING)

export const HISTORY52 = {
  _id: HISTORY52_ID,
  user: USER5_ID,
  category: CATEGORY5_ID,
  memo: MEM51_ID,
  text: '두 번째 히스토리 입니다.',
  weather: WEATHER5,
  gps: DUMMY_GPS5,
  createdAt: HISTORY52_CREATEDAT,
}

export const HISTORY53_CREATEDAT = new Date('Sun May 23 2021 15:19:43 GMT+0900')
export const HISTORY53_ID_STRING = '60c284df51a5f9259231c63b'
export const HISTORY53_ID = new Types.ObjectId(HISTORY53_ID_STRING)

export const HISTORY53 = {
  _id: HISTORY53_ID,
  user: USER5_ID,
  category: CATEGORY5_ID,
  memo: MEM51_ID,
  text: '세 번째 히스토리 입니다.',
  weather: WEATHER5,
  gps: DUMMY_GPS5,
  createdAt: HISTORY53_CREATEDAT,
}

export const HISTORY54_CREATEDAT = new Date('Sun May 23 2021 20:19:43 GMT+0900')
export const HISTORY54_ID_STRING = '60c284db8d3e64791b4b1e45'
export const HISTORY54_ID = new Types.ObjectId(HISTORY54_ID_STRING)

export const HISTORY54 = {
  _id: HISTORY54_ID,
  user: USER5_ID,
  category: CATEGORY5_ID,
  memo: MEM51_ID,
  text: '<p>메모는 마크다운을 지원합니다.</p>',
  weather: WEATHER5,
  gps: DUMMY_GPS5,
  createdAt: HISTORY54_CREATEDAT,
}

const TEMPT_GPS: GPS = {
  id: '60c46b8b98629ab0cff89c16',
  latitude: 37.3591785,
  longitude: 127.1026436,
}
const TEMPT_WEATHER: Weather = {
  id: '60c46b90b49f8b93e25a099c',
  main: '날씨맑음',
  description: '날씨맑음',
  icon: '01d',
}


export const HISTORIES5 = [HISTORY51, HISTORY52, HISTORY53, HISTORY54]

export const TEMPTHISTORY_CREATEDAT = new Date('Sun May 25 2021 22:00:00 GMT+0900')
export const TEMPTHISTORY = {
  text: 'apiTest',
  weather: TEMPT_WEATHER,
  gps: TEMPT_GPS,
}
