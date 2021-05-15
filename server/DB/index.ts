import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  let uri
  switch (process.env['NODE_ENV']?.trim()) {
    case 'dev':
      uri = process.env['MONGODB_URI_DEV']
      console.log(process.env)
      console.log(process.env['MONGODB_URI_DEV'])
      break
    case 'pro':
      uri = process.env['MONGODB_URI_PRO']
      break
    default:
      uri = process.env['MONGODB_URI_DEV']
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
