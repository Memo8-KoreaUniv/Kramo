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
        return res.status(200).json(result)
      case 'POST':
        result = await UserModel.create(req.body)
        return res.status(200).json(result)
      default:
        return res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}
