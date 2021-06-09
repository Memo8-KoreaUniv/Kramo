import React from 'react'

import { Main } from '../src/components/main'

// 타입 정의

export type info = {
  time: string
  place: string
  weather: string
}

export type memo = {
  id: string
  title: string
  content: string
  profile: string
  infos: info[]
}

// MOCK_DATA

export const MOCK_DATA: memo[] = [
  {
    id: 'some-random-value-0',
    title: '5월 20일 오늘의 일기',
    content:
      '오늘은 제일 바쁜 목요일\n끝났으면 좋겠다 빨리\n다음주는 더 더워지겠지??',
    profile: 'default',
    infos: [
      {
        time: '2021년 5월 20일 13:19',
        place: '정발산동',
        weather: '🌧',
      },
      {
        time: '2021년 5월 21일 12:53',
        place: '스타벅스 주엽강선점',
        weather: '🌥',
      },
      {
        time: '2021년 5월 22일 10:32',
        place: '일산호수공원',
        weather: '🔥',
      },
    ],
  },
  {
    id: 'some-random-value-1',
    title: '스타벅스 별 많이 적립 받기',
    content:
      '사이렌 오더 +1\n마이 스타벅스 리뷰 참여 +1\n이벤트 음료 주문 +3\n골드레벨 12개 달성 시 무료 쿠폰',
    profile: 'default',
    infos: [
      {
        time: '2021년 5월 19일 20:19',
        place: '안암역 6호선',
        weather: '☀️',
      },
      {
        time: '2021년 5월 19일 21:03',
        place: '하나스퀘어',
        weather: '☁️',
      },
    ],
  },
  {
    id: 'some-random-value-2',
    title: '5월 19일 오늘의 일기',
    content: '모처럼의 휴일\n과제만 없었으면 어후',
    profile: 'default',
    infos: [
      {
        time: '2021년 5월 16일 11:12',
        place: '우리집',
        weather: '❓',
      },
    ],
  },
  {
    id: 'some-random-value-3',
    title: '이마트에서 장보기',
    content: '닭가슴살, 계란 한 판, 시저샐러드',
    profile: 'default',
    infos: [
      {
        time: '2021년 5월 14일 19:00',
        place: '이마트 풍산점',
        weather: '💨',
      },
    ],
  },

  {
    id: 'some-random-value-4',
    title: '밖에 비온다',
    content: '주룩주룩',
    profile: 'default',
    infos: [
      {
        time: '2021년 5월 28일 14:00',
        place: '우리집',
        weather: '💨',
      },
    ],
  },
]

export default function Index() {
  return <Main />
}
