import mongoose from 'mongoose'

const connectDB = async () => {
  let uri

  switch (process.env.NODE_ENV.trim()) {
    case 'dev':
      uri = process.env.MONGODB_URI_DEV
      break
    case 'pro':
      uri = process.env.MONGODB_URI_PRO
      break
    default:
      break
  }
  if (!uri) {
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
