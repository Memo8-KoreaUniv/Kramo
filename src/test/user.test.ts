import path from 'path'
import _ from 'lodash'
import dotenv from 'dotenv'

import { connectToDatabase } from '../utils'
import { UserModel } from '../model'
import {
  CATEGORY1_ID_STRING,
  USER1,
  USER1_EMAIL,
  USER1_ID,
  USER1_PASSWORD,
} from './dummy'

describe('Create and find user', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI)
    await UserModel.deleteOne({ email: USER1_EMAIL })
  })

  test('Create User', async () => {
    console.log(USER1_ID)
    await UserModel.create(USER1)
  })

  test('Find User', async () => {
    const user = await UserModel.findOne({ email: USER1_EMAIL })
    console.log(user)
    expect(user?.email).toBe(USER1_EMAIL)
  })

  test('Check password excluded', async () => {
    const user = await UserModel.findOne({ email: USER1_EMAIL })
    expect(user).toHaveProperty('password')
  })

  test('Check User password', async () => {
    const user = await UserModel.findOne({ email: USER1_EMAIL }).select(
      '+password',
    )
    expect(await user?.checkPassword(USER1_PASSWORD)).toBe(true)
    expect(await user?.checkPassword('wrong')).toBe(false)
  })

  test('Get Categories', async () => {
    const user = await UserModel.findOne({ email: USER1_EMAIL })
    const categories = await user?.getCategories()
    console.log(categories)
    expect(
      categories?.length === 0 ||
        categories
          ?.map((category) => category._id.toString())
          .includes(CATEGORY1_ID_STRING),
    ).toBe(true)
  })

  afterAll(async (done) => {
    // await UserModel.remove({ email: USER1_EMAIL })
    done()
  })
})
