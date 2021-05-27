import { connect, ConnectionOptions } from 'mongoose'

const { MONGODB_URI } = process.env // .env.local 설정파일 만들어줘야함

console.log(`mongodb_uri = ${MONGODB_URI}`)

const options: ConnectionOptions = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
}

export const connectToDatabase = (uri = MONGODB_URI!) => connect(uri, options)
