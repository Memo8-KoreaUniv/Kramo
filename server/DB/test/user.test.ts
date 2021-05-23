import connectDB from '..'
import { UserModel } from '../model'

describe('Create and find user', () => {
  const DUMMY_EMAIL = 'ddrrpg@naver.com'
  const DUMMY_PASSWORD = 'password'
  const DUMMY_USER = {
    email: DUMMY_EMAIL,
    nickname: 'root',
    password: DUMMY_PASSWORD,
    createdAt: new Date(),
  }
  beforeAll(async () => {
    // dotenv.config()
    connectDB()
    await UserModel.deleteOne({ email: DUMMY_EMAIL })
  })

  test('Create User', async () => {
    await UserModel.create(DUMMY_USER)
  })

  test('Find User', async () => {
    const user = await UserModel.findOne({ email: DUMMY_EMAIL })
    console.log(user)
    expect(user?.email).toBe(DUMMY_EMAIL)
  })

  test('Check password excluded', async () => {
    const user = await UserModel.findOne({ email: DUMMY_EMAIL })
    expect(user).toHaveProperty('password')
  })

  test('Check User password', async () => {
    const user = await UserModel.findOne({ email: DUMMY_EMAIL }).select(
      '+password',
    )
    expect(await user?.checkPassword(DUMMY_PASSWORD)).toBe(true)
    expect(await user?.checkPassword('wrong')).toBe(false)
  })

  afterAll(async (done) => {
    // await UserModel.remove({ email: DUMMY_EMAIL })
    done()
  })
})
