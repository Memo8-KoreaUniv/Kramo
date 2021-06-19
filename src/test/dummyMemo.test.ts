import path from 'path'

import dotenv from 'dotenv'

import { MemoModel } from '../model'
import { connectToDatabase } from '../utils/mongo'
import { MEMOS } from '../dummy/dummy'

jest.setTimeout(30000)

describe('make memo dummy', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI).catch((e) =>
      console.log(e),
    )
    for (const memo of MEMOS) {
      await MemoModel.deleteOne({ _id: memo._id })
    }
  })

  test('Create Memos', async () => {
    for (const memo of MEMOS) {
      await MemoModel.create(memo)
      expect(true).toBe(true)
    }
  })
})
