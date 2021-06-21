/* eslint-disable no-case-declarations */

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { WEATHER_API_BASE_URL } from 'src/utils/weather'

export const FALLBACK_WEATHER = {
  id: '0',
  description: '날씨 정보를 로드해오는 데에 실패하였습니다..',
  main: '날씨 정보를 로드해오는 데에 실패하였습니다..',
  icon: '4d',
}

export default async function weather(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case 'GET':
        const { lat, lon } = req.query
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
        try {
          const apiRes = await axios.get(WEATHER_API_BASE_URL, {
            params: {
              lat,
              lon,
              appid: apiKey,
            },
          })
          const weather = apiRes.data.weather[0]
          return res.status(200).json({ weather })
        } catch (e) {
          return res.status(500).json({ alertText: 'Internal Server Error!' })
        }
      default:
        return res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    if (err?.response?.status) {
      res
        .status(err?.response?.status)
        .json({ alertText: err?.response?.statusText })
      return
    }
    console.log(err)
    return res.status(500).json({ alertText: 'Unexpected Server Error' })
  }
}
