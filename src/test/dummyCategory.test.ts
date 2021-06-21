import path from 'path'
import dotenv from 'dotenv'

import { CategoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { CATEGORYS } from '../dummy/dummy'
import { connectToDatabase } from '../utils/mongo'

jest.setTimeout(30000)

describe('make dummy category and test', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI).catch((e) =>
      console.log(e),
    )
    for (const category of CATEGORYS) {
      await CategoryModel.deleteOne({ _id: category._id })
    }
  })

  test('Create Category', async () => {
    for (const category of CATEGORYS) {
      await CategoryModel.create(category)
    }
  })

  test('Find Category', async () => {
    for (const category of CATEGORYS) {
      const _category = await CategoryModel.findOne({_id:category._id})
      console.log(`Category = ${_category}`)
      if (!_category) {
        return fail()
      }
      const user: PopulatedUser = _category.user!
      expect(user?._id).toStrictEqual(category.user._id)
    }
  })

  test('Check Category createdAt', async () => {
    for (const category of CATEGORYS) {
      const _category = await CategoryModel.findOne({_id:category._id})
      expect(_category).not.toBeUndefined()
      expect(new Date().getTime() > _category!.createdAt.getTime()).toBe(true)
    }
  })

  afterAll(async (done) => {
    // await HistoryModel.deleteOne(query)
    done()
  })
})
