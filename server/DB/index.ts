import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  let uri
  switch (process.env['NODE_ENV']?.trim()) {
    case 'dev':
      uri = process.env['MONGODB_URI_DEV']
      console.log('[.env] dev environment variable loaded!')
      break
    case 'prod':
      uri = process.env['MONGODB_URI_PRO']
      console.log('[.env] prod environment variable loaded!')
      break
    case 'test':
      uri = process.env['MONGODB_URI_TEST']
    default:
      console.log('[.env] test environment variable loaded!')
      uri = process.env['MONGODB_URI_TEST']
      break
  }
  if (!uri) {
    console.log(`MongoDB Connected Fail!`)
    return
  }
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

export default connectDB
