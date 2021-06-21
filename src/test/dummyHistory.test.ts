import path from 'path'

import dotenv from 'dotenv'

import { HistoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { connectToDatabase } from '../utils/mongo'
import { HISTORIES2, HISTORIES3, HISTORIES4, HISTORIES5 } from './dummy'

const AllHISTORIES = [HISTORIES2, HISTORIES3, HISTORIES4, HISTORIES5]
jest.setTimeout(30000)

describe('make History dummy', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI).catch((e) =>
      console.log(e),
    )

    await Promise.all(AllHISTORIES.map(async (histories) => {
      await Promise.all(histories.map((history) => {
        return HistoryModel.deleteOne({ _id: history._id })
      }))
    }))
  })

  test('Create History', async () => {
    await Promise.all(AllHISTORIES.map(async (histories) => {
      await Promise.all(histories.map((history) => {
        return HistoryModel.create(history)
      }))
    }))

  })
  test('Find History', async () => {
    await Promise.all(AllHISTORIES.map(async (histories) => {
      await Promise.all(histories.map(async (history) => {
        const _history = await HistoryModel.findOne({ _id: history._id })
        if (!_history) {
          return fail()
        }
        console.log(`History = ${_history._id} is in DB`)
        const user: PopulatedUser = _history.user!
        expect(user?._id).toStrictEqual(history.user._id)
      }))
    }))
  })

  test('Check History createdAt', async () => {
    await Promise.all(AllHISTORIES.map(async (histories) => {
      await Promise.all(histories.map(async (history) => {
        const _history = await HistoryModel.findOne({ _id: history._id })
        expect(_history).not.toBeUndefined()
        expect(new Date().getTime() > _history!.createdAt.getTime()).toBe(true)
      }))
    }))
  })

  afterAll(async (done) => {
    done()
  })
})
