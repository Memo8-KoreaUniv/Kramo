/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

import { HistoryModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'

export default async function history(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'GET':
        try {
          const { historyId } = req.query
          const history = await HistoryModel.findById(historyId)
          res.status(200).json({ history })
        } catch (e) {
          console.log(e)
          res.status(409).json({
            alertText: '유효하지 않은 히스토리입니다.',
          })
        }
        break
      case 'DELETE':
        try {
          const { historyId } = req.query
          const prevHistory = await HistoryModel.findByIdAndDelete(historyId)
          res.status(200).json({ prevHistory })
        } catch (e) {
          console.log(e)
          res.status(409).json({
            alertText: '유효하지 않은 히스토리입니다.',
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
