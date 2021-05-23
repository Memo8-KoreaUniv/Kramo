import connectDB from '..'
import { UserModel } from '../model'
import { USER1, USER1_EMAIL, USER1_ID, USER1_PASSWORD } from './dummy'

describe('Create and find user', () => {
  beforeAll(async () => {
    // dotenv.config()
    connectDB()
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

  afterAll(async (done) => {
    // await UserModel.remove({ email: USER1_EMAIL })
    done()
  })
})
