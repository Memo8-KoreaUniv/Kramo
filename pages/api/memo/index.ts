/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { HistoryModel, MemoModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'

export default async function memo(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const { user, category } = req.body
        const newMemo = await MemoModel.create({ user, category })
        const historyDocument = req.body
        historyDocument['memo'] = newMemo.id
        try {
          const newHistory = await HistoryModel.create(historyDocument)
          res.status(200).json(newHistory)
        } catch (e) {
          await MemoModel.findByIdAndDelete(newMemo.id)
          res.status(500).json({ alertText: 'DB Error Occur!' })
        }
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
