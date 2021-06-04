import { NextApiRequest, NextApiResponse } from 'next'

import { UserModel } from 'src/model'
import { connectToDatabase } from 'src/utils/mongo'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase()
    let result
    switch (req.method) {
      case 'GET':
        result = await UserModel.find()
        res.status(200).json(result)
        break
      case 'POST':
        result = await UserModel.create(req.body)
        res.status(200).json(result)
        break
      default:
        res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Unexpected Server Error')
  }
}
