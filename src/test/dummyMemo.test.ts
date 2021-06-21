import path from 'path'
import { Types } from 'mongoose'

import dotenv from 'dotenv'

import { MemoModel } from '../model'
import { HistoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { connectToDatabase } from '../utils/mongo'
import { MEMOS } from './dummy'
import { TEMPTHISTORY } from './dummy'
import axios from 'axios'

jest.setTimeout(30000)

describe('make dummy memo and test', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI).catch((e) =>
      console.log(e),
    )
    await Promise.all(MEMOS.map(async (memo) => {
      await HistoryModel.deleteMany({ memo: memo._id })
      await MemoModel.deleteOne({ _id: memo._id })
    }))
  })

  test('Create Memos', async () => {
    await Promise.all(MEMOS.map((memo) => {
      return MemoModel.create(memo)
    }))
  })

  test('Find Memo', async () => {
    await Promise.all(MEMOS.map(async (memo) => {
      const _memo = await MemoModel.findOne({_id:memo._id})
      if (!_memo) {
        return fail()
      }
      console.log(`memo = ${_memo._id} is in DB`)
      const user: PopulatedUser = _memo.user!
      expect(user?._id).toStrictEqual(memo.user._id)
    }))
  })

  test('Check Memo createdAt', async () => {
    await Promise.all(MEMOS.map(async (memo) => {
      const _memo = await MemoModel.findOne({_id:memo._id})
      expect(_memo).not.toBeUndefined()
      expect(new Date().getTime() > memo!.createdAt.getTime()).toBe(true)
    }))
  })

  //api test
  test('add test history', async () => {
    await Promise.all(MEMOS.map(async (memo) => {
      try {
        const res = await axios({
          url: `http://localhost:3000/api/memo/${memo._id}`,
          method: 'post',
          data: {...TEMPTHISTORY,user:memo.user._id,category:memo.category._id}
        })
        const apiMemo = new Types.ObjectId(res?.data.newMemo.memo._id)
        expect(apiMemo).toStrictEqual(memo._id)
      } catch (e) {
        console.error(e)
        return fail()
      }
    }))
  })

  test('get sample history and delete', async () => {
    await Promise.all(MEMOS.map(async (memo) => {
      try {
        const res = await axios({
          url: `http://localhost:3000/api/memo/${memo._id}`,
          method: 'GET',
        })
        expect(res?.data.histories[0].text).toStrictEqual('apiTest')
        await HistoryModel.deleteMany({ _id: res?.data.histories[0]._id })
      } catch (e) {
        console.error(e)
        return fail()
      }
    }))
  })

  afterAll(async (done) => {
    done()
  })
})
