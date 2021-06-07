import path from 'path'
import dotenv from 'dotenv'

import { MemoModel } from '../model'
import { PopulatedUser } from '../model/user'
import { HISTORY1_ID_STRING, MEMO1, USER1_ID } from './dummy'
import { connectToDatabase } from '../../src/utils/mongo'

describe('Create and find Memo', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI)
    await MemoModel.deleteOne(MEMO1 as any)
  })

  test('Create Memo', async () => {
    await MemoModel.create(MEMO1)
  })

  test('Find Memo', async () => {
    const memo = await MemoModel.findOne(MEMO1 as any)
    console.log(`memo = ${memo}`)
    if (!memo) {
      return fail()
    }
    const user: PopulatedUser = memo.user!
    expect(user?._id).toStrictEqual(USER1_ID)
  })

  test('Get Histories', async () => {
    const memo = await MemoModel.findOne(MEMO1 as any)
    const histories = await memo?.getHistories()
    console.log(histories?.map((history) => history._id.toString()))
    expect(
      histories?.length === 0 ||
        histories
          ?.map((history) => history._id.toString())
          .includes(HISTORY1_ID_STRING),
    ).toBe(true)
  })

  test('Check Memo createdAt', async () => {
    const memo = await MemoModel.findOne(MEMO1 as any)
    expect(memo).not.toBeUndefined()
    expect(new Date().getTime() > memo!.createdAt.getTime()).toBe(true)
  })

  afterAll(async (done) => {
    // await MemoModel.deleteOne(MEMO1 as any)
    done()
  })
})
