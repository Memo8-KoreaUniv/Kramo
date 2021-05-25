import { NextApiRequest, NextApiResponse } from 'next'
import { UserModel } from 'src/model'
import { connectToDatabase } from 'src/utils'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase()
    switch (req.method) {
      case 'GET':
        const users = await UserModel.find()
        res.json(users)
        res.status(500).send('error')
        break
      case 'POST':
        const result = await UserModel.create(req.body)
        res.status(200).json(result)
        break
      default:
        res.status(500).send('Unexpected req Method!')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Unexpected Server Error')
  }
}
