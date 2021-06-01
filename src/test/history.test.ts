import path from 'path'
import dotenv from 'dotenv'

import { HistoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { HISTORY1, USER1_ID } from './dummy'
import { connectToDatabase } from '../../src/utils/mongo'

describe('Create and find History', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI)
    await HistoryModel.deleteOne(HISTORY1 as any)
  })

  test('Create History', async () => {
    await HistoryModel.create(HISTORY1)
  })

  test('Find History', async () => {
    const History = await HistoryModel.findOne(HISTORY1 as any)
    console.log(`History = ${History}`)
    if (!History) {
      return fail()
    }
    const user: PopulatedUser = History.user!
    expect(user?._id).toStrictEqual(USER1_ID)
  })

  test('Check History createdAt', async () => {
    const History = await HistoryModel.findOne(HISTORY1 as any)
    expect(History).not.toBeUndefined()
    expect(new Date().getTime() > History!.createdAt.getTime()).toBe(true)
  })

  afterAll(async (done) => {
    // await HistoryModel.deleteOne(query)
    done()
  })
})
