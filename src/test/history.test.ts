import path from 'path'
import dotenv from 'dotenv'

import { HistoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { HISTORIES, HISTORY1, USER1_ID } from './dummy'
import { connectToDatabase } from '../../src/utils/mongo'

describe('Create and find History', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI)
    for (const history of HISTORIES) {
      await HistoryModel.deleteOne({ _id: history._id })
    }
  })

  test('Create History', async () => {
    for (const history of HISTORIES) {
      await HistoryModel.create(history)
    }
  })

  test('Find History', async () => {
    const History = await HistoryModel.findOne({ _id: HISTORY1._id })
    console.log(`History = ${History}`)
    if (!History) {
      return fail()
    }
    const user: PopulatedUser = History.user!
    expect(user?._id).toStrictEqual(USER1_ID)
  })

  test('Check History createdAt', async () => {
    const History = await HistoryModel.findOne({ _id: HISTORY1._id })
    expect(History).not.toBeUndefined()
    expect(new Date().getTime() > History!.createdAt.getTime()).toBe(true)
  })

  afterAll(async (done) => {
    // await HistoryModel.deleteOne(query)
    done()
  })
})
