import { NextApiRequest, NextApiResponse } from 'next'
import { NAVER_API_URL } from 'src/enum'
import { UserModel } from 'src/model'
import { connectToDatabase } from 'src/utils'
import axios from 'axios'

export default async function profiles(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await connectToDatabase()
    let result
    switch (req.method) {
      case 'GET':
        console.log(req.headers.authorization)
        result = await axios.get(NAVER_API_URL, {
          headers: { Authorization: `Bearer ${req.headers.authorization}` },
        })
        console.log(result.data)
        res.status(200).json(result.data)
        break
      case 'POST':
        res.status(500).send('Unexpected req Method!')
        break
      default:
        res.status(500).send('Unexpected req Method!')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Unexpected Server Error')
  }
}
