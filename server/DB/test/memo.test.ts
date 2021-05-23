import connectDB from '..'
import { MemoModel } from '../model'
import { PopulatedUser } from '../model/user'
import { MEMO1, USER1_ID } from './dummy'

describe('Create and find Memo', () => {
  beforeAll(async () => {
    // dotenv.config()
    connectDB()
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
