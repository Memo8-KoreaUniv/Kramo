/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { MemoModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'

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
        if (req.method === 'POST') {
          try {
            const newMemo = await MemoModel.findByIdAndUpdate(
              memoId,
              {
                pinned: true,
              },
              { new: true },
            )
            return res.status(200).json({ newMemo })
          } catch (e) {
            return res
              .status(409)
              .json({ alertText: '유효하지 않은 메모입니다!' })
          }
        }
        if (req.method === 'DELETE') {
          try {
            await MemoModel.findByIdAndUpdate(memoId, {
              pinned: false,
            })
            return res.status(200).json({})
          } catch (e) {
            return res
              .status(409)
              .json({ alertText: '유효하지 않은 메모입니다!' })
          }
        }
        return res.status(501).json({ alertText: 'Unexpected request Method!' })

      default:
        return res.status(501).json({ alertText: 'Param is not allowed!' })
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
