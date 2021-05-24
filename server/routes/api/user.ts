/* eslint-disable require-atomic-updates */
import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'
import axios from 'axios'

const router = new Router()
const NAVER_LOGIN_URL = 'https://nid.naver.com/oauth2.0/authorize'
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token'
const REDIRECT_URI = encodeURI('http://localhost:3000/login')

router.get('/', async (ctx) => {
  ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

router.get('/naverlogin', async (ctx) => {
  const apiURL = `${NAVER_LOGIN_URL}?response_type=code&client_id=${
    process.env.NAVER_CLIENT_ID
  }&redirect_uri=${REDIRECT_URI}&state=${'test'}`
  ctx.body = apiURL
})

router.get('/callback', async (ctx) => {
  const code = ctx.query.code
  const state = ctx.query.state
  const apiURL = `${NAVER_TOKEN_URL}?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&code=${code}&state=${state}`
  const options = {
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
    },
  }
  let data = 'error'
  let statusCode = 200
  try {
    const res = await axios.get(apiURL, options)
    data = res.data
  } catch (e) {
    statusCode = 500
  }
  ctx.body = { data, apiURL }
  ctx.res.statusCode = statusCode
})

export default router.routes()
