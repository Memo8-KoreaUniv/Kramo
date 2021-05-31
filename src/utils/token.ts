import axios from 'axios'
import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import cookie from 'react-cookies'

if (!process.env.JWT_SECRET) {
  throw Error('JWT_SECRET not exist')
}
const JWT_SECRET = process.env.JWT_SECRET
if (!process.env.NEXT_PUBLIC_JWT_TOKEN_NAME) {
  throw Error('NEXT_PUBLIC_JWT_TOKEN_NAME not exist')
}
const NEXT_PUBLIC_JWT_TOKEN_NAME = process.env.NEXT_PUBLIC_JWT_TOKEN_NAME
if (!process.env.NEXT_PUBLIC_HTTP_ONLY) {
  throw Error('NEXT_PUBLIC_HTTP_ONLY not exist')
}
const NEXT_PUBLIC_HTTP_ONLY = Boolean(process.env.NEXT_PUBLIC_HTTP_ONLY)

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken: string): any {
  try {
    if (!JWT_SECRET) {
      throw Error('No JWT_SECRET!')
    }
    return jwt.verify(jwtToken, JWT_SECRET)
  } catch (e) {
    console.log('error:', e)
    return null
  }
}

export interface Cookies {
  [key: string]: string
}
/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req: NextApiRequest) {
  const parsedItems: Cookies = {}
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ')
    cookiesItems.forEach((cookies) => {
      const parsedItem = cookies.split('=')
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1])
    })
  }
  return parsedItems
}

export function isEmpty(param: any) {
  return Object.keys(param).length === 0
}

export function getUserInfoByToken(req: NextApiRequest) {
  const cookies = getAppCookies(req)
  if (!(NEXT_PUBLIC_JWT_TOKEN_NAME in cookies)) {
    return {}
  }
  const token = cookies[NEXT_PUBLIC_JWT_TOKEN_NAME]
  return verifyToken(token)
}

export function setToken(token: string) {
  axios.defaults.headers.Authorization = token
  const expires = new Date()
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24)
  cookie.save(NEXT_PUBLIC_JWT_TOKEN_NAME, token, {
    path: '/',
    expires,
    httpOnly: NEXT_PUBLIC_HTTP_ONLY, // dev/prod 에 따라 true / false 로 받게 했다.
  })
}
