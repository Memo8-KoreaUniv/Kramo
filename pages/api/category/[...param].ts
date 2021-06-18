/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { HistoryModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'
import { pageParser } from 'src/utils/pageParser'

/**
 * /api/category/{categoryId}/memos
 * @example req.query
 *   {
 *     "param": [`categoryId`, "memos"]
 *     "page" : 1
 *     "count" : 9
 *   }
 *
 */
export default async function category(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { param } = req.query
  const categoryId = param[0]
  try {
    await connectToDatabase()
    switch (param[1]) {
      case 'memos':
        if (req.method == 'GET') {
          const { page, count } = req.query
          const histories = await HistoryModel.find({
            category: categoryId as any,
          })
          const obj: { [key: string]: any } = {}
          for (const history of histories) {
            const memoId = history.memo as any
            if (obj[memoId]) {
              if (
                obj[memoId].createdAt.getTime() < history.createdAt.getTime()
              ) {
                obj[memoId] = history
              }
            } else {
              obj[memoId] = history
            }
          }
          const listMemoResult = pageParser(
            Object.values(obj),
            page as string,
            count as string,
          )
          return res.status(200).json({ memos: listMemoResult })
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
