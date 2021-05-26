import Text from 'antd/lib/typography/Text'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const Callback = () => {
  const router = useRouter()
  const { aceess_token } = router.query

  console.log(router.query)
  return (
    <div>
      <Text>{aceess_token}</Text>
    </div>
  )
}

export default Callback
