import path from 'path'

import dotenv from 'dotenv'

import { HistoryModel } from '../model'
import { connectToDatabase } from '../utils/mongo'
import { HISTORIES2, HISTORIES3, HISTORIES4, HISTORIES5 } from '../dummy/dummy'

const AllHISTORIES = [HISTORIES2, HISTORIES3, HISTORIES4, HISTORIES5]
jest.setTimeout(30000)

describe('make History dummy', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI).catch((e) =>
      console.log(e),
    )
    for (const histories of AllHISTORIES) {
      for (const history of histories) {
        await HistoryModel.deleteOne({ _id: history._id })
      }
    }
  })

  test('Create History', async () => {
    for (const histories of AllHISTORIES) {
      for (const history of histories) {
        await HistoryModel.create(history)
      }
    }
    expect(true).toBe(true)
  })
})
