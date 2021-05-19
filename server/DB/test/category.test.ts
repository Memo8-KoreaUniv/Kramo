import { Types } from 'mongoose'

import connectDB from '..'
import { CategoryModel } from '../model'
import { PopulatedUser } from '../model/user'

describe('Create and find CATEGORY', () => {
  const DUMMY_NAME = 'category1'
  const DUMMY_USER_ID = new Types.ObjectId('60a33539303d8f87a0801bb6')
  const DUMMY_CATEGORY = {
    name: DUMMY_NAME,
    user: DUMMY_USER_ID as any,
    createdAt: new Date(),
  }
  const query = { name: DUMMY_NAME }

  beforeAll(async () => {
    // dotenv.config()
    connectDB()
    // await CategoryModel.deleteOne(query)
  })

  test('Create category', async () => {
    await CategoryModel.create(DUMMY_CATEGORY)
  })

  test('Find category', async () => {
    const category = await CategoryModel.findOne(query)
    // console.log(category?.populate())
    console.log(category?.user)
    const user: PopulatedUser = category?.user!
    expect(user._id).toStrictEqual(DUMMY_USER_ID)
  })

  test('Check category createdAt', async () => {
    const category = await CategoryModel.findOne(query)
    expect(category).not.toBeUndefined()
    expect(new Date().getTime() > category!.createdAt.getTime()).toBe(true)
  })

  afterAll(async (done) => {
    // await CategoryModel.deleteOne(query)
    done()
  })
})
