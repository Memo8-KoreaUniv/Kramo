/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { CategoryModel, HistoryModel, MemoModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'
import { pageParser } from 'src/utils/pageParser'

/**
 * /api/user/{userId}/memos
 * @example req.query
 *   {
 *     "param": [`userId`, "memos"]
 *     "page" : 1
 *     "count" : 9
 *   }
 *
 */
export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { param } = req.query
  const userId = param[0]
  try {
    await connectToDatabase()
    switch (param[1]) {
      case 'memos':
        if (req.method == 'GET') {
          const { page, count } = req.query
          const histories = await HistoryModel.find({ user: userId as any })
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

          res.status(200).json({ memos: listMemoResult })
          return
        }
        res.status(501).json({ alertText: 'Unexpected request Method!' })
        break
      case 'pin':
        if (req.method == 'GET') {
          const allMemos = await MemoModel.find({ user: userId as any })
          const pinned: { [key: string]: any } = {}
          allMemos.forEach((memo) => (pinned[memo._id] = memo.pinned))
          console.log({ pinned })
          res.status(200).json({ pin: pinned })
          return
        }
        res.status(501).json({ alertText: 'Unexpected request Method!' })
        return
        break
      case 'category':
        if (req.method == 'POST') {
          const { name } = req.query
          try {
            const addCategoryResult = await CategoryModel.create({
              user: userId,
              name,
            })
            res.status(200).json({ category: addCategoryResult })
            return
          } catch (e) {
            console.log(e)
            res.status(409).json({
              alertText: '카테고리가 이미 존재하거나 DB에 오류가 생겼습니다!',
            })
            return
          }
        }
        res.status(501).json({ alertText: 'Unexpected request Method!' })
        return
        break
      case 'categories':
        if (req.method == 'GET') {
          const count = req.query.count as string
          try {
            const findCategoriesResult = await CategoryModel.find({
              user: userId as any,
            })
              .sort({ name: 1 })
              .limit(parseInt(count))
            res.status(200).json({ categories: findCategoriesResult })
            return
          } catch (e) {
            console.log(e)
            res.status(409).json({
              alertText: '카테고리가 존재하지 않습니다!',
            })
            return
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
