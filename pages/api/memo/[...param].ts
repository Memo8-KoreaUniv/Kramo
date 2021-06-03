/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { HistoryModel, MemoModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'
import { pageParser } from 'src/utils/pageParser'

/**
 * /api/memo/{memoId}/memos
 * @example req.query
 *   {
 *     "param": [`memoId`, "memos"]
 *     "page" : 1
 *     "count" : 9
 *   }
 *
 */
export default async function memo(req: NextApiRequest, res: NextApiResponse) {
  const { param } = req.query
  const memoId = param[0]
  try {
    await connectToDatabase()
    switch (param[1]) {
      case 'pin':
        if (req.method == 'POST') {
          try {
            await MemoModel.findByIdAndUpdate(memoId, {
              pinned: true,
            })
            res.status(200).json({})
          } catch (e) {
            res.status(409).json({ alertText: '유효하지 않은 메모입니다!' })
          }
        }
        if (req.method == 'DELETE') {
          try {
            await MemoModel.findByIdAndUpdate(memoId, {
              pinned: false,
            })
            res.status(200).json({})
          } catch (e) {
            res.status(409).json({ alertText: '유효하지 않은 메모입니다!' })
          }
        }
        res.status(501).json({ alertText: 'Unexpected request Method!' })
        break
      default:
        res.status(501).json({ alertText: 'Param is not allowed!' })
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
