import path from 'path'

import dotenv from 'dotenv'

import { UserModel } from '../model'
import { connectToDatabase } from '../utils/mongo'
import { USERS } from '../dummy/dummy2'

jest.setTimeout(30000);

describe('make user dummy', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI)
    .catch(e => console.log(e))
    /*
    for (const user of USERS) {
      await UserModel.deleteOne({ _id: user._id })
    }*/
  })
  
  test('Create User', async () => {
    /*
    for (const user of USERS) {
      await UserModel.create(user)
    }
    */
    expect(true).toBe(true)
  })
})