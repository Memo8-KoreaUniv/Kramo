import axios from 'axios'

import kaxios from 'src/interceptors'

/**
 * 날씨 관련
 * 예시 : https://openweathermap.org/weather-conditions
 */

export interface WeatherInfo {
  id: string
  description: string
  icon: string
  main: string
}

export const FALLBACK_WEATHER = {
  id: '0',
  description: '날씨 정보를 로드해오는 데에 실패하였습니다..',
  main: '날씨 정보를 로드해오는 데에 실패하였습니다..',
  icon: '4d',
}

export const EMPTY_WEATHER = {
  id: '0',
  description: '날씨정보를 불러오세요.',
  main: '날씨정보 없음',
  icon: '4d',
}

export const WEATHER_API_BASE_URL =
  'http://api.openweathermap.org/data/2.5/weather'

export const WEATHER_API_ICON_URL =
  'http://openweathermap.org/img/wn/04d@2x.png'

export const getNowWeatherByCity = async (
  cityName: string,
  apiKey: string,
): Promise<WeatherInfo> => {
  let weather = FALLBACK_WEATHER
  try {
    const res = await axios.get(WEATHER_API_BASE_URL, {
      params: {
        q: cityName,
        appid: apiKey,
        lang: 'kr',
      },
    })
    weather = res.data.weather[0]
  } catch (e) {
    console.error(e)
  }
  return weather
}

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
export const getNowWeatherByGeo = async (
  lat: number,
  lon: number,
): Promise<WeatherInfo> => {
  // fallback
  let weather = FALLBACK_WEATHER
  try {
    const res = await kaxios({
      url: '/weather',
      method: 'get',
      params: {
        lat,
        lon,
      },
    })
    weather = res.data.weather
  } catch (e) {
    console.error(e)
  }
  return weather
}

export const getIconURL = (icon: string): string => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`
}
