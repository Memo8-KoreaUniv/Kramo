import path from 'path'
import dotenv from 'dotenv'

import { CategoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { CATEGORYS } from './dummy'
import { connectToDatabase } from '../utils/mongo'

jest.setTimeout(30000)

describe('make dummy category and test', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI).catch((e) =>
      console.log(e),
    )
    await Promise.all(CATEGORYS.map((category) => {
      return CategoryModel.deleteOne({ _id: category._id })
    }))
  })

  test('Create Category', async () => {
    await Promise.all(CATEGORYS.map((category) => {
        return CategoryModel.create(category)
    }))
  })

  test('Find Category', async () => {
    await Promise.all(CATEGORYS.map( async (category)=>{
      const _category = await CategoryModel.findOne({_id:category._id})
      if (!_category) {
        return fail()
      }
      console.log(`Category = ${_category._id} is in DB`)
      const user: PopulatedUser = _category.user!
      expect(user?._id).toStrictEqual(category.user._id)
     }))
  })
    
  test('Check Category createdAt', async () => {
    await Promise.all(CATEGORYS.map( async (category)=>{
      const _category = await CategoryModel.findOne({_id:category._id})
      expect(_category).not.toBeUndefined()
      expect(new Date().getTime() > _category!.createdAt.getTime()).toBe(true)
    }))
  })

  afterAll(async (done) => {
    done()
  })
})
