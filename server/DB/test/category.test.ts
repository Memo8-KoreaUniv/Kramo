import connectDB from '..'
import { CategoryModel } from '../model'
import { PopulatedUser } from '../model/user'
import { CATEGORY1, USER1_ID } from './dummy'

describe('Create and find CATEGORY', () => {
  beforeAll(async () => {
    // dotenv.config()
    connectDB()
    await CategoryModel.deleteOne(CATEGORY1 as any)
  })

  test('Create category', async () => {
    await CategoryModel.create(CATEGORY1)
  })

  test('Find category', async () => {
    const category = await CategoryModel.findOne(CATEGORY1 as any)
    // console.log(category?.populate())
    console.log(category?.user)
    const user: PopulatedUser = category?.user!
    expect(user._id).toStrictEqual(USER1_ID)
  })

  test('Check category createdAt', async () => {
    const category = await CategoryModel.findOne(CATEGORY1 as any)
    expect(category).not.toBeUndefined()
    expect(new Date().getTime() > category!.createdAt.getTime()).toBe(true)
  })

  afterAll(async (done) => {
    // await CategoryModel.deleteOne(CATEGORY1 as any)
    done()
  })
})
