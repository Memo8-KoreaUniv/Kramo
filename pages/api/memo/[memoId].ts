/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { CategoryModel, HistoryModel, MemoModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'

export default async function memo(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'GET':
        try {
          const { memoId, count } = req.query
          const histories = await HistoryModel.find({
            memo: memoId as any,
          })
            .sort({ createdAt: -1 })
            .limit(parseInt(count as string))
          res.status(200).json({ histories })
        } catch (e) {
          console.log(e)
          res.status(409).json({
            alertText: '유효하지 않은 메모입니다',
          })
        }
        break
      case 'POST':
        try {
          const { memoId } = req.query
          req.body['memo'] = memoId
          const newMemo = await HistoryModel.create(req.body)
          res.status(200).json({ newMemo })
        } catch (e) {
          console.log(e)
          res.status(409).json({
            alertText: '입력 데이터가 유효하지 않습니다! ',
          })
        }
        break
      case 'DELETE':
        try {
          const { memoId } = req.query
          await MemoModel.findByIdAndDelete(memoId)
          await HistoryModel.deleteMany({ memo: memoId as any })
          res.status(200).json({ alertText: '카테고리 삭제 성공!' })
        } catch (e) {
          console.log(e)
          res.status(409).json({
            alertText: '유효하지 않은 메모입니다',
          })
        }
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
