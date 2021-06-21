/* eslint-disable no-case-declarations */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { NAVER_API_URL } from 'src/enum'
import { UserModel } from 'src/model'
import { UserInfo } from 'src/types/user'
import { setCookie } from 'src/utils/cookies'
import { connectToDatabase } from 'src/utils/mongo'
import { verifyToken } from 'src/utils/token'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const TOKEN_NAME = process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!

  try {
    await connectToDatabase()
    let result
    switch (req.method) {
      case 'GET':
        if (!req.cookies[TOKEN_NAME]) {
          res.status(401).json({ alertText: '로그인이 필요합니다!' })
          return
        }
        const kramoUserInfo: UserInfo | null = verifyToken(
          req.cookies[TOKEN_NAME],
        )
        res
          .status(200)
          .json({ alertText: '유저정보 로드 성공!', userInfo: kramoUserInfo })
        return
        break
      case 'POST':
        let alertText = '로그인 완료!'
        const naverAccessToken = req.body.naverAccessToken

        try {
          result = await axios.get(NAVER_API_URL, {
            headers: { Authorization: `Bearer ${naverAccessToken}` },
          })
        } catch (e) {
          console.log(e)
          res.status(401).json({ alertText: 'Naver Authorization Failed' })
          return
        }
        if (!result?.data?.response) {
          res.status(500).json({ alertText: 'Naver Req Error' })
          return
        }

        const naverUserInfo = result.data.response
        let mongoUser = await UserModel.findOne({
          naverId: naverUserInfo.id,
        })

        const userDocument = { ...naverUserInfo, naverId: naverUserInfo.id }
        delete userDocument.id

        if (!mongoUser) {
          mongoUser = await UserModel.create(userDocument)
          alertText = '회원가입 완료!'
        }

        if (!process.env.JWT_SECRET) {
          throw Error('No JWT_SECRET!')
        }
        jwt.sign(
          mongoUser.toJSON(),
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (_err, token) => {
            setCookie(res, TOKEN_NAME, token, {
              path: '/',
              sameSite: true,
            })
            res.status(200).json({
              userInfo: mongoUser,
              token,
              alertText,
            })
          },
        )
        break
      default:
        res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    if (err?.response?.status) {
      res
        .status(err?.response?.status)
        .json({ alertText: err?.response?.statusText })
      return
    }
    console.log(err)
    res.status(500).json({ alertText: 'Unexpected Server Error' })
  }
}
