import path from 'path'
import dotenv from 'dotenv'

import { CategoryModel } from '../model'
import { CATEGORYS } from '../dummy/dummy2'
import { connectToDatabase } from '../utils/mongo'

jest.setTimeout(30000);

describe('make category dummy', () => {
  beforeAll(async () => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
    await connectToDatabase(process.env.MONGODB_URI)
    .catch(e => console.log(e))
    for (const category of CATEGORYS) {
      await CategoryModel.deleteOne({ _id: category._id })
    }
  })
  
  test('Create Category', async () => {
    for (const category of CATEGORYS) {
      await CategoryModel.create(category)
      expect(true).toBe(true)
    }
  })
})