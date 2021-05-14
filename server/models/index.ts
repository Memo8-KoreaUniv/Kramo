import mongoose, { Schema } from 'mongoose'

mongoose.Promise = global.Promise

// Connect MongoDB at default port 27017.
mongoose.connect(
  'mongodb://localhost:27017/DB Name',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.')
    } else {
      console.log('Error in DB connection: ' + err)
    }
  },
)
