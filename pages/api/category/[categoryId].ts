/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { CategoryModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'

export default async function category(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'PUT':
        try {
          const { categoryId, name } = req.query
          const changedCategory = await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
              name: name as string,
            },
            { new: true },
          )
          return res.status(200).json({ changedCategory })
        } catch (e) {
          console.log(e)
          return res.status(409).json({
            alertText: '카테고리나 카테고리 이름이 유효하지 않습니다.',
          })
        }
      case 'DELETE':
        try {
          const { categoryId } = req.query
          await CategoryModel.findByIdAndDelete(categoryId)
          return res.status(200).json({ alertText: '카테고리 삭제 성공!' })
        } catch (e) {
          console.log(e)
          return res.status(409).json({
            alertText: '카테고리나 카테고리 이름이 유효하지 않습니다.',
          })
        }
      default:
        return res.status(501).json({ alertText: 'Unexpected req Method!' })
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
