/* eslint-disable no-case-declarations */

import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

import { UserModel } from 'src/model'
import { setCookie } from 'src/utils/cookies'
import { connectToDatabase } from 'src/utils/mongo'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const TOKEN_NAME = process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'PUT':
        let updatedUser: any
        const { userId } = req.query
        const valuesToBeChanged = _.pick(req.body, [
          'name',
          'nickname',
          'mobile',
        ])
        try {
          updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            valuesToBeChanged,
            {
              new: true,
            },
          )
        } catch (e) {
          res.status(400).json({ alertText: '유저가 존재하지 않습니다!' })
        }

        if (!process.env.JWT_SECRET) {
          throw Error('No JWT_SECRET!')
        }
        jwt.sign(
          updatedUser.toJSON(),
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
              userInfo: updatedUser,
              token,
              alertText: '유저 업데이트 성공!',
            })
          },
        )
        break
      default:
        res.status(501).json({ alertText: 'Unexpected req Method!' })
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
